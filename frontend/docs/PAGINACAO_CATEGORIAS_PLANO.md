## Plano de Implementação: Paginação e Categorias no Blog StayFocus

### 1. Visão Geral da Arquitetura

As funcionalidades de paginação e categorias serão integradas para permitir que os usuários naveguem eficientemente pelos posts do blog. A paginação funcionará tanto na listagem principal de posts quanto nas páginas de listagem por categoria. As categorias serão acessíveis através de um menu dropdown e de tags clicáveis nos cards dos posts.

**Fluxo de Dados e Componentes (Simplificado):**

```mermaid
graph TD
    A[Usuário acessa /blog] --> B{Page.tsx (/blog)};
    B -- Solicita posts da página 1 --> C[posts.ts: getAllPosts(page=1, limit=8)];
    C -- Retorna posts paginados e total de posts --> B;
    B -- Renderiza posts e controles de paginação --> D[UI: Lista de Posts + Controles de Paginação];

    E[Usuário seleciona categoria 'Produtividade' no Dropdown OU clica na tag 'Produtividade'] --> F{Rota: /blog/category/produtividade};
    F --> G{Page.tsx (/blog/category/[categoryName])};
    G -- Solicita posts da categoria 'Produtividade', página 1 --> H[posts.ts: getAllPosts(category='Produtividade', page=1, limit=8)];
    H -- Retorna posts filtrados/paginados e total --> G;
    G -- Renderiza posts e controles de paginação --> I[UI: Lista de Posts da Categoria + Controles de Paginação];

    D -- Usuário clica em 'Próxima Página' --> J{URL: /blog?page=2};
    J --> B;

    I -- Usuário clica em 'Próxima Página' (em categoria) --> K{URL: /blog/category/produtividade?page=2};
    K --> G;
```

### 2. Modificações em `frontend/src/lib/posts.ts`

O arquivo [`frontend/src/lib/posts.ts`](frontend/src/lib/posts.ts:1) será central para fornecer os dados necessários.

**2.1. Atualização da função `getAllPosts()`**

A função [`getAllPosts()`](frontend/src/lib/posts.ts:37) será modificada para aceitar os seguintes parâmetros opcionais:

*   `page`: número da página atual (padrão: 1).
*   `limit`: número de posts por página (padrão: 8, conforme definido).
*   `category`: nome da categoria para filtrar os posts (opcional).

A função deverá:
1.  Ler todos os arquivos de post.
2.  Se um `category` for fornecido, filtrar os posts que correspondem a essa categoria (case-insensitive).
3.  Ordenar os posts resultantes por data (mais recentes primeiro), como já faz.
4.  Calcular o total de posts (após a filtragem por categoria, se aplicável) para uso nos controles de paginação.
5.  Aplicar a lógica de paginação (slice) com base nos parâmetros `page` e `limit`.
6.  Retornar um objeto contendo:
    *   `posts`: um array de `PostData` para a página atual.
    *   `totalPosts`: o número total de posts (considerando o filtro de categoria, se houver).
    *   `totalPages`: o número total de páginas.
    *   `currentPage`: o número da página atual.

**Exemplo da nova assinatura e retorno:**

```typescript
interface GetAllPostsParams {
  page?: number;
  limit?: number;
  category?: string;
}

interface PaginatedPostsResult {
  posts: PostData[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
}

export function getAllPosts(params: GetAllPostsParams = {}): PaginatedPostsResult {
  const { page = 1, limit = 8, category } = params;
  // ... lógica de leitura e filtragem ...
  const allPostsData = /* ... */; // Array de todos os posts ou posts filtrados por categoria

  // Ordenação (já existente)
  const sortedPosts = allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    else return -1;
  });

  const totalPosts = sortedPosts.length;
  const totalPages = Math.ceil(totalPosts / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    totalPosts,
    totalPages,
    currentPage: page,
  };
}
```

**2.2. Nova função `getAllCategories()`**

Uma nova função será criada para extrair todas as categorias únicas dos posts. Isso será usado para popular o menu dropdown de categorias.

*   A função lerá todos os posts.
*   Extrairá o campo `category` de cada post.
*   Criará uma lista de categorias únicas (sem duplicatas e case-insensitive, talvez normalizando para um formato padrão, ex: primeira letra maiúscula).
*   Retornará um array de strings com os nomes das categorias.

**Exemplo da função:**

```typescript
export function getAllCategories(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const categories = new Set<string>();

  fileNames.forEach((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    if (matterResult.data.category) {
      // Normalizar a categoria (ex: primeira letra maiúscula)
      const categoryName = matterResult.data.category.trim();
      if (categoryName) {
         categories.add(categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase());
      }
    }
  });

  return Array.from(categories).sort(); // Ordenar alfabeticamente
}
```

### 3. Implementação da Paginação

**3.1. Componentes de UI para Paginação**

