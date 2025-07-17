/**
 * 🏠 PÁGINA INICIAL (PAGE)
 *
 * Página principal do centro de ajuda.
 * Combina hero section e grid de categorias.
 */

"use client"

import type React from "react"

import { useState } from "react"
import { useContent } from "@/contexts/content-context"
import { useSearch } from "@/hooks/use-search"
import { Layout } from "@/components/layout/layout"
import { HeroSection } from "@/components/sections/hero-section"
import { CategoriesGrid } from "@/components/sections/categories-grid"

export function HomePage() {
  const { content } = useContent()
  const [headerSearchValue, setHeaderSearchValue] = useState("")

  // 🔍 Hook de busca para o modal
  const {
    searchValue: modalSearchValue,
    setSearchValue: setModalSearchValue,
    isModalOpen,
    openModal,
    closeModal,
  } = useSearch({
    items: content.sidebar.items,
  })

  // 🎯 Abrir modal e sincronizar valores
  const handleOpenSearchModal = () => {
    // Se há valor no header, usar no modal
    if (headerSearchValue) {
      setModalSearchValue(headerSearchValue)
    }
    openModal()
  }

  return (
    <Layout
      searchValue={headerSearchValue}
      onSearchChange={setHeaderSearchValue}
      mainSearchValue={modalSearchValue}
      onMainSearchChange={setModalSearchValue}
    >
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "right",
        }}
      >

        <div
          className="font-jakarta"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "calc(100vh * 0.07)",

            marginTop: "56px",
            fontSize: "42px",
            width: "calc(100vw * 0.76)",

            padding: "calc(100vh * 0.09) 0 calc(100vh * 0.16) 0"
          }}
        >
          <HeroSection
            title={content.homepage.hero.title}
            subtitle={content.homepage.hero.subtitle}
            searchPlaceholder={content.homepage.hero.searchPlaceholder}
            searchValue={modalSearchValue}
            onSearchChange={setModalSearchValue}
            onOpenSearchModal={handleOpenSearchModal} // Passa a função para abrir o modal
          />

          <CategoriesGrid title={content.homepage.categories.title} categories={content.homepage.categories.items} />
        </div>
      </div>

      {/* Modal de busca integrado */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-50 flex items-start justify-center pt-16 lg:pt-24 px-4">
          <div className="bg-white shadow-2xl w-full max-w-xl lg:max-w-2xl max-h-96 modal">
            {/* Importar o SearchModal diretamente aqui para evitar conflitos */}
            <SearchModalContent
              isOpen={isModalOpen}
              onClose={closeModal}
              searchValue={modalSearchValue}
              onSearchChange={setModalSearchValue}
              items={content.sidebar.items}
            />
          </div>
        </div>
      )}
    </Layout>
  )
}

// Componente SearchModal inline para evitar conflitos
import { useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { SidebarItem } from "@/types/content"

interface SearchModalContentProps {
  isOpen: boolean
  onClose: () => void
  searchValue: string
  onSearchChange: (value: string) => void
  items: SidebarItem[]
}

function SearchModalContent({ isOpen, onClose, searchValue, onSearchChange, items }: SearchModalContentProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Filtrar itens
  const filteredItems = items.slice(0, -1).filter((item) => {
    if (!searchValue.trim()) return true
    const searchTerm = searchValue.toLowerCase()
    return (
      item.title.toLowerCase().includes(searchTerm) ||
      item.description?.toLowerCase().includes(searchTerm) ||
      item.subitems?.some((subitem) => subitem.title.toLowerCase().includes(searchTerm))
    )
  })

  // Navegar para item
  const navigateToItem = (item: SidebarItem) => {
    if (item.subitems && item.subitems.length > 0) {
      router.push(`/article/${item.subitems[0].slug}`)
    }
    onClose()
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        onClose()
        break
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1))
        break
      case "Enter":
        e.preventDefault()
        if (filteredItems[selectedIndex]) {
          navigateToItem(filteredItems[selectedIndex])
        }
        break
    }
  }

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [searchValue])

  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {/* Header */}
      <div className="p-3 lg:p-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search help articles (e.g. flowcharts or settings)"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 py-2.5 lg:py-3 w-full border-0 focus:ring-0 text-sm lg:text-base bg-transparent"
            autoFocus
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-h-80 overflow-y-auto bg-white p-1">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className={`
                flex items-start space-x-3 p-3 lg:p-4 cursor-pointer border-b border-gray-50 last:border-b-0 transition-colors
                ${index === selectedIndex ? "bg-purple-50 border-purple-100" : "hover:bg-gray-50"}
              `}
              onClick={() => navigateToItem(item)}
            >
              <div className="flex-shrink-0 mt-0.5">
                <div
                  className={`
                    w-5 lg:w-6 h-5 lg:h-6 rounded bg-slate-100 flex items-center justify-center
                    ${index === selectedIndex ? "bg-purple-100" : ""}
                  `}
                >
                  <div className="w-4 h-4 text-gray-600" dangerouslySetInnerHTML={{ __html: item.iconHtml || "" }} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm mb-1">{item.title}</h3>
                {item.description && <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>}
              </div>
              {index === selectedIndex && (
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-sm">
              {searchValue ? "Nenhum resultado encontrado" : "Digite para buscar"}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="modal-footer px-3 lg:px-4 py-2.5 lg:py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-3 lg:space-x-4">
          <span className="flex items-center space-x-1.5">
            <kbd className="px-1.5 lg:px-2 py-0.5 lg:py-1 bg-white border border-gray-200 rounded text-xs font-medium">
              ↵
            </kbd>
            <span>Abrir</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <kbd className="px-1.5 lg:px-2 py-0.5 lg:py-1 bg-white border border-gray-200 rounded text-xs font-medium">
              ↑↓
            </kbd>
            <span>Navegar</span>
          </span>
        </div>
        <div className="flex items-center space-x-3 lg:space-x-4">
          <button onClick={onClose} className="hover:text-gray-700 transition-colors text-xs">
            Fechar
          </button>
          <span className="flex items-center space-x-1.5">
            <kbd className="px-1.5 lg:px-2 py-0.5 lg:py-1 bg-white border border-gray-200 rounded text-xs font-medium">
              ESC
            </kbd>
          </span>
        </div>
      </div>
    </div>
  )
}
