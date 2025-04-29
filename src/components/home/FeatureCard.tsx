import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export function FeatureCard({ title, description, icon: Icon, color }: FeatureCardProps) {
  return (
    <div className="card p-6 h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-5 ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-accent-900">{title}</h3>
      <p className="text-accent-600 flex-grow">{description}</p>
    </div>
  );
}