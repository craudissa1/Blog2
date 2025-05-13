import Link from 'next/link';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  basePath,
}) => {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const prevPageUrl = `${basePath}?page=${prevPage}`;
  const nextPageUrl = `${basePath}?page=${nextPage}`;

  return (
    <div className="flex justify-center items-center space-x-4 my-8">
      <Link
        href={prevPageUrl}
        passHref
        legacyBehavior
      >
        <a
          className={`px-4 py-2 border rounded-md ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          aria-disabled={currentPage === 1}
          onClick={(e) => {
            if (currentPage === 1) e.preventDefault();
          }}
        >
          Anterior
        </a>
      </Link>

      <span className="text-gray-700">
        Página {currentPage} de {totalPages}
      </span>

      <Link
        href={nextPageUrl}
        passHref
        legacyBehavior
      >
        <a
          className={`px-4 py-2 border rounded-md ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          aria-disabled={currentPage === totalPages}
          onClick={(e) => {
            if (currentPage === totalPages) e.preventDefault();
          }}
        >
          Próxima
        </a>
      </Link>
    </div>
  );
};

export default PaginationControls;