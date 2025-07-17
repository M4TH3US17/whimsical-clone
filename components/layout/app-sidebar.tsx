"use client"
import Link from "next/link"
import { ChevronRight, ExternalLink } from "lucide-react"
import type { SidebarItem } from "@/types/content"
import LogoPassChumbo from "../../public/logo_pass_2025_chumbo.svg"

interface AppSidebarProps {
  items: SidebarItem[]
  expandedItems: number[]
  onToggleExpanded: (index: number) => void
  onClose: () => void
  currentSlug?: string 
  isCollapsed?: boolean
}

export function AppSidebar({ items, expandedItems, onToggleExpanded, onClose, currentSlug, isCollapsed=false }: AppSidebarProps) {
  return (
    <aside
      className={`
        bg-white shadow-md h-screen z-40 transition-transform duration-300 ease-in-out
        ${isCollapsed ? "fixed top-0 left-0 w-64 transform -translate-x-full" : "w-[300px] hidden lg:block"}
      `}
      style={{
        width: "calc(100vw * 0.24)",
        position: "fixed",
        background: "#F5F5F5",
        borderRight: "1px solid #ccccccff",
      }}
    >
      {/* Sidebar Header */}
      <div className="p-6 border-gray-200" style={{ display: "flex", justifyContent: "space-around" }}>
        <Link
          href="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
          onClick={onClose}
        >
          <img src={LogoPassChumbo} />
        </Link>
        <span className="text-black-600 text-sm mt-1 block help-center">Help Center</span>
      </div>

      <nav className="px-4 space-y-1 overflow-y-auto h-full" style={{ height: "100vh" }}>
        {items.map((item, index) => (
          <SidebarItemComponent
            key={index}
            item={item}
            index={index}
            isExpanded={expandedItems.includes(index)}
            onToggleExpanded={onToggleExpanded}
            onClose={onClose}
            currentSlug={currentSlug}
          />
        ))}
      </nav>
    </aside>
  )
}

interface SidebarItemProps {
  item: SidebarItem
  index: number
  isExpanded: boolean
  onToggleExpanded: (index: number) => void
  onClose: () => void
  currentSlug?: string
}

function SidebarItemComponent({ item, index, isExpanded, onToggleExpanded, onClose, currentSlug }: SidebarItemProps) {
  return (
    <div style={{ marginBottom: "11px" }}>
      <div
        className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 cursor-pointer group"
        onClick={() => {
          if (item.hasChevron) {
            onToggleExpanded(index)
          } else {
            onClose()
          }
        }}
      >
        <div className="flex items-center space-x-2">
          <div dangerouslySetInnerHTML={{ __html: item.iconHtml }} />
          <span className="primary-font-color xl-font" style={{ color: "#000000" }}>{item.title}</span>
        </div>
        {/* {item.hasChevron && (
          <ChevronRight
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
          />
        )} */}
        {item.hasExternalLink && <ExternalLink className="w-4 h-4 text-gray-400" />}
      </div>
      {item.hasChevron && isExpanded && item.subitems && (
        <div className="ml-7 mt-1 space-y-1">
          {item.subitems.map((subitem, subIndex) => (
            <Link
              key={subIndex}
              href={`/article/${subitem.slug}`}
              className={`block px-3 py-1 text-sm rounded-md hover:bg-gray-50 cursor-pointer primary-font-color xl-sub-item primary-font-color xl-font ${currentSlug === subitem.slug ? "bg-purple-50 text-purple-700 font-medium" : "text-gray-600"
                }`}
              onClick={onClose}
            >
              {subitem.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
