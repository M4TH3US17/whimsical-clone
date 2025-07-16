"use client"

import type React from "react"
import { useState } from "react"
import { useContent } from "@/contexts/content-context"
import { useSearch } from "@/hooks/use-search"
import { AppSidebar } from "./app-sidebar"
import { AppHeader } from "./app-header"
import { SearchModal } from "../modals/search-modal"

interface LayoutProps {
  children: React.ReactNode
  searchValue?: string
  onSearchChange?: (value: string) => void
  mainSearchValue?: string
  onMainSearchChange?: (value: string) => void
  currentSlug?: string
}

interface LayoutComposition {
  Content: React.FC<{ children: React.ReactNode }>
  Sidebar: React.FC<any>
  Header: React.FC<any>
  SearchModal: React.FC<any>
}

export const Layout: React.FC<LayoutProps> & LayoutComposition = ({
  children,
  searchValue = "",
  onSearchChange = () => {},
  mainSearchValue = "",
  onMainSearchChange = () => {},
  currentSlug,
}) => {
  const { content } = useContent()
  const [expandedItems, setExpandedItems] = useState<number[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // 🔍 Hook de busca integrado
  const {
    searchValue: modalSearchValue,
    setSearchValue: setModalSearchValue,
    isModalOpen,
    openModal,
    closeModal,
  } = useSearch({
    items: content.sidebar.items,
  })

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const closeSidebar = () => setSidebarOpen(false)

  // 🎯 Sincronizar busca principal com modal
  const handleMainSearchChange = (value: string) => {
    onMainSearchChange(value)
    setModalSearchValue(value)
  }

  const handleOpenSearchModal = () => {
    // Se há valor na busca principal, usar no modal
    if (mainSearchValue) {
      setModalSearchValue(mainSearchValue)
    }
    openModal()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex relative">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 xl:hidden" onClick={closeSidebar} />}

        <AppSidebar
          items={content.sidebar.items}
          expandedItems={expandedItems}
          onToggleExpanded={toggleExpanded}
          onClose={closeSidebar}
          currentSlug={currentSlug}
        />

        <main className="flex-1 min-h-screen bg-[#F5F5F5] transition-all duration-300 xl:ml-[300px]" >
          <AppHeader
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            onOpenSearchModal={handleOpenSearchModal}
            onOpenSidebar={() => setSidebarOpen(true)}
          />
          {children}
        </main>
      </div>

      <SearchModal
        isOpen={isModalOpen}
        onClose={closeModal}
        searchValue={modalSearchValue}
        onSearchChange={setModalSearchValue}
        items={content.sidebar.items}
      />
    </div>
  )
}

// Composition components
Layout.Content = ({ children }) => <>{children}</>
Layout.Sidebar = AppSidebar
Layout.Header = AppHeader
Layout.SearchModal = SearchModal
