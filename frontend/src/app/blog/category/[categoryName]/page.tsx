import { getAllPosts, PostData, getAllCategories } from '@/lib/posts';
import PostCard from '@/components/blog/PostCard';
import PaginationControls from '@/components/blog/PaginationControls';
import CategoryDropdown from '@/components/blog/CategoryDropdown'; // Reutilizar o dropdown
import { Metadata } from 'next';

// Função para formatar o nome da categoria para exibição (Primeira letra maiúscula)
// Movida para cima para ser usada em generateMetadata
const formatCategoryForDisplay = (categorySlug: string): string => {
  return categorySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categorySlug = params.categoryName;
  const formattedCategoryName = formatCategoryForDisplay(decodeURIComponent(categorySlug));

  // Tenta encontrar o nome original da categoria para usar nas keywords, se necessário
  // ou usa o nome formatado diretamente.
  const allCategories = getAllCategories();
  const originalCategoryName = allCategories.find(
    cat => normalizeCategoryForURL(cat) === decodeURIComponent(categorySlug)
  ) || formattedCategoryName;


  return {
    title: `Posts sobre ${formattedCategoryName} | StayFocus Blog`,
    description: `Explore todos os posts sobre ${formattedCategoryName} no blog StayFocus. Encontre dicas, artigos e recursos sobre ${formattedCategoryName} e muito mais.`,
    keywords: [originalCategoryName, formattedCategoryName, "blog", "stayfocus", "artigos", "dicas"],
    openGraph: {
      title: `Posts sobre ${formattedCategoryName} | StayFocus Blog`,
      description: `Explore todos os posts sobre ${formattedCategoryName} no blog StayFocus.`,
      type: 'website', // Ou 'object' dependendo da granularidade
      // Adicione uma imagem padrão para categorias ou uma lógica para imagem específica se aplicável
      // images: [{ url: '/images/category-default.jpg', width: 1200, height: 630, alt: `Posts sobre ${formattedCategoryName}` }],
    },
  };
}

const POSTS_PER_PAGE = 8;

interface CategoryPageProps {
  params: {
    categoryName: string;
  };
  searchParams?: {
    page?: string;
  };
}

// Função para normalizar o nome da categoria para um slug de URL (consistente)
const normalizeCategoryForURL = (categoryName: string): string => {
  return categoryName.toLowerCase().replace(/\s+/g, '-');
};

// A função formatCategoryForDisplay foi movida para o topo do arquivo.

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    categoryName: normalizeCategoryForURL(category),
  }));
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { categoryName: categorySlug } = params;
  // Decodificar o slug da categoria (embora nossa normalização atual não gere caracteres que precisem de decode)
  // É uma boa prática manter caso a normalização mude.
  const decodedCategorySlug = decodeURIComponent(categorySlug);

  // Para filtrar em getAllPosts, precisamos do nome da categoria como está nos metadados (ex: "Produtividade")
  // A função getAllCategories() já retorna os nomes normalizados (primeira maiúscula).
  // Vamos encontrar a categoria original correspondente ao slug para passar para getAllPosts.
  const allCategories = getAllCategories();
  const originalCategoryName = allCategories.find(
    cat => normalizeCategoryForURL(cat) === decodedCategorySlug
  );

  const currentPage = Number(searchParams?.page) || 1;

  let posts: PostData[] = [];
  let totalPages = 0;
  let displayCategoryName = formatCategoryForDisplay(decodedCategorySlug); // Nome para exibição

  if (originalCategoryName) {
    const result = getAllPosts({
      category: originalCategoryName, // Usar o nome original aqui
      page: currentPage,
      limit: POSTS_PER_PAGE,
    });
    posts = result.posts;
    totalPages = result.totalPages;
  } else {
    // Se a categoria não for encontrada (slug inválido), podemos mostrar uma mensagem ou redirecionar.
    // Por enquanto, apenas não mostrará posts.
    console.warn(`Categoria não encontrada para o slug: ${decodedCategorySlug}`);
    displayCategoryName = "Categoria não encontrada";
  }


  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2 text-dark">
            Posts na categoria: {displayCategoryName}
          </h1>
        </div>

        {/* Category Dropdown */}
        <div className="mb-8 flex justify-center md:justify-start">
          <CategoryDropdown />
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: PostData) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                date={post.date}
                excerpt={post.excerpt}
                coverImage={post.coverImage || '/api/placeholder/400/220'}
                category={post.category || 'Geral'}
                author={post.author || 'Autor Desconhecido'}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray text-lg">
            Nenhum post encontrado para esta categoria ou página.
          </p>
        )}

        {totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={`/blog/category/${decodedCategorySlug}`}
          />
        )}
      </div>
    </section>
  );
}