## Plano de Desenvolvimento do MVP do Blog StayFocus

Este plano detalha as subtarefas necessárias para desenvolver a versão MVP (Minimum Viable Product) do blog StayFocus, com base nos requisitos fornecidos, no `Prototipo.txt` e no `Posts.txt`. O plano também leva em consideração a estrutura de arquivos existente no diretório `frontend/`.

---

### Subtarefa 1: Configuração Inicial do Projeto Next.js e Estrutura de Pastas

*   **Objetivo:** Verificar e finalizar a configuração de um projeto Next.js (App Router) e a estrutura básica de pastas para o blog, garantindo que o Tailwind CSS esteja corretamente configurado.
*   **Entradas:**
    *   Conhecimento de Next.js (App Router) e Tailwind CSS.
    *   Estrutura de projeto existente em `frontend/`.
*   **Saídas Esperadas:**
    *   Confirmação de que o projeto Next.js em `frontend/` está corretamente configurado com o App Router.
    *   Validação da estrutura de diretórios (ex: `frontend/src/app/blog/`, `frontend/src/app/blog/[slug]/`, `frontend/src/components/blog/`, `frontend/src/content/posts/`). Ajustes se necessário.
    *   Confirmação da configuração do Tailwind CSS em `frontend/tailwind.config.ts` e `frontend/postcss.config.mjs`, e sua aplicação global em `frontend/src/app/globals.css`.
*   **Modo LLM Sugerido:** 💻 Code
*   **Informações Cruciais dos Arquivos de Contexto:**
    *   A existência e conteúdo dos arquivos de configuração como `frontend/next.config.ts`, `frontend/package.json` (para verificar dependências como `tailwindcss`), `frontend/tailwind.config.ts`.
*   **Instruções para Delegação (Exemplo para `new_task`):**
    ```
    Tarefa: Verificar e Finalizar Configuração do Projeto Next.js e Tailwind CSS

    Contexto: Estamos desenvolvendo o blog StayFocus. Uma estrutura de projeto Next.js já existe em 'frontend/'.

    Objetivo Específico:
    1. Verifique se o projeto em 'frontend/' está utilizando o Next.js App Router.
    2. Valide a estrutura de pastas existente, especialmente:
        - 'frontend/src/app/blog/'
        - 'frontend/src/app/blog/[slug]/'
        - 'frontend/src/components/blog/' (para componentes específicos do blog)
        - 'frontend/src/components/layout/' (para Header, Footer)
        - 'frontend/src/content/posts/' (para arquivos Markdown dos posts)
        - 'frontend/src/lib/' (para funções utilitárias)
       Sugira e implemente quaisquer melhorias necessárias na organização.
    3. Confirme que o Tailwind CSS está corretamente configurado (verifique 'frontend/tailwind.config.ts', 'frontend/postcss.config.mjs') e que os estilos base são aplicados (verifique 'frontend/src/app/globals.css' e 'frontend/src/app/layout.tsx').
    4. Certifique-se de que o comando `npm run dev` (ou similar, conforme 'frontend/package.json') inicia o servidor de desenvolvimento sem erros.

    Restrições: Realize apenas as verificações e ajustes descritos. Não implemente novas funcionalidades além da configuração.

    Output: Ao concluir, use `attempt_completion` com um resumo das verificações realizadas, quaisquer alterações feitas e a confirmação de que a configuração está pronta.
    Estas instruções específicas substituem quaisquer instruções gerais conflitantes do modo.
    ```

---

### Subtarefa 2: Implementação do Layout Principal (Header, Footer, Navegação)

*   **Objetivo:** Implementar ou verificar e ajustar os componentes de layout reutilizáveis (Header, Footer) baseados no `Prototipo.txt`, garantindo que estejam estilizados com Tailwind CSS e integrados corretamente.
*   **Entradas:**
    *   `Prototipo.txt` (para a estrutura HTML e classes CSS do header e footer).
    *   Componentes existentes: `frontend/src/components/layout/Header.tsx` e `frontend/src/components/layout/Footer.tsx`.
    *   Layout principal: `frontend/src/app/layout.tsx`.
