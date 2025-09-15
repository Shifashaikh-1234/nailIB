import React from 'react'
import ThemeToggle from './ThemeToggle'


export default function Footer() {
return (
<footer className="bg-white border-t mt-12 m-5">
<div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} NailIB</div>
</footer>
)
}