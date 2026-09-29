import React from 'react';
import { Tag, PlayCircle, Clock, Truck } from 'lucide-react';

interface PillarItem {
  icon: React.ReactNode;
  title: string;
  sub: string;
}

export function Pillars() {
  const pillars: PillarItem[] = [
    {
      icon: <Tag size={18} className="text-terracotta" />,
      title: 'Direct Factory Rates',
      sub: 'Wholesale prices across South India',
    },
    {
      icon: <PlayCircle size={18} className="text-red-500" />,
      title: 'Live Video Demos',
      sub: 'Watch YouTube recline demonstrations',
    },
    {
      icon: <Clock size={18} className="text-amber-600" />,
      title: '10+ Years Trust',
      sub: 'Madurai manufacturing heritage',
    },
    {
      icon: <Truck size={18} className="text-emerald-600" />,
      title: 'Safe Door Delivery',
      sub: 'Doorstep dispatch & transport options',
    },
  ];

  return (
    <section className="py-6 sm:py-8 bg-stone-100/70 border-b border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {pillars.map((item, idx) => (
            <div
              className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs hover:shadow-md transition-all"
              key={idx}
            >
              <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-100 shrink-0 flex items-center justify-center shadow-2xs">
                {item.icon}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-stone-900 text-xs sm:text-sm truncate">{item.title}</div>
                <div className="text-[11px] text-stone-500 truncate mt-0.5">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
