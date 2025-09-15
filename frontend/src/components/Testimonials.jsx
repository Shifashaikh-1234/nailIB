import ThemeToggle from "./ThemeToggle"

export default function Testimonials() {
return (
<section className="py-12 bg-gray-100 dark:bg-gray-900">
<div className="max-w-6xl mx-auto px-4 ">
<h2 className="text-xl font-bold dark:text-gray-100">What students say</h2>
<div className="mt-6 grid md:grid-cols-3 gap-4">
<div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">"Saved me hours of revision"</div>
<div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">"Flashcards are accurate"</div>
<div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">"Easy to use"</div>
</div>
</div>
</section>
)
}