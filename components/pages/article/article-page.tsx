/**
 * 📖 PÁGINA DE ARTIGO (PAGE)
 *
 * Página de artigo que replica o layout do Whimsical.
 * Layout com conteúdo principal e sidebar de navegação.
 */

"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { useContent } from "@/contexts/content-context"
import { useArticleNavigation } from "@/hooks/use-article-navigation"
import { Layout } from "@/components/layout/layout"
import { ArticleContent } from "@/components/sections/article-content"
import { ArticleSidebar } from "@/components/sections/article-sidebar"

export function ArticlePage() {
  const params = useParams()
  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug
  const { content } = useContent()
  const [searchValue, setSearchValue] = useState("")

  const article = content.articles[slug as keyof typeof content.articles]

  const { activeSection, scrollToSection, copyLink } = useArticleNavigation({
    summary: article?.summary || [],
  })

  if (!article) {
    return (
      <Layout searchValue={searchValue} onSearchChange={setSearchValue} currentSlug={slug}>
        <div
          className="flex items-center justify-center min-h-96 mt-[60px]"
          style={{
            width: "calc(100vw - 300px)",
            position: "absolute",
            right: 0
          }}
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Artigo não encontrado</h1>
            <p className="text-gray-600">O artigo que você está procurando não existe.</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout searchValue={searchValue} onSearchChange={setSearchValue} currentSlug={slug}>
      <div className="flex-1 flex" style={{
        justifyContent: "right",
      }}>
        <ArticleContent article={article} />
        <ArticleSidebar
          summary={article.summary}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          copyLink={copyLink}
        />
      </div>
    </Layout>
  )
}
