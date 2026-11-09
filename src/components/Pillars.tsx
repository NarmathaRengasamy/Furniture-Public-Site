import React from 'react';
import { Trees, Hammer, ShieldCheck, Truck } from 'lucide-react';

interface PillarItem {
  icon: React.ReactNode;
  principle: string;
  title: string;
  sub: string;
}

export function Pillars() {
  const pillars: PillarItem[] = [
    {
      icon: <Trees size={16} className="text-stone-700" />,
      principle: '01 / Sourcing',
      title: 'Sustainably harvested timber',
      sub: 'Kiln-dried European oak, plantation teak, and walnut',
    },
    {
      icon: <Hammer size={16} className="text-stone-700" />,
      principle: '02 / Joinery',
      title: 'Generational craft',
      sub: 'Mortise-and-tenon construction without quick brackets',
    },
    {
      icon: <ShieldCheck size={16} className="text-stone-700" />,
      principle: '03 / Finish',
      title: 'Organic zero-VOC oils',
      sub: 'Botanical hardwax that allows raw wood to breathe',
    },
    {
      icon: <Truck size={16} className="text-stone-700" />,
      principle: '04 / Logistics',
      title: 'Room-of-choice delivery',
      sub: 'Insured white-glove transit and uncrating across India',
    },
  ];

  return (
    <section className="py-8 sm:py-10 bg-surface-contrast border-b border-[#D8D2C6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((item, idx) => (
            <div
              className="flex flex-col gap-2 p-4 rounded-xl bg-surface-card border border-[#D8D2C6] shadow-2xs hover:border-stone-400 transition-colors"
              key={idx}
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-surface-ground border border-[#D8D2C6] shrink-0 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-xs font-mono text-stone-500">
                  {item.principle}
                </span>
              </div>
              <div className="pt-1">
                <div className="font-medium text-charcoal text-xs sm:text-sm">
                  {item.title}
                </div>
                <div className="text-xs text-stone-500 leading-relaxed mt-1">
                  {item.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
