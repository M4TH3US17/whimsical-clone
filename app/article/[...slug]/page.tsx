"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Search, ChevronRight, ExternalLink, Keyboard, Layout, User, Menu, X, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import "../../css/page.css"

const sidebarItems = [
  {
    icon: (
      <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
    ),
    title: "Getting started",
    hasChevron: true,
    subitems: [
      { title: "Getting started with sequence diagrams", slug: "getting-started/sequence-diagrams" },
      { title: "What is Whimsical?", slug: "getting-started/what-is-whimsical" },
      { title: "Getting started with docs", slug: "getting-started/docs" },
      { title: "What can you do with Whimsical?", slug: "getting-started/what-can-you-do" },
      { title: "Getting to know Whimsical - video overview", slug: "getting-started/video-overview" },
      { title: "Working with Whimsical's infinite canvas", slug: "getting-started/infinite-canvas" },
      { title: "5 ways to create a new file", slug: "getting-started/create-new-file" },
      { title: "Getting started with flowcharts", slug: "getting-started/flowcharts" },
      { title: "Getting started with mind maps", slug: "getting-started/mind-maps" },
      { title: "Getting started with wireframes", slug: "getting-started/wireframes" },
    ],
  },
  {
    icon: <Keyboard className="w-4 h-4 text-gray-600" />,
    title: "Keyboard shortcuts",
    hasChevron: true,
    subitems: [
      { title: "General shortcuts", slug: "keyboard-shortcuts/general" },
      { title: "Board shortcuts", slug: "keyboard-shortcuts/board" },
    ],
  },
  {
    icon: <Layout className="w-4 h-4 text-gray-600" />,
    title: "Whimsical boards",
    hasChevron: true,
    subitems: [
      { title: "Creating boards", slug: "whimsical-boards/creating" },
      { title: "Board templates", slug: "whimsical-boards/templates" },
    ],
  },
]

const articles = {
  "getting-started/sequence-diagrams": {
    title: "Getting started with sequence diagrams",
    breadcrumb: ["Help Center", "Getting started", "Getting started with sequence diagrams"],
    summary: [
      { title: "Getting started with sequence diagrams", id: "getting-started" },
      { title: "How to create a sequence diagram", id: "how-to-create" },
    ],
    content: `
      <div class="mb-8">
        <p class="text-lg text-gray-700 leading-relaxed mb-6">
          A <a href="#" class="text-purple-600 hover:text-purple-700 underline">sequence diagram</a> is a type of UML (Unified Modeling Language) diagram that shows the interactions between various components or objects in a system. It provides a visual representation of the order of messages or events over time.
        </p>
      </div>

      <div class="mb-12">
        <div class="bg-purple-600 rounded-lg overflow-hidden shadow-lg">
          <div class="aspect-video bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center relative">
            <div class="absolute inset-0 bg-black bg-opacity-20"></div>
            <div class="relative z-10 text-center text-white">
              <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <div class="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-white ml-1"></div>
              </div>
              <p class="text-sm opacity-90 mb-2">WHAT'S NEW</p>
              <h3 class="text-2xl font-bold">Creating sequence diagrams in Whimsical</h3>
            </div>
          </div>
        </div>
      </div>

      <div id="how-to-create" class="scroll-mt-24">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-between">
          How to create a sequence diagram
          <button class="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <Copy className="w-4 h-4" />
            <span>Copy Link</span>
          </button>
        </h2>
        <div class="prose prose-lg max-w-none">
          <p class="text-gray-700 leading-relaxed mb-4">
            Creating sequence diagrams in Whimsical is straightforward and intuitive. Follow these steps to get started:
          </p>
          <ol class="list-decimal list-inside space-y-3 text-gray-700">
            <li>Open Whimsical and create a new board</li>
            <li>Select the sequence diagram template from the template library</li>
            <li>Add actors and objects to your diagram</li>
            <li>Connect them with messages and interactions</li>
            <li>Customize the styling and layout as needed</li>
          </ol>
        </div>
      </div>
    `,
  },
}

