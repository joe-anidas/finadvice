import Link from 'next/link';
import { Mail, Phone, MapPin, BarChart2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-accent-900 text-accent-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center">
              <div className="h-10 w-10 flex items-center justify-center rounded-md bg-primary-600 text-white">
                <BarChart2 className="h-6 w-6" />
              </div>
              <span className="ml-2 text-xl font-bold text-white">FinAssist</span>
            </Link>
            <p className="mt-4 text-accent-300 max-w-xs">
              Making professional financial advice accessible to underserved communities globally.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-accent-400 hover:text-accent-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-accent-400 hover:text-accent-300">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/features" className="text-accent-300 hover:text-accent-100">Features</Link></li>
              <li><Link href="/pricing" className="text-accent-300 hover:text-accent-100">Pricing</Link></li>
              <li><Link href="/security" className="text-accent-300 hover:text-accent-100">Security</Link></li>
              <li><Link href="/roadmap" className="text-accent-300 hover:text-accent-100">Roadmap</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/learn" className="text-accent-300 hover:text-accent-100">Financial Education</Link></li>
              <li><Link href="/blog" className="text-accent-300 hover:text-accent-100">Blog</Link></li>
              <li><Link href="/support" className="text-accent-300 hover:text-accent-100">Support</Link></li>
              <li><Link href="/docs" className="text-accent-300 hover:text-accent-100">API Documentation</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-accent-400" />
                <a href="mailto:contact@finassist.com" className="text-accent-300 hover:text-accent-100">contact@finassist.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-accent-400" />
                <a href="tel:+18005551234" className="text-accent-300 hover:text-accent-100">+1 (800) 555-1234</a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-accent-400 mt-1" />
                <span className="text-accent-300">123 Finance Street<br />New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-accent-800">
          <p className="text-center text-accent-400">
            &copy; {new Date().getFullYear()} FinAssist. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}