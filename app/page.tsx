"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  Search,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  FileText,
  Keyboard,
  Layout,
  FolderOpen,
  Palette,
  CreditCard,
  User,
  Users,
  Download,
  Zap,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import "./css/page.css"

const sidebarItems = [
  {
    icon: (
      <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center icon-sidebar">
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
    ),
    title: "Getting started",
    description: "Get to know Whimsical at a high level so you can start creating.",
    hasChevron: true,
    subitems: [
      { title: "Getting started with sequence diagrams", slug: "getting-started/sequence-diagrams" },
      { title: "What is Whimsical?", slug: "getting-started/what-is-whimsical" },
      { title: "Getting started with docs", slug: "getting-started/docs" },
      { title: "What can you do with Whimsical?", slug: "getting-started/what-can-you-do" },
      { title: "Getting to know Whimsical - video overview", slug: "getting-started/video-overview" },
    ],
  },
  {
    icon: <Keyboard className="w-4 h-4 text-gray-600 icon-sidebar" />,
    title: "Keyboard shortcuts",
    description: "Keep your hands off the mouse, and use Whimsical at speed.",
    hasChevron: true,
    subitems: [
      { title: "General shortcuts", slug: "keyboard-shortcuts/general" },
      { title: "Board shortcuts", slug: "keyboard-shortcuts/board" },
    ],
  },
  {
    icon: <Layout className="w-4 h-4 text-gray-600 icon-sidebar" />,
    title: "Whimsical boards",
    description: "Build diagrams, design wireframes & manage cards.",
    hasChevron: true,
    subitems: [
      { title: "Creating boards", slug: "whimsical-boards/creating" },
      { title: "Board templates", slug: "whimsical-boards/templates" },
    ],
  },
  {
    icon: <FolderOpen className="w-4 h-4 text-gray-600 icon-sidebar" />,
    title: "Whimsical projects",
    description: "Manage your projects calmly from idea to completion.",
    hasChevron: true,
    subitems: [
      { title: "Creating projects", slug: "whimsical-projects/creating" },
      { title: "Project management", slug: "whimsical-projects/management" },
    ],
  },
  {
    icon: <FileText className="w-4 h-4 text-gray-600 icon-sidebar" />,
    title: "Whimsical docs",
    description: "Create rich and connected long form content.",
    hasChevron: true,
    subitems: [
      { title: "Creating docs", slug: "whimsical-docs/creating" },
      { title: "Formatting text", slug: "whimsical-docs/formatting" },
    ],
  },
  {
    icon: <HelpCircle className="w-4 h-4 text-gray-600 icon-sidebar" />,
    title: "FAQs",
    description: "Get answers to frequently asked questions.",
    hasChevron: true,
    subitems: [
      { title: "General questions", slug: "faqs/general" },
      { title: "Billing questions", slug: "faqs/billing" },
    ],
  },
  {
    icon: <Palette className="w-4 h-4 text-gray-600 icon-sidebar" />,
    title: "Themes & templates",
    description: "Produce consistent, quick and beautiful content easily.",
    hasChevron: true,
    subitems: [
      { title: "Using themes", slug: "themes-templates/themes" },
      { title: "Creating templates", slug: "themes-templates/templates" },
    ],
  },
  {
    icon: <CreditCard className="w-4 h-4 text-gray-600 icon-sidebar" />,
    title: "Subscription & billing",
    description: "Understand your invoices and updating your billing information.",
    hasChevron: true,
    subitems: [
      { title: "Plans & pricing", slug: "subscription-billing/plans" },
      { title: "Payment methods", slug: "subscription-billing/payment" },
    ],
  },
  {
    icon: <User className="w-4 h-4 text-gray-600 icon-sidebar" />,
    title: "Account settings",
    description: "",
    hasChevron: true,
    subitems: [
      { title: "Profile settings", slug: "account-settings/profile" },
      { title: "Notification preferences", slug: "account-settings/notifications" },
    ],
  },
  {
    icon: <Users className="w-4 h-4 text-gray-600 icon-sidebar" />,
    title: "Managing workspaces",
    description: "",
    hasChevron: true,
    subitems: [
      { title: "Workspace settings", slug: "managing-workspaces/settings" },
      { title: "Member management", slug: "managing-workspaces/members" },
    ],
  },
  {
    icon: <Download className="w-4 h-4 text-gray-600 icon-sidebar" />,
    title: "Imports & exports",
    description: "",
    hasChevron: true,
    subitems: [
      { title: "Importing files", slug: "imports-exports/importing" },
      { title: "Exporting content", slug: "imports-exports/exporting" },
    ],
  },
  {
    icon: <Zap className="w-4 h-4 text-gray-600 icon-sidebar" />,
    title: "Integrations",
    description: "",
    hasChevron: true,
    subitems: [
      { title: "Available integrations", slug: "integrations/available" },
      { title: "Setting up integrations", slug: "integrations/setup" },
    ],
  },
  {
    icon: <div className="w-4 h-4 rounded bg-gray-300"></div>,
    title: "Contact us",
    description: "",
    hasChevron: false,
    hasExternalLink: true,
  },
]

