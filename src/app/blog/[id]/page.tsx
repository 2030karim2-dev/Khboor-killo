import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, User, Calendar, ChevronLeft, Share2, Heart } from "lucide-react";
import { getBlogPostById, blogPosts, blogCategories } from "@/data/blog";
import { Breadcrumb } from "@/components/ui";
import Image from "next/image";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ id: post.id }));
}

export default function BlogPostPage({ params }: Props) {
  "use client";
  const { id } = use(params);
  const post = getBlogPostById(id);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "المدونة", href: "/blog" },
          { label: post.title },
        ]}
      />

      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-500 mb-6 transition-colors"
      >
        <ChevronLeft size={18} />
        <span>العودة للمدونة</span>
      </Link>

      {/* Article */}
      <article className="card overflow-hidden">
        {/* Header Image */}
        <div className="relative h-64 md:h-80">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-6 start-6 end-6">
            <span className="inline-block bg-sky-500 text-white text-sm px-3 py-1 rounded-full mb-3">
              {blogCategories.find((c) => c.slug === post.category)?.icon}{" "}
              {blogCategories.find((c) => c.slug === post.category)?.name}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {post.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-slate-500 pb-6 border-b border-slate-100 dark:border-slate-700">
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {post.publishedAt}
            </span>
            <span className="flex items-center gap-2">
              <User size={16} />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} />
              {post.readTime} دقيقة قراءة
            </span>
          </div>

          {/* Excerpt */}
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl mb-6">
            <p className="text-slate-600 dark:text-slate-300 font-medium">{post.excerpt}</p>
          </div>

          {/* Article Body */}
          <div
            className="prose prose-slate dark:prose-invert max-w-none"
            dir="rtl"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br/>").replace(/## /g, "<h2 class='text-xl font-bold text-slate-800 mt-6 mb-3'>").replace(/ - /g, "</h2><p>").replace(/\n/g, "</p><p>") }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm text-slate-600 dark:text-slate-300"
                >
                  # {tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
            <button className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
              <Heart size={18} />
              <span>أعجبني</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-sky-50 dark:bg-sky-900/20 text-sky-500 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors">
              <Share2 size={18} />
              <span>مشاركة</span>
            </button>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">مقالات ذات صلة</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                href={`/blog/${related.id}`}
                className="card overflow-hidden group"
              >
                <div className="relative h-32">
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-slate-800 text-sm line-clamp-2 group-hover:text-sky-600 transition-colors">
                    {related.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}