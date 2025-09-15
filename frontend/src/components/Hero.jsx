import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {Typewriter} from 'react-simple-typewriter'




export default function Hero() {
return (
<section className="pt-16 pb-12 m-5">
<div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
<div>
<motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 , transition: { duration: 1 } }} className="text-4xl font-extrabold m-3">AI-powered IB learning — NailIB</motion.h1>
<p className="mt-4 text-lg">Upload notes or chapters and generate summaries, flashcards and a personalized study plan in seconds.</p>
<div className="mt-6 flex align-items-center gap-4">
<Link to="https://nailib.com/register" className="btn-primary">Register Now It's Free</Link>
</div>
</div>
<div>
<div className="rounded-2xl p-6 bg-white shadow dark:bg-gray-800">
<Typewriter
  words={['Generate summaries...', 'Create Flashcards...', 'Build a study plan...']}
  loop={5}
  cursor
  cursorStyle='|'
  typeSpeed={70}
  deleteSpeed={50}
  delaySpeed={1000}
/>
</div>
</div>
</div>
</section>
)
}