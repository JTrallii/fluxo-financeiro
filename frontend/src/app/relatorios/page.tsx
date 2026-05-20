"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { formatCurrency } from '@/lib/formatters';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { StatCard } from '@/components/finance/StatCard';
import { TrendingUp, TrendingDown, Wallet, PieChart as PieIcon } from 'lucide-react';

export default function ReportsPage() {
  const { transactions, categories } = useFinance();

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // Mock de evolução mensal (em um sistema real, isso seria calculado das transações)
  const evolutionData = [
    { month: 'Jan', receitas: 3200, despesas: 2100 },
    { month: 'Fev', receitas: 3500, despesas: 2400 },
    { month: 'Mar', receitas: 3100, despesas: 2800 },
    { month: 'Abr', receitas: 4200, despesas: 2600 },
    { month: 'Mai', receitas: totalIncome, despesas: totalExpense },
  ];

  const expenseByCategory = categories
    .filter(c => c.type === 'expense')
    .map(cat => {
      const total = transactions
        .filter(t => t.categoryId === cat.id)
        .reduce((acc, t) => acc + t.amount, 0);
      return { name: cat.name, value: total, color: cat.color };
    })
    .filter(item => item.value > 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Relatórios Financeiros</h1>
        <p className="text-slate-500 text-sm">Análise detalhada da sua saúde financeira de forma visual</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Receitas Totais" 
          value={formatCurrency(totalIncome)} 
          icon={TrendingUp} 
          colorClass="text-emerald-600" 
          bgClass="bg-emerald-50/80"
          variant="income"
        />
        <StatCard 
          title="Despesas Totais" 
          value={formatCurrency(totalExpense)} 
          icon={TrendingDown} 
          colorClass="text-rose-600" 
          bgClass="bg-rose-50/80"
          variant="expense"
        />
        <StatCard 
          title="Saldo Acumulado" 
          value={formatCurrency(balance)} 
          icon={Wallet} 
          colorClass="text-blue-600" 
          bgClass="bg-blue-50/80"
          variant="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Evolution Chart */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-[0.07] pointer-events-none z-0" 
            style={{ backgroundImage: "url('/background2.png')" }}
          />
          <div className="relative z-10">
            <div className="mb-8">
              <h3 className="text-base font-bold text-slate-900">Evolução Mensal</h3>
              <p className="text-xs text-slate-400">Histórico de receitas e despesas</p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={evolutionData}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)' }}
                  />
                  <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
                  <Area type="monotone" dataKey="receitas" stroke="#10B981" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={3} />
                  <Area type="monotone" dataKey="despesas" stroke="#F43F5E" fillOpacity={1} fill="url(#colorExpense)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-[0.07] pointer-events-none z-0" 
            style={{ backgroundImage: "url('/background2.png')" }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                <PieIcon size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Distribuição de Gastos</h3>
                <p className="text-xs text-slate-400">Proporção de despesas por categoria</p>
              </div>
            </div>
            <div className="h-[300px] w-full">
              {expenseByCategory.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {expenseByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <p className="text-xs font-medium">Sem dados para exibir o gráfico</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}