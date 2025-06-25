import { ChevronRight, CreditCard, Download, ExternalLink, FileText, FolderOpen, HelpCircle, Keyboard, Layout, Palette, User, Users, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { sidebarItems } from "./items"

import "../../css/page.css"
import "../../css/modal.css"

export default function SideBar() {
  const [mainSearchValue, setMainSearchValue] = useState("")
  const [expandedItems, setExpandedItems] = useState<number[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [selectedSearchItem, setSelectedSearchItem] = useState(0)
  const modalRef = useRef<HTMLDivElement>(null)

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const closeSidebar = () => setSidebarOpen(false)

  const openSearchModal = () => {
    setSearchModalOpen(true)
    setSelectedSearchItem(0)
  }

  const closeSearchModal = () => {
    setSearchModalOpen(false)
    setMainSearchValue("")
  }

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeSearchModal()
      }
    }

    if (searchModalOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchModalOpen])

  return <aside
    className={`
             xl:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out xl:transform-none primary-bg-color
          `}
    style={{ maxWidth: "300px" }}
  >
    {/* Sidebar Header */}
    <div className="p-4 border-gray-200" style={{ display: "flex", justifyContent: "space-around" }}>
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-sm"></div>
        </div>
        <span className="font-semibold text-gray-900">Whimsical</span>
      </div>
      <span className="text-gray-600 text-sm mt-1 block help-center">Help Center</span>
    </div>

    {/* Mobile close button */}F
    {/* <div className="xl:hidden flex justify-end p-4">
            <button onClick={closeSidebar} className="p-1 rounded-md hover:bg-gray-100">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div> */}

    <nav className="p-4 space-y-1 overflow-y-auto h-full" style={{ height: "100vh" }}>
      {sidebarItems.map((item, index) => (
        <div key={index} style={{ marginBottom: "11px" }}>
          <div
            className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 cursor-pointer group"
            onClick={() => {
              if (item.hasChevron) {
                toggleExpanded(index)
              } else {
                closeSidebar()
              }
            }}
          >
            <div className="flex items-center space-x-2">
              {item.icon}
              <span className="primary-font-color xl-font">{item.title}</span>
            </div>
            {item.hasChevron && (
              <ChevronRight
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedItems.includes(index) ? "rotate-90" : ""
                  }`}
              />
            )}
            {item.hasExternalLink && <ExternalLink className="w-4 h-4 text-gray-400" />}
          </div>
          {item.hasChevron && expandedItems.includes(index) && item.subitems && (
            <div className="ml-7 mt-1 space-y-1">
              {item.subitems.map((subitem, subIndex) => (
                <Link
                  key={subIndex}
                  href={`/article/${subitem.slug}`}
                  className="block px-3 py-1 text-sm text-gray-600 rounded-md hover:bg-gray-50 cursor-pointer primary-font-color xl-sub-item"
                  onClick={closeSidebar}
                >
                  {subitem.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  </aside>
}