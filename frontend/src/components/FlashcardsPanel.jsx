import React, { useState } from 'react'
import api from '../utils/api'
import ThemeToggle from './ThemeToggle'


export default function FlashcardsPanel() {
  const [text, setText] = useState('')
  const [count, setCount] = useState(6)
  const [loading, setLoading] = useState(false)
  const [flashcards, setFlashcards] = useState(null)
  const [error, setError] = useState(null)
  const [revealed, setRevealed] = useState({})

  async function handleGenerate() {
    setError(null)
    if (!text || text.trim().length < 5) {
      setError('Please paste a longer piece of text (at least ~5 characters).')
      return
    }
    setLoading(true)
    try {
      const r = await api.post('/ai/flashcards', { text, count })
      // prefer structured result: r.data.data (array)
      if (r.data?.data && Array.isArray(r.data.data)) {
        setFlashcards(r.data.data)
      } else if (r.data?.raw) {
        setError('Model returned unexpected format. Raw response shown below.')
        setFlashcards([{ question: 'Raw response', answer: r.data.raw }])
      } else {
        setError('Unexpected response from server.')
      }
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.error || 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-8 flex flex-col justify-center mr-5 m-5 dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-3 ml-5 dark:text-gray-100">Flashcard Generator</h3>
     <div className='mr-6'>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your chapter, notes, or a paragraph here..."
        className="w-full p-3 border rounded h-28 mb-3 ml-5 mr-5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
      />
      </div>

      <div className="flex items-center gap-3 mb-4 ml-5 mr-5">
        <label>
          cards:
          <input type="number" min="1" max="30" value={count} onChange={e=>setCount(Number(e.target.value))} className="ml-2 p-1 border rounded w-20 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
        </label>
        <button onClick={handleGenerate} className="btn-primary ml-2 dark:bg-gray-600" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Flashcards'}
        </button>
      </div>

      {error && <div className="text-red-600 mb-3 ml-5 dark:text-red-400">{error}</div>}

      {flashcards && (
        <div className="grid md:grid-cols-2 gap-4">
          {flashcards.map((f, i) => (
            <div key={i} className="p-4 bg-white rounded shadow dark:bg-gray-800">
              <div className="font-semibold">Q{i+1}: {f.question}</div>
              {revealed[i] ? (
                <div className="mt-2 text-sm ">A: {f.answer}</div>
              ) : (
                <button className="mt-2 text-sm underline ml-2 dark:text-gray-100" onClick={()=>setRevealed(s=>({...s, [i]: true}))}>Show Answer</button>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
