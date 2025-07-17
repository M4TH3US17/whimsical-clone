import Link from "next/link"
import type { CategoryItem } from "@/types/content"

interface CategoriesGridProps {
  title: string
  categories: CategoryItem[]
}

export function CategoriesGrid({ title, categories }: CategoriesGridProps) {
  return (
    <div
      className="max-w-full xl:max-w-none lg:max-w-[600px] lg:mx-auto"
      style={{
        // background: "red",
        width: "calc((100vw * 0.76) * 0.8)",
      }}
    >
      <h2
        className="text-lg lg:text-xl text-gray-900 mb-3 lg:mb-3"
        style={{
          color: "#252525",
          fontSize: "18.5px",
          fontWeight: 500,
        }}
      >
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </div>
  )
}

interface CategoryCardProps {
  category: CategoryItem
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={category.link}
      className="bg-white p-4 lg:p-6 cursor-pointer group aspect-square flex flex-col relative overflow-hidden"
      style={{
        maxHeight: "225px",
        width: "100%",
        background: "#FFFFFF",
        border: "1px solid #ccccccff",
        borderRadius: "15px"
      }}
    >
      <div className="flex flex-col h-full relative z-10">
        <div className="flex-shrink-0 mb-3 lg:mb-4">
          <div
            className="w-8 lg:w-10 h-8 lg:h-10 rounded-full bg-slate-100 flex items-center justify-center 
               group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:via-purple-500 group-hover:to-pink-500
               transition-all duration-300 icon-color"
            style={{
              background: "#F5F5F5",
            }}
          >
            <span
              className="text-gray-600 group-hover:text-black transition-colors duration-300"
              style={{
                color: "black",
              }}
              dangerouslySetInnerHTML={{ __html: category.iconHtml }}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <h3 className="font-semibold text-gray-900 mb-2 lg:mb-3 text-sm lg:text-base leading-tight">
            {category.title}
          </h3>
          {category.description && (
            <p
              className="text-gray-600 text-xs lg:text-sm mb-2 lg:mb-3 leading-relaxed flex-1"
              style={{ fontSize: "13px", color: "#252525", fontWeight: 500 }}
            >
              {category.description}
            </p>
          )}
          {category.articles && (
            <p className="text-xs text-gray-400 font-medium tracking-wide mt-auto" style={{ fontSize: "9px", color: "#000000" }}>
              {category.articles}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
