import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const postData = await getPostBySlug(params.slug);
  if (!postData) {
    return {
      title: 'Post Não Encontrado',
    };
  }

  const combinedTags = [postData.category];
  if (postData.keywords && postData.keywords.length > 0) {
    combinedTags.push(...postData.keywords);
  }

  return {
    title: `${postData.title} | StayFocus Blog`,
    description: postData.excerpt,
    keywords: postData.keywords || [],
    openGraph: {
      title: postData.title,
      description: postData.excerpt,
      type: 'article',
      authors: [postData.author],
      publishedTime: new Date(postData.date).toISOString(),
      // modifiedTime: se houver um campo de data de modificação
      tags: combinedTags,
      images: [
        {
          url: postData.coverImage || '/api/placeholder/1200/630',
          width: 1200,
          height: 630,
          alt: postData.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts(); // Updated function call
  return posts.map((post) => ({ // Adjusted mapping
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: Props) {
  const postData = await getPostBySlug(params.slug); // Updated function call

  if (!postData) {
    notFound();
  }

  const { title, date, author, category, contentHtml, coverImage } = postData; // Updated to coverImage
  const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    // A classe bg-light já está no body, então não é estritamente necessária aqui, mas pode ser mantida para clareza.
    // O protótipo não especifica um fundo diferente para a página de post individual, então usaremos o padrão.
    <main className="container mx-auto px-4 py-8">
      {/* O protótipo não mostra um card/sombra ao redor do artigo, ele se integra ao fundo. */}
      <article className="max-w-3xl mx-auto"> {/* Removido bg-light, p-6, md:p-8, rounded-lg, shadow-lg */}
        {/* Título do Post - text-dark é #1f2937, que é o text-gray-900 do protótipo */}
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-6">{title}</h1> {/* Aumentado mb de 4 para 6 */}

        {/* Informações do Autor e Data - text-gray é #6b7280 */}
        <div className="flex items-center text-sm text-gray mb-8"> {/* Aumentado mb de 6 para 8 */}
          <Image
            src="/api/placeholder/40/40"
            alt={author}
            width={40}
            height={40}
            className="rounded-full mr-3"
          />
          <div>
            <p className="font-medium text-dark">{author}</p>
            <p>
              {formattedDate} <span className="mx-1">•</span>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">{category}</span> {/* Estilizando a categoria como tag */}
            </p>
          </div>
        </div>

        {coverImage && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg"> {/* Adicionando sombra e bordas arredondadas à imagem de capa */}
            <Image
              src={coverImage}
              alt={`Imagem de destaque para ${title}`}
              width={800} // Proporção 2:1 para a imagem de capa, como no protótipo
              height={400}
              className="w-full object-cover" // Removido rounded-lg daqui, aplicado ao div pai
              priority
            />
          </div>
        )}

        {/* Conteúdo do Post - text-dark para o corpo do texto */}
        {/* As classes 'prose' do Tailwind cuidam da estilização do conteúdo HTML */}
        <div
          className="prose prose-lg max-w-none text-dark prose-headings:text-dark prose-a:text-primary hover:prose-a:text-primary-dark prose-strong:text-dark"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </main>
  );
}