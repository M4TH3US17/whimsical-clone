"use client"

import { useState } from "react"
import {
  Search,
  ChevronRight,
  ExternalLink,
  Settings,
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
      "What is Whimsical?",
      "Getting started with Whimsical",
      "Creating your first workspace",
      "Inviting team members",
      "Understanding permissions",
    ],
  },
  {
    icon: <Keyboard className="w-4 h-4 text-gray-600" />,
    title: "Keyboard shortcuts",
    hasChevron: true,
    subitems: ["General shortcuts", "Board shortcuts"],
  },
  {
    icon: <Layout className="w-4 h-4 text-gray-600" />,
    title: "Whimsical boards",
    hasChevron: true,
    subitems: [
      "Creating boards",
      "Board templates",
      "Sharing boards",
      "Board settings",
      "Flowcharts",
      "Wireframes",
      "Mind maps",
    ],
  },
  {
    icon: <FolderOpen className="w-4 h-4 text-gray-600" />,
    title: "Whimsical projects",
    hasChevron: true,
    subitems: ["Creating projects", "Project management", "Project templates"],
  },
  {
    icon: <FileText className="w-4 h-4 text-gray-600" />,
    title: "Whimsical docs",
    hasChevron: true,
    subitems: ["Creating docs", "Formatting text", "Adding media", "Collaboration", "Publishing docs"],
  },
  {
    icon: <HelpCircle className="w-4 h-4 text-gray-600" />,
    title: "FAQs",
    hasChevron: true,
    subitems: ["General questions", "Billing questions", "Technical issues", "Feature requests"],
  },
  {
    icon: <Palette className="w-4 h-4 text-gray-600" />,
    title: "Themes & templates",
    hasChevron: true,
    subitems: ["Using themes", "Creating templates", "Template library"],
  },
  {
    icon: <CreditCard className="w-4 h-4 text-gray-600" />,
    title: "Subscription & billing",
    hasChevron: true,
    subitems: ["Plans & pricing", "Payment methods", "Invoices", "Cancellation"],
  },
  {
    icon: <User className="w-4 h-4 text-gray-600" />,
    title: "Account settings",
    hasChevron: true,
    subitems: ["Profile settings", "Notification preferences", "Privacy settings"],
  },
  {
    icon: <Users className="w-4 h-4 text-gray-600" />,
    title: "Managing workspaces",
    hasChevron: true,
    subitems: ["Workspace settings", "Member management", "Workspace permissions"],
  },
  {
    icon: <Download className="w-4 h-4 text-gray-600" />,
    title: "Imports & exports",
    hasChevron: true,
    subitems: ["Importing files", "Exporting content", "Supported formats"],
  },
  {
    icon: <Zap className="w-4 h-4 text-gray-600" />,
    title: "Integrations",
    hasChevron: true,
    subitems: ["Available integrations", "Setting up integrations", "API documentation"],
  },
  {
    icon: <div className="w-4 h-4 rounded bg-gray-300"></div>,
    title: "Contact us",
    hasChevron: false,
    hasExternalLink: true,
  },
]