const categories = [
  {
    icon: (
      <div
        className="w-4 h-4 rounded-full bg-slate-600 flex items-center justify-center group-hover:bg-slate-700 transition-colors"
        style={{ color: "#fff" }}
      >
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
    ),
    title: "Getting started",
    description: "Get to know Whimsical at a high level so you can start creating.",
    articles: "(19 ARTICLES)",
    link: "/article/getting-started/sequence-diagrams",
  },
  {
    icon: (
      <Keyboard
        className="w-4 h-4 text-slate-600 group-hover:text-slate-700 transition-colors"
        style={{ color: "#fff" }}
      />
    ),
    title: "Keyboard shortcuts",
    description: "Keep your hands off the mouse, and use Whimsical at speed.",
    articles: "(2 ARTICLES)",
    link: "/article/keyboard-shortcuts/general",
  },
  {
    icon: (
      <Layout
        className="w-4 h-4 text-slate-600 group-hover:text-slate-700 transition-colors"
        style={{ color: "#fff" }}
      />
    ),
    title: "Whimsical boards",
    description: "Build diagrams, design wireframes & manage cards.",
    articles: "(27 ARTICLES)",
    link: "/article/whimsical-boards/creating",
  },
  {
    icon: (
      <FolderOpen
        className="w-4 h-4 text-slate-600 group-hover:text-slate-700 transition-colors"
        style={{ color: "#fff" }}
      />
    ),
    title: "Whimsical projects",
    description: "Manage your projects calmly from idea to completion.",
    articles: "(5 ARTICLES)",
    link: "/article/whimsical-projects/creating",
  },
  {
    icon: (
      <FileText
        className="w-4 h-4 text-slate-600 group-hover:text-slate-700 transition-colors"
        style={{ color: "#fff" }}
      />
    ),
    title: "Whimsical docs",
    description: "Create rich and connected long form content.",
    articles: "(16 ARTICLES)",
    link: "/article/whimsical-docs/creating",
  },
  {
    icon: (
      <HelpCircle
        className="w-4 h-4 text-slate-500 group-hover:text-slate-600 transition-colors"
        style={{ color: "#fff" }}
      />
    ),
    title: "FAQs",
    description: "Get answers to frequently asked questions.",
    articles: "(33 ARTICLES)",
    link: "/article/faqs/general",
  },
  {
    icon: (
      <Palette
        className="w-4 h-4 text-slate-600 group-hover:text-slate-700 transition-colors"
        style={{ color: "#fff" }}
      />
    ),
    title: "Themes & templates",
    description: "Produce consistent, quick and beautiful content easily.",
    articles: "(5 ARTICLES)",
    link: "/article/themes-templates/themes",
  },
  {
    icon: (
      <CreditCard
        className="w-4 h-4 text-slate-600 group-hover:text-slate-700 transition-colors"
        style={{ color: "#fff" }}
      />
    ),
    title: "Subscription & billing",
    description: "Understand your invoices and updating your billing information.",
    articles: "(9 ARTICLES)",
    link: "/article/subscription-billing/plans",
  },
]

