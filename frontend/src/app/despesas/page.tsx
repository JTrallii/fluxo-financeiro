"use client";

import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Filter, CheckCircle2, Clock, ArrowDownRight, AlertTriangle } from 'lucide-react';
import { useFinance } from '@/context/FinanceContext';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { TransactionModal } from '@/components/finance/TransactionModal';
import { Transaction } from '@/types/finance';
import { cn } from '@/lib/utils';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ExpensesPage() {
  const { transactions, categories, deleteTransaction, updateTransaction } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .filter(t => t.description.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalExpenses = expenses.reduce((acc, t) => acc + t.amount, 0);

  const handleEdit = (t: Transaction) => {
    setEditingTransaction(t);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const toggleStatus = (t: Transaction) => {
    updateTransaction(t.id, { status: t.status === 'paid' ? 'pending' : 'paid' });
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteTransaction(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Despesas</h1>
          <p className="text-slate-500 text-sm">Controle seus gastos e pagamentos de forma inteligente</p>
        </div>
        <Button onClick={handleAdd} className="bg-rose-600 hover:bg-rose-700 active:scale-95 rounded-2xl h-12 px-6 gap-2 shadow-lg shadow-rose-100 transition-all hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto justify-center">
          <Plus size={18} />
          Nova Despesa
        </Button>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.07] pointer-events-none z-0" 
          style={{ backgroundImage: "url('/background2.png')" }}
        />
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <Input 
                placeholder="Buscar por descrição..." 
                className="pl-10 rounded-2xl h-11 border-slate-200 focus-visible:ring-2 focus-visible:ring-rose-500/20 focus-visible:border-rose-500 bg-slate-50/50 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button variant="outline" className="rounded-2xl h-11 gap-2 border-slate-200 text-slate-600 hover:bg-slate-50 w-full sm:w-auto justify-center">
                <Filter size={16} />
                Filtros
              </Button>
              <div className="bg-rose-50/60 px-5 py-2 rounded-2xl flex flex-col justify-center border border-rose-100/50 w-full sm:w-auto text-center sm:text-left shrink-0">
                <span className="text-[9px] font-bold text-rose-600 uppercase tracking-wider">Total Filtrado</span>
                <span className="text-base font-bold text-rose-700 whitespace-nowrap">{formatCurrency(totalExpenses)}</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
              <table className="min-w-[600px] w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Descrição</th>
                    <th className="pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Categoria</th>
                    <th className="pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Data</th>
                    <th className="pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Valor</th>
                    <th className="pb-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {expenses.map((t) => {
                    const category = categories.find(c => c.id === t.categoryId);
                    return (
                      <tr key={t.id} className="group hover:bg-slate-50/40 transition-colors">
                        <td className="py-4">
                          <div className="flex items-center gap-2.5">
                            <div className="p-1.5 bg-rose-50 text-rose-600 rounded-lg shrink-0">
                              <ArrowDownRight size={14} />
                            </div>
                            <span className="font-semibold text-slate-800 text-sm truncate max-w-[200px]">{t.description}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <Badge variant="secondary" className="bg-slate-50 text-slate-600 border border-slate-100 rounded-lg font-medium text-xs px-2.5 py-0.5 whitespace-nowrap">
                            {category?.name || 'Sem categoria'}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <button 
                            onClick={() => toggleStatus(t)}
                            className={cn(
                              "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all border whitespace-nowrap",
                              t.status === 'paid' 
                                ? "bg-emerald-50/60 text-emerald-600 border-emerald-100/50 hover:bg-emerald-100/80" 
                                : "bg-amber-50/60 text-amber-600 border-amber-100/50 hover:bg-amber-100/80"
                            )}
                          >
                            {t.status === 'paid' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                            {t.status === 'paid' ? 'Pago' : 'Pendente'}
                          </button>
                        </td>
                        <td className="py-4 text-slate-400 text-xs font-medium whitespace-nowrap">{formatDate(t.date)}</td>
                        <td className="py-4 font-bold text-rose-600 text-sm whitespace-nowrap">{formatCurrency(t.amount)}</td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(t)} className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl">
                              <Edit2 size={14} />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => setDeleteId(t.id)} className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl">
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {expenses.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400 text-sm font-medium">
                        Nenhuma despesa encontrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type="expense" 
        editingTransaction={editingTransaction}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="w-[95%] sm:max-w-md rounded-3xl border border-slate-100 shadow-2xl">
          <AlertDialogHeader className="flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
              <AlertTriangle size={28} />
            </div>
            <div className="space-y-1">
              <AlertDialogTitle className="text-lg font-bold text-slate-900">Deseja mesmo apagar esta despesa?</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-500 text-sm">
                Esta ação é permanente e removerá o registro de despesa do seu histórico financeiro. Não será possível recuperá-lo.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-2 justify-center sm:justify-center pt-2">
            <AlertDialogCancel className="rounded-2xl h-11 px-5 font-semibold text-slate-500 border-slate-200 hover:bg-slate-50 w-full sm:w-auto">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-rose-600 hover:bg-rose-700 active:scale-95 rounded-2xl h-11 px-6 font-semibold text-white shadow-md shadow-rose-100 w-full sm:w-auto">
              Sim, Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}