"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Clock, User, ChevronLeft } from "lucide-react";
import { blogPosts, blogCategories, getFeaturedPosts } from "@/data/blog";
import { Breadcrumb } from "@/components/ui";
import { useFormatPrice } from "@/hooks/useFormatPrice";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const featuredPosts = getFeaturedPosts();
  const filteredPosts = selectedCategory
    ? blogPosts.filter((post) => post.category === selectedCategory)
    : searchQuery
    ? blogPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : blogPosts;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "المدونة" }]} />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">المدونة</h1>
        <p className="text-slate-500">أخبار، نصائح وعروض حصرية</p>
      </div>

      {/* Search & Categories */}
      <div className="card p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث في المقالات..."
              className="w-full py-2.5 pe-10 ps-4 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none transition-colors text-end bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === null
                  ? "bg-sky-500 text-white"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
              }`}
            >
              الكل
            </button>
            {blogCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.slug
                    ? "bg-sky-500 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Posts */}
      {!selectedCategory && !searchQuery && featuredPosts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">مقالات مميزة</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {featuredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="card overflow-hidden group"
              >
                <div className="relative h-48 md:h-56">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 start-4 end-4">
                    <span className="text-white font-medium text-sm bg-sky-500 px-2 py-1 rounded-full">
                      {blogCategories.find((c) => c.slug === post.category)?.icon}{" "}
                      {blogCategories.find((c) => c.slug === post.category)?.name}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime} دقيقة قراءة
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={12} />
                      {post.author}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All Posts Grid */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          {selectedCategory
            ? blogCategories.find((c) => c.slug === selectedCategory)?.name
            : searchQuery
            ? `نتائج البحث`
            : "جميع المقالات"}
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="card overflow-hidden group"
            >
              <div className="relative h-40">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 start-2 bg-white/90 dark:bg-slate-800/90 px-2 py-1 rounded-full text-xs font-medium">
                  {post.readTime} دقيقة
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-3">{post.excerpt}</p>
                <span className="text-xs text-sky-500 flex items-center gap-1">
                  {post.publishedAt}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">لا توجد مقالات المطابقة</p>
          </div>
        )}
      </div>
    </div>
  );
}