export default function ArticlePage() {
  const params = useParams()
  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug
  const [searchValue, setSearchValue] = useState("")
  const [expandedItems, setExpandedItems] = useState<number[]>([0]) // Getting started expanded by default
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("getting-started")

  const article = articles[slug as keyof typeof articles]

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const closeSidebar = () => setSidebarOpen(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setActiveSection(id)
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!article) return

      const sections = article.summary.map((item) => item.id)
      const currentSection = sections.find((id) => {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [article])

  if (!article) {
    return <div>Article not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="flex w-full">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={closeSidebar} />}

        {/* Left Sidebar */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:transform-none
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
          style={{ minWidth: "300px" }}
        >
          <div className="lg:hidden flex justify-end p-4">
            <button onClick={closeSidebar} className="p-1 rounded-md hover:bg-gray-100">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <nav className="space-y-1 overflow-y-auto h-full">
            <div className="p-4 border-gray-200" style={{ display: "flex", justifyContent: "space-around" }}>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-sm"></div>
                </div>
                <span className="font-semibold text-gray-900">Whimsical</span>
              </div>
              <span className="text-gray-600 text-sm mt-1 block help-center">Help Center</span>
            </div>

            <div className="px-4">
              {sidebarItems.map((item, index) => (
                <div key={index} style={{ marginBottom: "11px" }}>
                  <div
                    className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 cursor-pointer group"
                    onClick={() => toggleExpanded(index)}
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span className="primary-font-color xl-font">{item.title}</span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expandedItems.includes(index) ? "rotate-90" : ""
                        }`}
                    />
                  </div>
                  {expandedItems.includes(index) && item.subitems && (
                    <div className="ml-7 mt-1 space-y-1">
                      {item.subitems.map((subitem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={`/article/${subitem.slug}`}
                          className={`block px-3 py-1 text-sm rounded-md hover:bg-gray-50 cursor-pointer primary-font-color xl-font ${slug === subitem.slug ? "bg-purple-50 text-purple-700 font-medium" : "text-gray-600"
                            }`}
                          onClick={closeSidebar}
                        >
                          {subitem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex min-h-screen">
          {/* Article Content */}
          <main className="">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-4 py-3 relative z-50">
              <div className="flex items-center justify-between w-full">
                <div className="flex-1 max-w-md">
                  <div className="relative" style={{ maxWidth: "17rem" }}>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="pl-10 pr-16 py-2 w-full border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded hidden sm:block">
                      CTRL K
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 md:space-x-4">
                  <div className="hidden md:flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-500 text-sm">All systems go</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-700 border-gray-300 hover:bg-gray-50 text-xs md:text-sm"
                  >
                    <span className="hidden sm:inline">Open app</span>
                    <ExternalLink className="w-3 h-3 sm:ml-1" />
                  </Button>
                </div>
              </div>
            </header>

            <div className="flex-1 flex">
              <div className="md:py-6 md:px-40">
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
                  {article.breadcrumb.map((crumb, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      {index > 0 && <span>/</span>}
                      <span className={index === article.breadcrumb.length - 1 ? "text-gray-900 font-medium" : ""}>
                        {crumb}
                      </span>
                    </div>
                  ))}
                </nav>

                {/* Article Title */}
                <div id="getting-started" className="scroll-mt-24 mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold mb-8">
                    <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      {article.title}
                    </span>
                  </h1>
                </div>

                {/* Article Content */}
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>

              {/* Right Sidebar - Summary */}
              <aside className="hidden lg:block bg-gray-100 border-l border-gray-200 min-h-screen" style={{ minWidth: "200px" }}>
                <div className="sticky top-0 p-6">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-6">SUMMARY</h3>
                  <nav className="space-y-1">
                    {article.summary.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => scrollToSection(item.id)}
                        className={`block w-full text-left text-sm py-2 px-0 transition-colors ${activeSection === item.id ? "text-purple-600 font-medium" : "text-gray-600 hover:text-gray-900"
                          }`}
                      >
                        {item.title}
                      </button>
                    ))}
                  </nav>

                  {/* Copy Link Button */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={copyLink}
                      className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy Link</span>
                    </button>
                  </div>
                </div>
              </aside>
            </div>

          </main>
        </div>
      </div>
    </div>
  )
}