*   **Saídas Esperadas:**
    *   Componentes React `Header.tsx` e `Footer.tsx` em `frontend/src/components/layout/` totalmente alinhados com o `Prototipo.txt` e estilizados com Tailwind CSS.
    *   Integração confirmada e correta desses componentes no `frontend/src/app/layout.tsx`.
*   **Modo LLM Sugerido:** 💻 Code
*   **Informações Cruciais dos Arquivos de Contexto:**
    *   `Prototipo.txt`: Seções correspondentes ao "HEADER" e "FOOTER", incluindo a estrutura HTML, classes de exemplo (mesmo que conceituais), e links de navegação.
    *   Conteúdo atual de `frontend/src/components/layout/Header.tsx`, `frontend/src/components/layout/Footer.tsx` e `frontend/src/app/layout.tsx`.
*   **Instruções para Delegação (Exemplo para `new_task`):**
    ```
    Tarefa: Implementar/Ajustar Layout Principal (Header, Footer)

    Contexto: Estamos desenvolvendo o blog StayFocus. Os componentes Header e Footer podem já existir em 'frontend/src/components/layout/'. O arquivo 'Prototipo.txt' contém as especificações visuais.

    Objetivo Específico:
    1. Analise as seções "HEADER" e "FOOTER" do arquivo 'Prototipo.txt'.
    2. Verifique os arquivos 'frontend/src/components/layout/Header.tsx' e 'frontend/src/components/layout/Footer.tsx'.
    3. Modifique ou implemente os componentes Header.tsx e Footer.tsx para que correspondam fielmente à estrutura, conteúdo (links de navegação, texto do rodapé) e estilo visual (usando Tailwind CSS) descritos no 'Prototipo.txt'.
    4. Garanta que os componentes sejam responsivos conforme as expectativas do protótipo.
    5. Confirme que Header.tsx e Footer.tsx estão corretamente integrados e funcionais no arquivo 'frontend/src/app/layout.tsx'.

    Restrições: Foque apenas nos componentes Header e Footer e sua integração no layout principal. Não modifique outras partes da aplicação.

    Output: Ao concluir, use `attempt_completion` com um resumo das alterações, confirmando que os componentes estão conforme o 'Prototipo.txt' e integrados.
    Estas instruções específicas substituem quaisquer instruções gerais conflitantes do modo.
    ```

---

### Subtarefa 3: Estrutura para Armazenamento e Leitura de Posts (Arquivos Markdown)

*   **Objetivo:** Definir e implementar/verificar a estrutura de armazenamento dos posts como arquivos Markdown e as funções para ler e parsear esses arquivos na aplicação Next.js.
*   **Entradas:**
    *   `Posts.txt` (para entender o formato e conteúdo dos posts).
    *   Arquivos Markdown existentes em `frontend/src/content/posts/`.
    *   Função utilitária existente: `frontend/src/lib/posts.ts`.
*   **Saídas Esperadas:**
    *   Definição clara da estrutura de frontmatter para os arquivos Markdown (ex: título, autor, data, categoria, slug, imagem de destaque, resumo). Os arquivos existentes em `frontend/src/content/posts/` devem ser atualizados para seguir este padrão, se necessário.
    *   Funções utilitárias em `frontend/src/lib/posts.ts` (ou similar) para:
        *   Listar todos os posts (metadados e slug).
        *   Ler o conteúdo completo de um post específico pelo seu slug.
        *   Parsear o frontmatter (usando `gray-matter` ou similar).
        *   Converter o conteúdo Markdown para HTML (usando `remark` e `remark-html`, ou `next-mdx-remote` se for decidido usar MDX).
    *   Os posts de `Posts.txt` convertidos para o formato Markdown definido e salvos em `frontend/src/content/posts/`, caso ainda não estejam lá ou precisem de ajuste.
