import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface PostData {
  slug: string;
  date: string;
  title: string;
  author: string;
  category: string;
  excerpt: string;
  coverImage?: string; // Alterado de image para coverImage e tornado opcional
  keywords?: string[];
  // Adicione quaisquer outros campos do frontmatter que você espera
}

export interface GetAllPostsParams {
  page?: number;
  limit?: number;
  category?: string;
}

export interface PaginatedPostsResult {
  posts: PostData[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
}

// Interface para o post completo, incluindo o conteúdo HTML
export interface FullPostData extends PostData {
  contentHtml: string;
}

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export function getAllPosts(params: GetAllPostsParams = {}): PaginatedPostsResult {
  const { page = 1, limit = 8, category } = params;
  const fileNames = fs.readdirSync(postsDirectory);

  let allPostsData: PostData[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const postData: PostData = {
      slug,
      date: matterResult.data.date || '',
      title: matterResult.data.title || '',
      author: matterResult.data.author || '',
      category: matterResult.data.category || '',
      excerpt: matterResult.data.excerpt || '',
      coverImage: matterResult.data.coverImage,
      keywords: matterResult.data.keywords || [],
      ...(matterResult.data as Partial<PostData>),
    };
    return postData;
  });

  // Filtrar por categoria se fornecida
  if (category) {
    allPostsData = allPostsData.filter(
      (post) => post.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Ordena os posts por data (mais recentes primeiro)
  const sortedPosts = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
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

// Renomeada de getPostData para getPostBySlug
export async function getPostBySlug(slug: string): Promise<FullPostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Garantir que os dados do frontmatter correspondam à interface PostData
  const postData: FullPostData = {
    slug,
    contentHtml,
    date: matterResult.data.date || '',
    title: matterResult.data.title || '',
    author: matterResult.data.author || '',
    category: matterResult.data.category || '',
    excerpt: matterResult.data.excerpt || '',
    coverImage: matterResult.data.coverImage, // Pode ser undefined
    keywords: matterResult.data.keywords || [],
    ...(matterResult.data as Partial<PostData>), // Adiciona outros campos se existirem
  };

  return postData;
}

export function getAllCategories(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const categories = new Set<string>();

  fileNames.forEach((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    if (matterResult.data.category) {
      const categoryName = String(matterResult.data.category).trim();
      if (categoryName) {
        // Normalizar: primeira letra maiúscula, restante minúscula
        const normalizedCategory =
          categoryName.charAt(0).toUpperCase() +
          categoryName.slice(1).toLowerCase();
        categories.add(normalizedCategory);
      }
    }
  });

  return Array.from(categories).sort();
}