Será criado um novo componente reutilizável, por exemplo, `PaginationControls.tsx`.
*   **Props:** `currentPage`, `totalPages`, `basePath` (ex: `/blog` ou `/blog/category/nome-categoria`).
*   **Funcionalidade:**
    *   Botão "Anterior" (desabilitado na primeira página).
    *   Botão "Próxima" (desabilitado na última página).
    *   Opcional: Números de página clicáveis (ex: "1, 2, ... 5, 6, 7, ... 10"). Para simplificar inicialmente, podemos ter apenas "Anterior" e "Próxima".
    *   Links devem usar `next/link` e incluir o query param `?page=NUMERO_DA_PAGINA`.

**3.2. Gerenciamento de Estado e URL**

*   O estado da página atual será gerenciado através de *query parameters* na URL (ex: `/blog?page=2`).
*   As páginas que listam posts ([`frontend/src/app/blog/page.tsx`](frontend/src/app/blog/page.tsx) e a futura página de categoria) lerão o parâmetro `page` da URL (usando `searchParams` em Server Components do Next.js 13+ App Router).
*   Este parâmetro será passado para a função `getAllPosts`.

**3.3. Integração na Página `frontend/src/app/blog/page.tsx`**

*   A página buscará os posts usando `getAllPosts({ page: currentPageFromQueryParam, limit: 8 })`.
*   Renderizará a lista de `posts` retornada.
*   Renderizará o componente `PaginationControls` com os dados `currentPage`, `totalPages` e `basePath="/blog"`.

### 4. Implementação de Categorias

**4.1. Componente de UI: Menu Dropdown de Categorias**

*   Será criado um novo componente, por exemplo, `CategoryDropdown.tsx`.
*   **Props:** `categories` (array de strings obtido de `getAllCategories()`).
*   **Funcionalidade:**
    *   Exibirá um menu dropdown com a lista de categorias.
    *   Cada item do menu será um link (`next/link`) para a respectiva página de categoria (ex: `/blog/category/nome-da-categoria`).
    *   Pode incluir uma opção "Todas as Categorias" que leva para `/blog`.
*   Este componente pode ser posicionado no layout do blog, talvez próximo ao título da seção do blog ou no Header.

**4.2. Componente de UI: Tags Clicáveis nos `PostCard`**

*   O componente [`PostCard.tsx`](frontend/src/components/blog/PostCard.tsx) será modificado.
*   A tag de categoria, que atualmente é apenas visual (conforme visto em [`frontend/src/app/blog/page.tsx`](frontend/src/app/blog/page.tsx) com `getCategoryClass`), se tornará um link (`next/link`) para a página da respectiva categoria (ex: `/blog/category/[categoryName]`).
*   O `slug` da categoria para a URL deve ser gerado de forma consistente (ex: minúsculas, hifens para espaços se necessário, embora os exemplos atuais não tenham espaços).

**4.3. Estrutura de Rotas para Categorias**

*   Será utilizada a rota dinâmica do Next.js App Router: `frontend/src/app/blog/category/[categoryName]/page.tsx`.
    *   `[categoryName]` será o slug da categoria.

**4.4. Nova Página: `frontend/src/app/blog/category/[categoryName]/page.tsx`**

*   Esta nova página será responsável por listar os posts de uma categoria específica.
*   **Funcionalidade:**
    1.  Extrairá `categoryName` dos parâmetros da rota.
    2.  Extrairá o `page` (para paginação) dos `searchParams`.
    3.  Chamará `getAllPosts({ category: categoryName, page: currentPageFromQueryParam, limit: 8 })`.
    4.  Renderizará a lista de posts retornada.
    5.  Renderizará o componente `PaginationControls` com `currentPage`, `totalPages` e `basePath="/blog/category/[categoryName]"`.
    6.  Exibirá o nome da categoria como título da página (ex: "Posts na categoria: Produtividade").
    7.  Pode incluir uma função `generateStaticParams` para pré-renderizar páginas de categorias populares no build time, se desejado, usando `getAllCategories()` para obter as categorias.

**4.5. Geração de Slugs de Categoria Consistentes**

É importante garantir que o `categoryName` usado na URL seja consistente com o valor armazenado no frontmatter dos posts. A função `getAllCategories()` pode normalizar os nomes das categorias (ex: para minúsculas, substituindo espaços por hifens se as categorias puderem ter espaços) para gerar slugs confiáveis. O mesmo processo de normalização deve ser aplicado ao gerar links para as categorias.

### 5. Considerações Adicionais

*   **SEO:**
    *   As páginas de categoria (`/blog/category/[categoryName]`) devem ter títulos (`<title>`) e meta descriptions únicos e descritivos.
    *   Para páginas paginadas, usar `rel="next"` e `rel="prev"` nos links de paginação pode ajudar os motores de busca a entender a relação entre as páginas. Considerar também o uso de `link rel="canonical"` para evitar conteúdo duplicado, apontando para a primeira página da série ou para uma página "ver todos" se existir (embora com paginação, geralmente a página atual é canônica).
*   **Experiência do Usuário (UX):**
    *   Fornecer feedback visual claro ao navegar entre páginas ou categorias.
    *   Considerar estados de "nenhum post encontrado" para categorias vazias ou páginas além do limite.
    *   O menu dropdown de categorias deve ser facilmente acessível.
*   **Estilização:** Os novos componentes (`PaginationControls`, `CategoryDropdown`) precisarão de estilização consistente com o restante do blog.