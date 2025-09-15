const axios = require('axios')


const OPENAI_KEY = process.env.OPENAI_API_KEY


async function chatCompletion(prompt) {
if (!OPENAI_KEY) throw new Error('OPENAI_API_KEY not set')
const body = {
model: 'gpt-4o-mini',
messages: [
{ role: 'system', content: 'You are a helpful study assistant.' },
{ role: 'user', content: prompt }
],
max_tokens: 800,
temperature: 0.2
}
const r = await axios.post('https://api.openai.com/v1/chat/completions', body, {
headers: { Authorization: `Bearer ${OPENAI_KEY}` }
})
return r.data.choices[0].message.content
}


module.exports = { chatCompletion }