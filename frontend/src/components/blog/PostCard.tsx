import Link from 'next/link';
import Image from 'next/image';

type PostCardProps = {
  slug: string;
  title: string;
  date: string; // Formato YYYY-MM-DD
  excerpt: string;
  coverImage?: string; // Alterado de image para coverImage e tornado opcional
  category: string;
  author: string;
  // readingTime?: string; // Opcional por enquanto
};

const PostCard: React.FC<PostCardProps> = ({ slug, title, date, excerpt, coverImage, category, author }) => {
  // Função para normalizar o nome da categoria para um slug de URL
  const normalizeCategoryForURL = (categoryName: string): string => {
    return categoryName.toLowerCase().replace(/\s+/g, '-');
  };

  const categorySlug = normalizeCategoryForURL(category);

  // A formatação da data já está boa.
  const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    // year: 'numeric', // Removendo o ano para ficar mais parecido com o protótipo que só mostra "8 de maio"
  });

  // Determinar a cor da tag da categoria com base no protótipo
  let categoryClass = "bg-gray-100 text-gray-800"; // Default
  if (category.toLowerCase() === "produtividade") {
    categoryClass = "bg-green-100 text-green-800";
  } else if (category.toLowerCase() === "funcionalidades") {
    categoryClass = "bg-blue-100 text-blue-800";
  } else if (category.toLowerCase() === "estudos" || category.toLowerCase() === "concursos") { // Agrupando Estudos e Concursos como no protótipo
    categoryClass = "bg-purple-100 text-purple-800";
  }


  return (
    <Link href={`/blog/${slug}`} legacyBehavior>
      {/* A classe .card já é aplicada globalmente, não precisa repetir bg-white, rounded-xl, shadow-md, etc. */}
      <a className="card block"> {/* Removido hover específico, pois .card já tem :hover */}
        <div className="relative w-full h-48 object-cover"> {/* object-cover adicionado aqui */}
          <Image
            src={coverImage || '/api/placeholder/400/220'}
            alt={title}
            layout="fill"
            objectFit="cover" // Mantido para garantir o comportamento da imagem
            // className="w-full h-full" // Removido pois layout="fill" já cuida disso
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-3">
            <Link href={`/blog/category/${categorySlug}`} legacyBehavior>
              <a onClick={(e) => e.stopPropagation()} className={`${categoryClass} text-xs font-medium px-2.5 py-0.5 rounded hover:opacity-80 transition-opacity`}>
                {category}
              </a>
            </Link>
          </div>
          {/* text-dark (definido no globals.css) é #1f2937, que é o text-gray-900 do protótipo */}
          <h3 className="text-xl font-bold mb-3 text-dark">{title}</h3>
          {/* text-gray (definido no globals.css) é #6b7280, que é o text-gray-600 do protótipo */}
          <p className="text-gray mb-4 line-clamp-3 flex-grow">{excerpt}</p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center">
              <Image src="/api/placeholder/32/32" alt={author} width={32} height={32} className="rounded-full mr-3 w-8 h-8" /> {/* mr-3 conforme protótipo */}
              {/* text-gray-500 do protótipo é um pouco mais claro que nosso text-gray. Usaremos text-gray por enquanto. */}
              <p className="text-gray text-sm">{author}</p>
            </div>
            {/* O protótipo mostra tempo de leitura, não data. Vamos manter a data por enquanto, mas sem o ano. */}
            <p className="text-gray text-sm">{formattedDate}</p>
            {/* Exemplo de como seria o tempo de leitura se tivéssemos essa info:
            <p className="text-gray-500 text-sm">6 min</p>
            */}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default PostCard;