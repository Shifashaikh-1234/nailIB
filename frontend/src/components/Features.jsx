import React, { useState } from "react"
import api from "../utils/api"
import ThemeToggle from './ThemeToggle'

export default function Features() {
  const [flashcards, setFlashcards] = useState(null)
  const [summary, setSummary] = useState(null)

  async function handleFlashcards() {
    try {
      const r = await api.post("/ai/flashcards", {
        text: "Photosynthesis is the process by which plants make food",
        count: 2,
      })
      setFlashcards(r.data)
    } catch (err) {
      console.error(err)
    }
  }

  async function handleSummarize() {
    try {
      const r = await api.post("/ai/summarize", {
        text: "The Industrial Revolution was a period of major industrialization...",
      })
      setSummary(r.data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6">
        {/* Flashcards */}
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-700">
          <h3 className="font-semibold">Flashcards</h3>
          <p className="mt-2 text-sm dark:text-gray-100">Generate study flashcards instantly.</p>
          <button className="btn-primary mt-4 dark:bg-gray-600" onClick={handleFlashcards}>
            Generate Flashcards
          </button>
          {flashcards && (
            <pre className="mt-4 text-xs">{JSON.stringify(flashcards, null, 2)}</pre>
          )}
        </div>

        {/* Summarizer */}
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-700">
          <h3 className="font-semibold">Summarizer</h3>
          <p className="mt-2 text-sm dark:text-gray-100">Summarize long text into bullet points.</p>
          <button className="btn-primary mt-4 dark:bg-gray-600" onClick={handleSummarize}>
            Summarize Text
          </button>
          {summary && (
            <pre className="mt-4 text-xs">{JSON.stringify(summary, null, 2)}</pre>
          )}
        </div>
      </div>
    </section>
  )
}