*   **Modo LLM Sugerido:** 💻 Code
*   **Informações Cruciais dos Arquivos de Contexto:**
    *   `Posts.txt`: Para extrair os títulos, conteúdos e quaisquer metadados implícitos de cada post.
    *   Estrutura e conteúdo dos arquivos `.md` existentes em `frontend/src/content/posts/`.
    *   Conteúdo do arquivo `frontend/src/lib/posts.ts`.
*   **Instruções para Delegação (Exemplo para `new_task`):**
    ```
    Tarefa: Estruturar Armazenamento e Leitura de Posts Markdown

    Contexto: O blog StayFocus usará arquivos Markdown para os posts. Alguns posts e uma função de leitura podem existir em 'frontend/src/content/posts/' e 'frontend/src/lib/posts.ts'. O arquivo 'Posts.txt' contém o conteúdo original dos posts.

    Objetivo Específico:
    1. Defina uma estrutura de frontmatter padrão para os posts (incluindo: title, date, author, slug, category, excerpt, coverImage).
    2. Verifique os arquivos Markdown em 'frontend/src/content/posts/'. Se necessário, converta os posts do arquivo 'Posts.txt' para este formato Markdown (um arquivo .md por post), garantindo que o frontmatter esteja completo e o slug seja gerado (ex: a partir do título). Salve-os em 'frontend/src/content/posts/'.
    3. Revise e complete a funcionalidade em 'frontend/src/lib/posts.ts':
        - `getAllPosts()`: Deve retornar uma lista de todos os posts, ordenados por data (mais recentes primeiro), contendo pelo menos o slug e os dados do frontmatter.
        - `getPostBySlug(slug)`: Deve retornar o conteúdo HTML do post e seus metadados (frontmatter).
        - Utilize 'gray-matter' para parsear o frontmatter.
        - Utilize 'remark' e 'remark-html' para converter Markdown em HTML.
    4. Certifique-se de que os slugs gerados sejam URL-friendly.

    Restrições: Foque na estrutura dos arquivos Markdown e nas funções de leitura/parsing. Não implemente as páginas de UI ainda.

    Output: Ao concluir, use `attempt_completion` com um resumo da estrutura de frontmatter definida, o estado dos arquivos de posts e a confirmação de que as funções em 'lib/posts.ts' estão operacionais.
    Estas instruções específicas substituem quaisquer instruções gerais conflitantes do modo.
    ```

---

### Subtarefa 4: Criação da Página de Listagem de Posts (Página Principal do Blog)

*   **Objetivo:** Implementar ou verificar/ajustar a página principal do blog (ex: `/blog`) que exibe uma lista de posts (cards de posts), seguindo o `Prototipo.txt`.
*   **Entradas:**
    *   `Prototipo.txt` (para o layout da listagem e dos cards).
    *   Funções da Subtarefa 3 (ex: `getAllPosts()` de `frontend/src/lib/posts.ts`).
    *   Página existente: `frontend/src/app/blog/page.tsx`.
    *   Componente de card existente: `frontend/src/components/blog/PostCard.tsx`.
*   **Saídas Esperadas:**
    *   Componente React para a página de listagem em `frontend/src/app/blog/page.tsx` funcional, buscando e exibindo os posts.
    *   Componente React para um card de post individual em `frontend/src/components/blog/PostCard.tsx` estilizado conforme `Prototipo.txt`, exibindo título, resumo, imagem de destaque (se houver), e link para o post completo.
    *   Estilização completa com Tailwind CSS, alinhada ao `Prototipo.txt`.
*   **Modo LLM Sugerido:** 💻 Code
*   **Informações Cruciais dos Arquivos de Contexto:**
    *   `Prototipo.txt`: Seção "LISTAGEM DE POSTS / PÁGINA INICIAL DO BLOG" e "CARD DE POST", detalhando o layout, informações a serem exibidas e estilo visual.
    *   Conteúdo de `frontend/src/app/blog/page.tsx` e `frontend/src/components/blog/PostCard.tsx`.
