import { Outlet, NavLink } from 'react-router-dom'
import { FileSpreadsheet } from 'lucide-react'

export default function App() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <header className="border-b bg-white">
                <div className="mx-auto max-w-5xl px-6 py-4 flex items-center gap-3">
                    <FileSpreadsheet className="h-7 w-7 text-emerald-600" />
                    <h1 className="text-xl font-semibold">Bank Statement PDF → Excel</h1>
                    <nav className="ml-auto text-sm">
                        <NavLink to="/" className="text-gray-600 hover:text-gray-900">Home</NavLink>
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-6 py-10">
                <Outlet />
            </main>

            <footer className="mt-20 border-t bg-white">
                <div className="mx-auto max-w-5xl px-6 py-6 text-sm text-gray-500">
                    Built with React, Tailwind & ConvertAPI (server-side).
                </div>
            </footer>
        </div>
    )
}
