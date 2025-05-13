import { getAllPosts, PostData } from '@/lib/posts';
import PostCard from '@/components/blog/PostCard';
import Link from 'next/link';
import Image from 'next/image';
import PaginationControls from '@/components/blog/PaginationControls';
import CategoryDropdown from '@/components/blog/CategoryDropdown';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog StayFocus - Dicas de Produtividade, Foco e Bem-Estar",
    description: "Explore artigos sobre produtividade, gestão de tempo, saúde mental e mais para otimizar seu foco e bem-estar com o StayFocus.",
    keywords: ["produtividade", "foco", "bem-estar", "gestão de tempo", "saúde mental", "dicas", "stayfocus"],
    openGraph: {
      title: "Blog StayFocus - Dicas de Produtividade, Foco e Bem-Estar",
      description: "Explore artigos sobre produtividade, gestão de tempo, saúde mental e mais para otimizar seu foco e bem-estar com o StayFocus.",
      type: 'website',
      // Adicione uma imagem padrão para o blog se disponível, ex:
      // images: [{ url: '/images/blog-default.jpg', width: 1200, height: 630, alt: 'Blog StayFocus' }],
    },
  };
}

const POSTS_PER_PAGE = 8;

interface BlogPageProps {
  searchParams?: {
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const { posts, totalPages } = getAllPosts({ page: currentPage, limit: POSTS_PER_PAGE });

  const formatDate = (dateString: string, includeYear: boolean = true) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: includeYear ? 'numeric' : undefined,
    });
  };

  // Função para determinar a classe da categoria, similar ao PostCard
  const getCategoryClass = (category: string) => {
    if (category.toLowerCase() === "produtividade") {
      return "bg-green-100 text-green-800";
    } else if (category.toLowerCase() === "funcionalidades") {
      return "bg-blue-100 text-blue-800";
    } else if (category.toLowerCase() === "estudos" || category.toLowerCase() === "concursos") {
      return "bg-purple-100 text-purple-800";
    }
    return "bg-gray-100 text-gray-800"; // Default
  };


  return (
    // bg-white já é o padrão do body, mas manter para clareza da seção.
    // text-dark e text-gray são do globals.css
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2 text-dark">Blog StayFocus</h1>
          <p className="text-gray max-w-2xl mx-auto">
            Artigos, dicas e recursos para maximizar sua produtividade, melhorar seus estudos e alcançar seus objetivos.
          </p>
        </div>

        {/* Category Dropdown */}
        <div className="mb-8 flex justify-center md:justify-start">
          <CategoryDropdown />
        </div>

        {/* Posts Grid */}
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
          <p className="text-center text-gray text-lg">Nenhum post encontrado para esta página.</p>
        )}

        {totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/blog"
          />
        )}
      </div>
    </section>
  );
}