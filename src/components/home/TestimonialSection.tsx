import { motion } from 'framer-motion';
import Image from 'next/image';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
}

export function TestimonialSection() {
  const testimonials: Testimonial[] = [
    {
      quote: "This platform has given me access to financial advice I could never afford before. It's changed how I save and invest.",
      author: "Maria Rodriguez",
      role: "Small Business Owner",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    },
    {
      quote: "The AI suggestions helped me diversify my investments and reduce fees. I've seen a 12% increase in my portfolio.",
      author: "David Kim",
      role: "Teacher",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
    },
    {
      quote: "Being able to get financial advice in my native language made all the difference. I finally understand how to build wealth.",
      author: "Aisha Johnson",
      role: "Healthcare Worker",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
    }
  ];

  return (
    <section className="w-full py-20 px-4 bg-accent-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-accent-900 mb-4">Success Stories</h2>
          <p className="text-xl text-accent-600 max-w-3xl mx-auto">
            Our platform is helping people around the world take control of their financial future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card overflow-visible"
            >
              <div className="p-6">
                <div className="relative w-16 h-16 -mt-14 mb-4 rounded-full overflow-hidden border-4 border-white">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-accent-700 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-accent-900">{testimonial.author}</p>
                  <p className="text-accent-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}