*   **Instruções para Delegação (Exemplo para `new_task`):**
    ```
    Tarefa: Implementar/Ajustar Página de Listagem de Posts

    Contexto: A página principal do blog ('/blog') deve listar os posts. Componentes podem existir em 'frontend/src/app/blog/page.tsx' e 'frontend/src/components/blog/PostCard.tsx'. O 'Prototipo.txt' guia o design. As funções para buscar posts estão em 'frontend/src/lib/posts.ts'.

    Objetivo Específico:
    1. Analise as seções "LISTAGEM DE POSTS / PÁGINA INICIAL DO BLOG" e "CARD DE POST" do 'Prototipo.txt'.
    2. Revise/implemente o componente 'frontend/src/components/blog/PostCard.tsx'. Ele deve aceitar props de um post (título, resumo, data, autor, slug, imagem de capa) e renderizar um card estilizado com Tailwind CSS conforme o protótipo, incluindo um link para a página do post individual (ex: '/blog/[slug]').
    3. Revise/implemente a página 'frontend/src/app/blog/page.tsx'. Ela deve:
        - Utilizar a função `getAllPosts()` de 'frontend/src/lib/posts.ts' para buscar os dados dos posts.
        - Mapear os dados dos posts para renderizar uma lista de componentes `PostCard.tsx`.
        - Seguir o layout geral (incluindo título da página, etc.) especificado no 'Prototipo.txt'.
    4. Garanta que a página e os cards sejam responsivos.

    Restrições: Foque na página de listagem e no componente PostCard.

    Output: Ao concluir, use `attempt_completion` com um resumo das implementações/ajustes, confirmando que a página de listagem exibe os posts corretamente e conforme o protótipo.
    Estas instruções específicas substituem quaisquer instruções gerais conflitantes do modo.
    ```

---

### Subtarefa 5: Criação da Página Individual de Post

*   **Objetivo:** Implementar ou verificar/ajustar a página que exibe o conteúdo completo de um único post (ex: `/blog/[slug]`), usando rotas dinâmicas do Next.js.
*   **Entradas:**
    *   `Prototipo.txt` (para o layout geral da página de post, se houver dicas).
    *   Funções da Subtarefa 3 (ex: `getPostBySlug()` e `getAllPosts()` para `generateStaticParams` de `frontend/src/lib/posts.ts`).
    *   Página dinâmica existente: `frontend/src/app/blog/[slug]/page.tsx`.
*   **Saídas Esperadas:**
    *   Componente React para a página de post individual em `frontend/src/app/blog/[slug]/page.tsx` que:
        *   Utiliza `generateStaticParams` para gerar as rotas dinâmicas na build time.
        *   Busca o conteúdo do post específico usando `getPostBySlug()`.
        *   Renderiza o título, metadados (autor, data, categoria) e o conteúdo HTML do post.
    *   Estilização com Tailwind CSS, alinhada ao `Prototipo.txt` e garantindo boa legibilidade.
*   **Modo LLM Sugerido:** 💻 Code
*   **Informações Cruciais dos Arquivos de Contexto:**
    *   `Prototipo.txt`: Seção "PÁGINA DE POST INDIVIDUAL", detalhando como o título, metadados e conteúdo do post devem ser apresentados.
    *   Conteúdo de `frontend/src/app/blog/[slug]/page.tsx`.
