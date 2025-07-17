"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface HeroSectionProps {
  title: string
  subtitle: string
  searchPlaceholder: string
  searchValue: string
  onSearchChange: (value: string) => void
  onOpenSearchModal?: () => void
}

export function HeroSection({
  title,
  subtitle,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  onOpenSearchModal,
}: HeroSectionProps) {
  const renderTitle = () => {
    const parts = title.split(/(\{[^}]+\})/)
    return parts.map((part, index) => {
      if (part.startsWith("{") && part.endsWith("}")) {
        const content = part.slice(1, -1)
        return (
          <span
            key={index}
            className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 bg-clip-text text-transparent title-size"
          >
            {content}
          </span>
        )
      }
      return (
        <span key={index} className="title-size">
          {part}
        </span>
      )
    })
  }

  return (
    <div
      className="text-center"
      style={{
        // background: "red",
        width: "calc((100vw * 0.76) * 0.8)",
        // margin: "0 auto",
      }}
    >
      <h1 className="text-3xl font-bold leading-tight title-size">{renderTitle()}</h1>
      <p
        className="text-gray-600 text-base lg:text-lg mb-8 lg:mb-6 leading-relaxed subtitle-size"
        style={{ color: "#252525" }}
        dangerouslySetInnerHTML={{ __html: subtitle }}
      />

      {/* Main Search - Agora abre o modal ao clicar */}
      <div className="relative w-[600px] mx-auto px-4 main-search-nest-hub">
        <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={onOpenSearchModal}
          onClick={onOpenSearchModal} // Adiciona click handler
          className="pl-12 pr-16 py-3 w-full text-sm border-1 rounded-lg focus:ring-purple-500 focus:border-purple-500 shadow-sm cursor-pointer"
          style={{ height: "43px", background: "#FFFFFF", borderRadius: "12px", border: "1px #ccccccff solid", }}
          readOnly // Torna o input apenas para abrir o modal
        />
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 bg-gray-100 px-2 py-1 rounded hidden lg:block">
          CTRL K
        </div>
      </div>
    </div>
  )
}
