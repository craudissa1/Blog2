'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getAllCategories } from '@/lib/posts'; // Ajuste o caminho se necessário

// Função para normalizar o nome da categoria para um slug de URL
const normalizeCategoryForURL = (categoryName: string): string => {
  return categoryName.toLowerCase().replace(/\s+/g, '-');
};

export default function CategoryDropdown() {
  const categories = getAllCategories();
  const pathname = usePathname();

  // Determinar a categoria ativa baseada na URL
  // Ex: /blog/category/nome-da-categoria -> nome-da-categoria
  // Ex: /blog -> todas
  let activeCategorySlug = 'todas';
  if (pathname.startsWith('/blog/category/')) {
    activeCategorySlug = pathname.split('/blog/category/')[1]?.split('/')[0] || 'todas';
  }

  return (
    <div className="relative inline-block text-left mb-8">
      <label htmlFor="category-select" className="sr-only">
        Selecionar Categoria
      </label>
      <select
        id="category-select"
        value={activeCategorySlug === 'todas' ? '/blog' : `/blog/category/${activeCategorySlug}`}
        onChange={(e) => {
          window.location.href = e.target.value;
        }}
        className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-8 text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-500"
      >
        <option value="/blog">Todas as Categorias</option>
        {categories.map((category) => {
          const categorySlug = normalizeCategoryForURL(category);
          return (
            <option key={categorySlug} value={`/blog/category/${categorySlug}`}>
              {category}
            </option>
          );
        })}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
        <svg
          className="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
}