*   **Instruções para Delegação (Exemplo para `new_task`):**
    ```
    Tarefa: Implementar/Ajustar Página Individual de Post

    Contexto: Cada post do blog precisa de sua própria página (ex: '/blog/[slug]'). Uma estrutura pode existir em 'frontend/src/app/blog/[slug]/page.tsx'. O 'Prototipo.txt' guia o design. Funções para buscar dados de posts estão em 'frontend/src/lib/posts.ts'.

    Objetivo Específico:
    1. Analise a seção "PÁGINA DE POST INDIVIDUAL" do 'Prototipo.txt'.
    2. Revise/implemente a página dinâmica 'frontend/src/app/blog/[slug]/page.tsx'. Ela deve:
        - Implementar `generateStaticParams` usando `getAllPosts()` de 'frontend/src/lib/posts.ts' para listar todos os slugs de posts.
        - No componente da página, receber `params` (contendo o slug) e usar `getPostBySlug(params.slug)` para buscar os dados do post (metadados e conteúdo HTML).
        - Renderizar o título do post, metadados (autor, data, categoria, etc., conforme definido no frontmatter e no protótipo) e o conteúdo principal do post (que foi convertido para HTML).
        - Aplicar estilização com Tailwind CSS conforme o 'Prototipo.txt', focando na legibilidade do conteúdo.
    3. Garanta que a página seja responsiva.

    Restrições: Foque apenas na página de exibição de um post individual.

    Output: Ao concluir, use `attempt_completion` com um resumo das implementações/ajustes, confirmando que a página de post individual exibe o conteúdo e metadados corretamente.
    Estas instruções específicas substituem quaisquer instruções gerais conflitantes do modo.
    ```

---

### Subtarefa 6: Implementação da Estilização e Responsividade

*   **Objetivo:** Revisar e garantir que toda a estilização do blog siga o `Prototipo.txt` (cores, fontes, espaçamentos) e que o layout seja totalmente responsivo em dispositivos móveis e desktop.
*   **Entradas:**
    *   `Prototipo.txt` (para diretrizes de cores, fontes, espaçamentos).
    *   Todos os componentes e páginas criados/ajustados nas subtarefas anteriores.
    *   `frontend/tailwind.config.ts` e `frontend/src/app/globals.css`.
*   **Saídas Esperadas:**
    *   Revisão e ajustes finos nas classes Tailwind CSS de todos os componentes e páginas para garantir consistência visual com o `Prototipo.txt`.
    *   Confirmação e garantia de responsividade em diversos tamanhos de tela (mobile, tablet, desktop).
    *   Definição (ou confirmação) das cores personalizadas do StayFocus (ex: `--primary`, `--secondary` ou nomes semânticos como `stayfocus-primary`) em `frontend/tailwind.config.ts` (na seção `theme.extend.colors`) e seu uso consistente.
    *   Verificação das fontes definidas no `Prototipo.txt` e sua correta aplicação (configuração em `tailwind.config.ts` e/ou importação em `globals.css`/`layout.tsx`).
*   **Modo LLM Sugerido:** 💻 Code
*   **Informações Cruciais dos Arquivos de Contexto:**
    *   `Prototipo.txt`: Todas as seções que indicam cores específicas (ex: "CORES: Primária: #XXXXXX, Secundária: #YYYYYY"), fontes (ex: "FONTE TÍTULOS: NomeFonteTitulo, FONTE CORPO: NomeFonteCorpo"), e quaisquer outras diretrizes de estilo visual e espaçamento.
    *   Conteúdo de `frontend/tailwind.config.ts` e `frontend/src/app/globals.css`.
