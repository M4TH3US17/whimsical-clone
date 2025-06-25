import { ChevronRight, CreditCard, Download, ExternalLink, FileText, FolderOpen, HelpCircle, Keyboard, Layout, Palette, User, Users, Zap } from "lucide-react"

export const sidebarItems = [
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