import React, { useState } from 'react'
import api from '../utils/api'

export default function SummarizerPanel() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [bullets, setBullets] = useState(null)
  const [error, setError] = useState(null)

  async function handleSummarize() {
    setError(null)
    if (!text || text.trim().length < 20) {
      setError('Please paste a longer piece of text to summarize (>=20 characters).')
      return
    }
    setLoading(true)
    try {
      const r = await api.post('/ai/summarize', { text })
      if (r.data?.bullets && Array.isArray(r.data.bullets)) {
        setBullets(r.data.bullets)
      } else if (r.data?.raw) {
        setError('Model returned unexpected format. Raw response shown below.')
        setBullets([r.data.raw])
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
      <h3 className="text-xl font-bold mb-3 ml-5 dark:text-gray-100">Summarizer</h3>
      <div className='mr-6'>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste text to summarize..."
        className="w-full p-3 border rounded h-28 mb-3 ml-5 mr-5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
      />
      </div>

      <div className="flex items-center gap-3 mb-4 ml-5">
        <button onClick={handleSummarize} className="btn-primary dark:bg-gray-600" disabled={loading}>
          {loading ? 'Summarizing...' : 'Summarize'}
        </button>
      </div>

      {error && <div className="text-red-600 mb-3 ml-5 dark:text-red-400">{error}</div>}

      {bullets && (
        <ul className="list-disc pl-6 space-y-2 ml-5">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}
    </section>
  )
}
