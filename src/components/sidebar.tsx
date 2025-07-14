

const Sidebar = () => {

    return (
        <aside className="w-64 bg-white border-r h-full p-4 shadow-sm">
            <nav className="space-y-4">
                <a href="/" className="block text-blue-600 font-medium hover:underline">Form Builder</a>
                <a href="/leads" className="block text-blue-600 font-medium hover:underline">Leads</a>
            </nav>
        </aside>
    )
}

export default Sidebar;