export default function WhimsicalHelpCenter() {
  const [searchValue, setSearchValue] = useState("")
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

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeSearchModal()
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedSearchItem((prev) => (prev < sidebarItems.length - 1 ? prev + 1 : prev))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedSearchItem((prev) => (prev > 0 ? prev - 1 : prev))
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex relative">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 xl:hidden" onClick={closeSidebar} />}

        {/* Sidebar */}
        <aside
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

          {/* Mobile close button */}
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

        {/* Main Content */}
        <main className="flex-1 min-h-screen primary-bg-color">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-4 xl:px-6 py-2.5 primary-bg-color">
            <div className="flex items-center justify-between w-full">
              {/* <div className="flex items-center space-x-4 xl:h xl:hidden">
                <button onClick={() => setSidebarOpen(true)} className="xl:hidden p-1 rounded-md hover:bg-gray-100">
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>
              </div> */}

              <div className="flex-1 max-w-xs lg:max-w-sm" style={{ maxWidth: "17rem" }}>
                <div className="relative ">
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={openSearchModal}
                    className="pl-8 pr-12 py-1.5 w-full text-sm border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 primary-bg-color"
                  />
                  <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded hidden lg:block">
                    CTRL K
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="hidden lg:flex items-center space-x-2.5">
                  <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
                    <User className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="text-gray-500 text-sm">All systems go</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-700 border-gray-300 hover:bg-gray-50 text-sm px-2 lg:px-3 py-1.5 primary-bg-color"
                >
                  <span className="hidden sm:inline">Open app</span>
                  <ExternalLink className="w-3.5 h-3.5 sm:ml-1.5" />
                </Button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="px-4 lg:px-6 py-8" style={{ paddingTop: "80px" }}>
            <div className="max-w-6xl ttt">
              {/* Hero Section */}
              <div className="text-center mb-12 lg:mb-16">
                <h1 className="text-3xl font-bold leading-tight title-size">
                  How{" "}
                  <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 bg-clip-text text-transparent title-size">
                    can we help?
                  </span>
                </h1>
                <p
                  className="text-gray-600 text-base lg:text-lg mb-8 lg:mb-6 leading-relaxed px-4 subtitle-size"
                  style={{ color: "#6a5575" }}
                >
                  Get answers, gain understanding, and
                  <br className="hidden sm:block" />
                  learn how to work faster in Whimsical.
                </p>

                {/* Main Search */}
                <div className="relative w-[600px] mx-auto px-4 main-search-nest-hub">
                  <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search help articles (e.g. flowcharts, integrations or settings)"
                    value={mainSearchValue}
                    onChange={(e) => setMainSearchValue(e.target.value)}
                    onFocus={openSearchModal}
                    className="pl-12 pr-16 py-3 w-full text-sm border-2 border-purple-200 rounded-lg focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                    style={{ height: '48px' }} /* Altura fixa de 48px */
                  />
                  <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 bg-gray-100 px-2 py-1 rounded hidden lg:block">
                    CTRL K
                  </div>
                </div>
              </div>

              {/* Categories Grid */}
              <div>
                <h2
                  className="text-lg lg:text-xl text-gray-900 mb-6 lg:mb-5 px-4"
                  style={{ color: "#6a5575", fontSize: "18.5px", fontWeight: 500 }}
                >
                  All categories
                </h2>
                <div className={`
                    grid 
                    grid-cols-1 
                    sm:grid-cols-2 
                    lg:grid-cols-2 
                    xl:grid-cols-3      /* Entre 1280px e 1515px mostra 3 cards */
                    2xl:grid-cols-4     /* Acima de 1515px mostra 4 cards */
                    gap-4 lg:gap-6 px-4
                  `}>
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      href={category.link}
                      className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6 hover:shadow-lg hover:border-purple-200 transition-all duration-200 cursor-pointer group aspect-square flex flex-col relative overflow-hidden"
                      style={{ maxHeight: "225px", width: "256px" }}
                    >
                      <div className="flex flex-col h-full relative z-10">
                        <div className="flex-shrink-0 mb-3 lg:mb-4">
                          {/* Container do ícone com gradiente no hover */}
                          <div className="w-8 lg:w-10 h-8 lg:h-10 rounded-full bg-slate-100 flex items-center justify-center 
                       group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:via-purple-500 group-hover:to-pink-500
                       transition-all duration-300 icon-color">
                            {/* Ícone com cor invertida no hover */}
                            <span className="text-gray-600 group-hover:text-white transition-colors duration-300">
                              {category.icon}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col">
                          <h3 className="font-semibold text-gray-900 mb-2 lg:mb-3 text-sm lg:text-base leading-tight">
                            {category.title}
                          </h3>
                          {category.description && (
                            <p className="text-gray-600 text-xs lg:text-sm mb-2 lg:mb-3 leading-relaxed flex-1"
                              style={{ fontSize: "13px", color: "#92819b", fontWeight: 500 }}>
                              {category.description}
                            </p>
                          )}
                          {category.articles && (
                            <p className="text-xs text-gray-400 font-medium tracking-wide mt-auto"
                              style={{ fontSize: "9px" }}>
                              {category.articles}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-50 flex items-start justify-center pt-16 lg:pt-24 px-4">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-2xl w-full max-w-xl lg:max-w-2xl max-h-96 overflow-hidden"
          >
            <div className="p-3 lg:p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search help articles (e.g. flowcharts or settings)"
                  value={mainSearchValue}
                  onChange={(e) => setMainSearchValue(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  className="pl-10 py-2.5 lg:py-3 w-full border-0 focus:ring-0 text-sm lg:text-base bg-transparent"
                  autoFocus
                />
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {sidebarItems.slice(0, -1).map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 p-3 lg:p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-b-0 ${selectedSearchItem === index ? "bg-gray-50" : ""
                    }`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-5 lg:w-6 h-5 lg:h-6 rounded bg-slate-100 flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm mb-1">{item.title}</h3>
                    {item.description && <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-3 lg:px-4 py-2.5 lg:py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-3 lg:space-x-4">
                <span className="flex items-center space-x-1.5">
                  <kbd className="px-1.5 lg:px-2 py-0.5 lg:py-1 bg-white border border-gray-200 rounded text-xs font-medium">
                    ↵
                  </kbd>
                  <span>Select</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <kbd className="px-1.5 lg:px-2 py-0.5 lg:py-1 bg-white border border-gray-200 rounded text-xs font-medium">
                    ↑↓
                  </kbd>
                  <span>Navigate</span>
                </span>
              </div>
              <div className="flex items-center space-x-3 lg:space-x-4">
                <button onClick={closeSearchModal} className="hover:text-gray-700 transition-colors">
                  Close
                </button>
                <span className="flex items-center space-x-1.5">
                  <kbd className="px-1.5 lg:px-2 py-0.5 lg:py-1 bg-white border border-gray-200 rounded text-xs font-medium">
                    ESC
                  </kbd>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
