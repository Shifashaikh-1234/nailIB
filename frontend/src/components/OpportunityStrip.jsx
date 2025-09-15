    
import { motion } from 'framer-motion';

export default function OpportunityStrip() {
    return (

        <div className='flex justify-center items-center'>
    <div className='bg-red-900 text-white text-center p-2 font-bold m-3 rounded-lg m-5 w-1/2 ' >
                <motion.div
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <a href="https://examplit.com/school-strategist">High School Internship Opportunities Now Available </a>
        </motion.div>
    </div>
    </div>
    )
}