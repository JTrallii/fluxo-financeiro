import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendType?: 'up' | 'down' | 'neutral';
  colorClass: string;
  bgClass: string;
  variant?: 'balance' | 'income' | 'expense' | 'neutral';
}

export const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendType, 
  colorClass, 
  bgClass,
  variant = 'neutral' 
}: StatCardProps) => {
  if (variant === 'balance') {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 p-5 sm:p-6 text-white shadow-xl shadow-indigo-950/10 border border-slate-800/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col justify-between">
        {/* Decorative background glow */}
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-all duration-500" />
        <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500" />
        
        <div className="flex items-start justify-between mb-5 sm:mb-6 relative z-10">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white transition-transform duration-300 group-hover:scale-110">
            <Icon size={20} />
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-indigo-200 whitespace-nowrap">
            Consolidado
          </span>
        </div>
        
        <div className="relative z-10">
          <p className="text-[10px] sm:text-xs font-semibold text-indigo-200/70 uppercase tracking-wider mb-1 whitespace-nowrap">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white whitespace-nowrap">{value}</h3>
        </div>
      </div>
    );
  }

  // Accent border colors based on variant
  const borderAccent = {
    income: 'border-l-4 border-l-emerald-500',
    expense: 'border-l-4 border-l-rose-500',
    neutral: 'border-l-4 border-l-slate-400'
  }[variant];

  return (
    <div className={cn(
      "bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden h-full flex flex-col justify-between",
      borderAccent
    )}>
      {/* Subtle background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-[0.07] pointer-events-none z-0" 
        style={{ backgroundImage: "url('/background2.png')" }}
      />

      <div className="flex items-start justify-between mb-4 sm:mb-5 relative z-10">
        <div className={cn("p-2.5 sm:p-3 rounded-2xl transition-transform duration-300 group-hover:scale-110", bgClass)}>
          <Icon className={colorClass} size={20} />
        </div>
        {trend && (
          <span className={cn(
            "text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full tracking-wide whitespace-nowrap",
            trendType === 'up' ? "bg-emerald-50 text-emerald-600 border border-emerald-100/50" : 
            trendType === 'down' ? "bg-rose-50 text-rose-600 border border-rose-100/50" : "bg-slate-50 text-slate-600 border border-slate-100"
          )}>
            {trend}
          </span>
        )}
      </div>
      
      <div className="relative z-10">
        <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 whitespace-nowrap">{title}</p>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300 whitespace-nowrap">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;