*   **Instruções para Delegação (Exemplo para `new_task`):**
    ```
    Tarefa: Refinar Estilização e Garantir Responsividade

    Contexto: O blog StayFocus precisa estar visualmente alinhado com o 'Prototipo.txt' e ser responsivo. Os componentes e páginas base já foram implementados.

    Objetivo Específico:
    1. Analise o 'Prototipo.txt' para identificar todas as diretrizes de design: cores, tipografia (fontes, tamanhos, pesos), espaçamentos, e layout responsivo.
    2. Configure as cores personalizadas e famílias de fontes do StayFocus em 'frontend/tailwind.config.ts' se ainda não estiverem definidas. Garanta que as fontes sejam carregadas corretamente (ex: via 'frontend/src/app/layout.tsx' ou 'frontend/src/app/globals.css').
    3. Revise todos os componentes React criados (Header, Footer, PostCard, páginas de listagem e de post individual) e ajuste as classes Tailwind CSS para:
        - Corresponder precisamente ao design visual do 'Prototipo.txt'.
        - Garantir consistência de estilo em todo o blog.
        - Assegurar que o layout seja totalmente responsivo e funcional em telas pequenas (mobile), médias (tablet) e grandes (desktop).
    4. Teste a responsividade em diferentes viewports.

    Restrições: Foque na estilização visual e na responsividade. Não altere a lógica funcional dos componentes.

    Output: Ao concluir, use `attempt_completion` com um resumo dos ajustes de estilização e a confirmação de que o blog está visualmente alinhado com o protótipo e é responsivo.
    Estas instruções específicas substituem quaisquer instruções gerais conflitantes do modo.
    ```

---

### Subtarefa 7: (Opcional para MVP) Funcionalidades Adicionais Básicas

*   **Objetivo:** Planejar (e opcionalmente implementar, se o escopo do MVP permitir) funcionalidades simples como paginação na lista de posts ou links/filtros para categorias/tags.
*   **Entradas:**
    *   Decisão sobre o escopo do MVP.
    *   Estrutura de metadados dos posts (Subtarefa 3), especialmente se categorias/tags foram definidas.
*   **Saídas Esperadas:**
    *   **Se apenas planejado:** Uma descrição detalhada de como a paginação e/ou o sistema de categorias/tags seriam implementados. Isso incluiria:
        *   Modificações necessárias nas funções de busca de posts (ex: `getAllPosts({ page, category })`).
        *   Componentes de UI necessários (ex: `PaginationControls.tsx`, `CategoryList.tsx`).
        *   Alterações nas páginas de listagem.
    *   **Se implementado:**
        *   Componentes React e lógica para a funcionalidade escolhida (ex: paginação na `frontend/src/app/blog/page.tsx`).
        *   Atualização das funções em `frontend/src/lib/posts.ts` para suportar a funcionalidade.
*   **Modo LLM Sugerido:** 🏗️ Architect (para planejamento), 💻 Code (para implementação)
*   **Informações Cruciais dos Arquivos de Contexto:**
    *   A estrutura de frontmatter definida na Subtarefa 3 (para saber se `category` ou `tags` estão disponíveis).
    *   O número total de posts (para decidir se a paginação é imediatamente necessária).
*   **Instruções para Delegação (Exemplo para `new_task` - Planejamento):**
    ```
    Tarefa: Planejar Funcionalidades Adicionais (Paginação, Categorias)

    Contexto: Para futuras melhorias do blog StayFocus, precisamos planejar como implementar paginação na lista de posts e/ou um sistema de navegação por categorias/tags. Considere que os posts podem ter metadados como 'category' ou 'tags' no frontmatter.

    Objetivo Específico:
    1. Descreva a abordagem para implementar a paginação na página 'frontend/src/app/blog/page.tsx'. Detalhe:
        - Como a função `getAllPosts()` em 'frontend/src/lib/posts.ts' seria modificada para aceitar um número de página e retornar apenas o subconjunto de posts relevante.
        - Quais componentes de UI seriam necessários para os controles de paginação.
        - Como o estado da página atual seria gerenciado.
    2. Descreva a abordagem para implementar a filtragem/listagem por categorias (ou tags). Detalhe:
        - Como os posts seriam filtrados por categoria.
        - Como as categorias disponíveis seriam listadas (ex: numa barra lateral ou menu).
        - Como as rotas poderiam ser estruturadas (ex: '/blog/category/[categoryName]').

    Restrições: Foque no planejamento e descrição da implementação. Não escreva o código agora.

    Output: Ao concluir, use `attempt_completion` com um documento descrevendo as abordagens planejadas para paginação e categorias/tags.
    Estas instruções específicas substituem quaisquer instruções gerais conflitantes do modo.