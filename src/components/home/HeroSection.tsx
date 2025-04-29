import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="w-full min-h-[90vh] flex items-center py-20 px-4 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-6"
        >
          <span className="px-3 py-1 bg-primary-700 text-primary-100 rounded-full text-sm font-medium inline-flex items-center self-start">
            Financial Freedom For All
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            AI-Powered Financial Planning & Investment Assistant
          </h1>
          <p className="text-xl text-primary-100">
            Making professional financial advice accessible to underserved communities globally through cutting-edge AI technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/dashboard" className="btn-primary text-base py-3 px-6">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/about" className="btn bg-primary-800 text-primary-100 hover:bg-primary-700 text-base py-3 px-6">
              Learn More
            </Link>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl"
        >
          <Image
            src="https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg"
            alt="Person using financial app on mobile and desktop"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent"></div>
          
          <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-success-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Portfolio Optimized</p>
                <p className="text-primary-100 text-sm">AI recommendations applied</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}