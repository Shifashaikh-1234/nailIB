// backend/src/controllers/aiController.js
const openaiClient = require('../utils/openaiClient')

function extractJsonFromString(s) {
  // try direct parse
  try { return JSON.parse(s) } catch (e) {}

  // try to find a JSON array or object inside the string
  const arrMatch = s.match(/\[([\s\S]*)\]/)
  if (arrMatch) {
    try { return JSON.parse(arrMatch[0]) } catch (e) {}
  }
  const objMatch = s.match(/\{([\s\S]*)\}/)
  if (objMatch) {
    try { return JSON.parse(objMatch[0]) } catch (e) {}
  }
  return null
}

async function generateFlashcards(req, res) {
  try {
    const { text, count = 10 } = req.body
    if (!text || text.trim().length < 30) {
      return res.status(400).json({ error: 'Please provide a longer text (>=30 chars) to generate flashcards.' })
    }

    // strict JSON-only prompt
    const prompt = `You are an educational assistant.
Create exactly ${count} flashcards from the following content.
Return ONLY valid JSON — nothing else — in this exact format:

[
  {"question": "First question text", "answer": "First answer text"},
  ...
]

Content:
${text}
`

    const responseText = await openaiClient.chatCompletion(prompt)

    // try to extract JSON
    const parsed = extractJsonFromString(responseText)
    if (parsed && Array.isArray(parsed)) {
      // ensure items have question/answer
      const normalized = parsed.map(item => ({
        question: String(item.question ?? item.q ?? item.Q ?? item.Question ?? '').trim(),
        answer: String(item.answer ?? item.a ?? item.A ?? item.Answer ?? '').trim()
      }))
      return res.json({ data: normalized })
    }

    // fallback: return raw text so client can show helpful message
    return res.json({ raw: responseText, warning: 'Could not parse strict JSON from model response.' })
  } catch (err) {
    console.error('generateFlashcards error:', err)
    res.status(500).json({ error: 'AI request failed' })
  }
}

async function summarizeText(req, res) {
  try {
    const { text } = req.body
    if (!text || text.trim().length < 20) {
      return res.status(400).json({ error: 'Please provide the text to summarize (>=20 chars).' })
    }

    // ask model to return JSON with bullets
    const prompt = `You are an assistant that summarizes content.
Summarize the following text into up to 6 concise bullet points.
Return ONLY valid JSON in this format:

{ "bullets": ["first bullet", "second bullet", ...] }

Text:
${text}`

    const responseText = await openaiClient.chatCompletion(prompt)
    const parsed = extractJsonFromString(responseText)
    if (parsed && parsed.bullets && Array.isArray(parsed.bullets)) {
      return res.json({ bullets: parsed.bullets })
    }

    // fallback: if server cannot parse, return model text so client can show it
    return res.json({ raw: responseText, warning: 'Could not parse JSON bullets from model response.' })
  } catch (err) {
    console.error('summarizeText error:', err)
    res.status(500).json({ error: 'AI request failed' })
  }
}

module.exports = { generateFlashcards, summarizeText }
