"use client";

import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowRightLeft,
  CalendarDays,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { StatCard } from '@/components/finance/StatCard';
import { useFinance } from '@/context/FinanceContext';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const { transactions, categories } = useFinance();

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // Dados para o gráfico de barras (Receitas vs Despesas)
  const chartData = [
    { name: 'Receitas', value: totalIncome, color: '#10B981' },
    { name: 'Despesas', value: totalExpense, color: '#F43F5E' },
  ];

  // Dados para o gráfico de pizza (Despesas por Categoria)
  const expenseByCategory = categories
    .filter(c => c.type === 'expense')
    .map(cat => {
      const total = transactions
        .filter(t => t.categoryId === cat.id)
        .reduce((acc, t) => acc + t.amount, 0);
      return { name: cat.name, value: total, color: cat.color };
    })
    .filter(item => item.value > 0);

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Grid with intelligent responsive column spanning */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className="sm:col-span-2 lg:col-span-3 xl:col-span-1">
          <StatCard 
            title="Saldo Atual" 
            value={formatCurrency(balance)} 
            icon={Wallet} 
            colorClass="text-white" 
            bgClass="bg-white/10"
            variant="balance"
          />
        </div>
        <div className="sm:col-span-1 lg:col-span-1 xl:col-span-1">
          <StatCard 
            title="Total Receitas" 
            value={formatCurrency(totalIncome)} 
            icon={TrendingUp} 
            colorClass="text-emerald-600" 
            bgClass="bg-emerald-50/80"
            trend="+12%"
            trendType="up"
            variant="income"
          />
        </div>
        <div className="sm:col-span-1 lg:col-span-1 xl:col-span-1">
          <StatCard 
            title="Total Despesas" 
            value={formatCurrency(totalExpense)} 
            icon={TrendingDown} 
            colorClass="text-rose-600" 
            bgClass="bg-rose-50/80"
            trend="-5%"
            trendType="down"
            variant="expense"
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-1 xl:col-span-1">
          <StatCard 
            title="Transações" 
            value={transactions.length.toString()} 
            icon={ArrowRightLeft} 
            colorClass="text-slate-600" 
            bgClass="bg-slate-100/80"
            variant="neutral"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-[0.07] pointer-events-none z-0" 
            style={{ backgroundImage: "url('/background2.png')" }}
          />
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-base font-bold text-slate-900">Visão Geral</h3>
                <p className="text-xs text-slate-400">Comparativo de entradas e saídas</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 self-start sm:self-auto">
                <CalendarDays size={14} />
                <span>Últimos 30 dias</span>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} />
                  <Tooltip 
                    cursor={{ fill: '#F8FAFC' }}
                    contentStyle={{ borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)' }}
                  />
                  <Bar dataKey="value" radius={[12, 12, 0, 0]} barSize={50}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-[0.07] pointer-events-none z-0" 
            style={{ backgroundImage: "url('/background2.png')" }}
          />
          <div className="relative z-10 flex flex-col justify-between h-full w-full">
            <div>
              <h3 className="text-base font-bold text-slate-900">Despesas por Categoria</h3>
              <p className="text-xs text-slate-400 mb-6">Distribuição dos seus gastos</p>
            </div>
            <div className="h-[200px] w-full relative flex items-center justify-center">
              {expenseByCategory.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {expenseByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <p className="text-xs font-medium">Sem dados de despesas</p>
                </div>
              )}
            </div>
            <div className="mt-6 space-y-2.5">
              {expenseByCategory.slice(0, 3).map((item, i) => (
                <div key={i} className="flex items-center justify-between text-xs bg-slate-50/50 p-2.5 rounded-xl border border-slate-100/50">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="font-medium text-slate-600 truncate">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900 shrink-0 ml-2">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.07] pointer-events-none z-0" 
          style={{ backgroundImage: "url('/background2.png')" }}
        />
        <div className="relative z-10">
          <div className="p-6 sm:p-8 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Últimas Transações</h3>
              <p className="text-xs text-slate-400">Seu histórico financeiro recente</p>
            </div>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/80 px-4 py-2 rounded-xl transition-colors self-start sm:self-auto">
              Ver todas
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="bg-slate-50/40 border-b border-slate-100">
                  <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Descrição</th>
                  <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Categoria</th>
                  <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Data</th>
                  <th className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentTransactions.map((t) => {
                  const category = categories.find(c => c.id === t.categoryId);
                  const isIncome = t.type === 'income';
                  return (
                    <tr key={t.id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2 rounded-xl transition-transform duration-300 group-hover:scale-110 shrink-0",
                            isIncome ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                          )}>
                            {isIncome ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                          </div>
                          <span className="font-semibold text-slate-800 text-sm truncate max-w-[200px]">{t.description}</span>
                        </div>
                      </td>
                      <td className="px-8 py-4">
                        <Badge variant="secondary" className="bg-slate-50 text-slate-600 border border-slate-100 rounded-lg font-medium text-xs px-2.5 py-1 whitespace-nowrap">
                          {category?.name || 'Sem categoria'}
                        </Badge>
                      </td>
                      <td className="px-8 py-4 text-slate-400 text-xs font-medium whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} />
                          {formatDate(t.date)}
                        </div>
                      </td>
                      <td className={cn(
                        "px-8 py-4 text-right font-bold text-sm whitespace-nowrap",
                        isIncome ? "text-emerald-600" : "text-rose-600"
                      )}>
                        {isIncome ? '+' : '-'} {formatCurrency(t.amount)}
                      </td>
                    </tr>
                  );
                })}
                {recentTransactions.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-8 py-12 text-center text-slate-400">
                      Nenhuma transação encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}