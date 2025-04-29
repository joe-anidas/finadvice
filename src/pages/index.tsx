import Head from 'next/head';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart4, Lock, Shield, Globe, Lightbulb } from 'lucide-react';
import { HeroSection } from '../components/home/HeroSection';
import { FeatureCard } from '../components/home/FeatureCard';
import { TestimonialSection } from '../components/home/TestimonialSection';
import { CallToAction } from '../components/home/CallToAction';

export default function Home() {
  const features = [
    {
      title: "Smart Wallet Integration",
      description: "Frictionless onboarding with Base Smart Wallets - no complex setup required.",
      icon: Lock,
      color: "bg-primary-100 text-primary-700"
    },
    {
      title: "AI-Powered Financial Advice",
      description: "Get personalized financial guidance in your native language through Groq AI.",
      icon: Lightbulb,
      color: "bg-secondary-100 text-secondary-700"
    },
    {
      title: "Real-Time Market Data",
      description: "Access live market information and portfolio tracking powered by Fluvio.",
      icon: BarChart4,
      color: "bg-success-100 text-success-700"
    },
    {
      title: "Global Accessibility",
      description: "Breaking down barriers for underserved communities worldwide.",
      icon: Globe,
      color: "bg-warning-100 text-warning-700"
    }
  ];

  return (
    <>
      <Head>
        <title>FinAssist | AI-Powered Financial Planning</title>
        <meta name="description" content="Real-time financial planning and investment assistant for everyone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center">
        <HeroSection />

        <section className="w-full py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-accent-900 mb-4">Making Finance Accessible</h2>
              <p className="text-xl text-accent-600 max-w-3xl mx-auto">
                Our platform combines cutting-edge technology with user-friendly design to make financial planning accessible for everyone.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <FeatureCard 
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                    color={feature.color}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <TestimonialSection />
        <CallToAction />
      </main>
    </>
  );
}