const categories = [
  {
    icon: (
      <div className="w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center group-hover:bg-purple-700 transition-colors">
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
    ),
    title: "Getting started",
    description: "Get to know Whimsical at a high level so you can start creating.",
    articles: "(15 ARTICLES)",
  },
  {
    icon: <Keyboard className="w-4 h-4 text-purple-600 group-hover:text-purple-700 transition-colors" />,
    title: "Keyboard shortcuts",
    description: "Keep your hands off the mouse, and use Whimsical at speed.",
    articles: "(2 ARTICLES)",
  },
  {
    icon: <Layout className="w-4 h-4 text-purple-600 group-hover:text-purple-700 transition-colors" />,
    title: "Whimsical boards",
    description: "Build diagrams, design wireframes & manage cards.",
    articles: "(27 ARTICLES)",
  },
  {
    icon: <FolderOpen className="w-4 h-4 text-purple-600 group-hover:text-purple-700 transition-colors" />,
    title: "Whimsical projects",
    description: "Manage your projects calmly from idea to completion.",
    articles: "(5 ARTICLES)",
  },
  {
    icon: <FileText className="w-4 h-4 text-purple-600 group-hover:text-purple-700 transition-colors" />,
    title: "Whimsical docs",
    description: "Create rich and connected long form content.",
    articles: "(16 ARTICLES)",
  },
  {
    icon: <HelpCircle className="w-4 h-4 text-purple-500 group-hover:text-purple-600 transition-colors" />,
    title: "FAQs",
    description: "Get answers to frequently asked questions.",
    articles: "(23 ARTICLES)",
  },
  {
    icon: <Palette className="w-4 h-4 text-purple-600 group-hover:text-purple-700 transition-colors" />,
    title: "Themes & templates",
    description: "Produce consistent, quick and beautiful content easily.",
    articles: "(5 ARTICLES)",
  },
  {
    icon: <CreditCard className="w-4 h-4 text-purple-600 group-hover:text-purple-700 transition-colors" />,
    title: "Subscription & billing",
    description: "Understand your invoices and updating your billing information.",
    articles: "(9 ARTICLES)",
  },
  {
    icon: <Settings className="w-4 h-4 text-purple-600 group-hover:text-purple-700 transition-colors" />,
    title: "Account settings",
    description: "",
    articles: "",
  },
  {
    icon: <Users className="w-4 h-4 text-purple-600 group-hover:text-purple-700 transition-colors" />,
    title: "Managing workspaces",
    description: "",
    articles: "",
  },
  {
    icon: <Download className="w-4 h-4 text-purple-600 group-hover:text-purple-700 transition-colors" />,
    title: "Imports & exports",
    description: "",
    articles: "",
  },
  {
    icon: <Zap className="w-4 h-4 text-purple-600 group-hover:text-purple-700 transition-colors" />,
    title: "Integrations",
    description: "",
    articles: "",
  },
]

export default function WhimsicalHelpCenter() {
  const [searchValue, setSearchValue] = useState("")
  const [mainSearchValue, setMainSearchValue] = useState("")
  const [expandedItems, setExpandedItems] = useState<number[]>([])

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </div>
              <span className="font-semibold text-gray-900">Whimsical</span>
            </div>
            <span className="text-gray-600">Help Center</span>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10 pr-16 py-2 w-full border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                CTRL K
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-500 text-sm">Loading...</span>
            <Button variant="outline" size="sm" className="text-gray-700 border-gray-300 hover:bg-gray-50">
              Open app
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex mx-auto">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-1">
            {sidebarItems.map((item, index) => (
              <div key={index}>
                <div
                  className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 cursor-pointer group"
                  onClick={() => item.hasChevron && toggleExpanded(index)}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  {item.hasChevron && (
                    <ChevronRight
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        expandedItems.includes(index) ? "rotate-90" : ""
                      }`}
                    />
                  )}
                  {item.hasExternalLink && <ExternalLink className="w-4 h-4 text-gray-400" />}
                </div>
                {item.hasChevron && expandedItems.includes(index) && item.subitems && (
                  <div className="ml-7 mt-1 space-y-1">
                    {item.subitems.map((subitem, subIndex) => (
                      <div
                        key={subIndex}
                        className="px-3 py-1 text-sm text-gray-600 rounded-md hover:bg-gray-50 cursor-pointer"
                      >
                        {subitem}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4">
                How{" "}
                <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  can we help?
                </span>
              </h1>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Get answers, gain understanding, and
                <br />
                learn how to work faster in Whimsical.
              </p>

              {/* Main Search */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search help articles (e.g. flowcharts, integrations or settings)"
                  value={mainSearchValue}
                  onChange={(e) => setMainSearchValue(e.target.value)}
                  className="pl-12 pr-16 py-4 w-full text-base border-2 border-purple-200 rounded-lg focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 bg-gray-100 px-2 py-1 rounded">
                  CTRL K
                </div>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">All categories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-purple-200 transition-all duration-200 cursor-pointer group aspect-square flex flex-col"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex-shrink-0 mb-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          {category.icon}
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h3 className="font-semibold text-gray-900 mb-2 text-sm">{category.title}</h3>
                        {category.description && (
                          <p className="text-gray-600 text-xs mb-2 leading-relaxed flex-1">{category.description}</p>
                        )}
                        {category.articles && (
                          <p className="text-xs text-gray-400 font-medium tracking-wide mt-auto">{category.articles}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
