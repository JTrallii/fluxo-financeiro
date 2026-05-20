"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useFinance } from '@/context/FinanceContext';
import { Transaction, TransactionType } from '@/types/finance';
import { AlertCircle } from 'lucide-react';

const schema = z.object({
  description: z.string().min(3, 'Descrição deve ter ao menos 3 caracteres'),
  amount: z.coerce.number().positive('Valor deve ser maior que zero'),
  date: z.string().min(1, 'Data é obrigatória'),
  categoryId: z.string().min(1, 'Categoria é obrigatória'),
  status: z.enum(['paid', 'pending']).optional(),
  observation: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: TransactionType;
  editingTransaction?: Transaction | null;
}

export const TransactionModal = ({ isOpen, onClose, type, editingTransaction }: TransactionModalProps) => {
  const { categories, addTransaction, updateTransaction } = useFinance();
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      status: 'paid'
    }
  });

  useEffect(() => {
    if (editingTransaction) {
      setValue('description', editingTransaction.description);
      setValue('amount', editingTransaction.amount);
      setValue('date', editingTransaction.date);
      setValue('categoryId', editingTransaction.categoryId);
      setValue('status', editingTransaction.status || 'paid');
      setValue('observation', editingTransaction.observation || '');
    } else {
      reset({
        description: '',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        categoryId: '',
        status: 'paid',
        observation: ''
      });
    }
  }, [editingTransaction, isOpen, reset, setValue]);

  const onSubmit = (data: FormData) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, { ...data, type });
    } else {
      addTransaction({ ...data, type });
    }
    onClose();
  };

  const filteredCategories = categories.filter(c => c.type === type);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95%] sm:max-w-[500px] rounded-3xl border border-slate-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight">
            {editingTransaction ? 'Editar' : 'Nova'} {type === 'income' ? 'Receita' : 'Despesa'}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-400">
            Preencha as informações abaixo para registrar sua {type === 'income' ? 'entrada' : 'saída'} financeira.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-2">
          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Descrição</Label>
            <Input 
              id="description" 
              {...register('description')} 
              placeholder="Ex: Salário Mensal, Supermercado..." 
              className="rounded-2xl h-11 border-slate-200 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 bg-slate-50/30" 
            />
            {errors.description && (
              <p className="text-xs text-rose-500 flex items-center gap-1 font-medium mt-1">
                <AlertCircle size={12} /> {errors.description.message}
              </p>
            )}
          </div>

          {/* Amount & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="amount" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Valor (R$)</Label>
              <Input 
                id="amount" 
                type="number" 
                step="0.01" 
                {...register('amount')} 
                className="rounded-2xl h-11 border-slate-200 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 bg-slate-50/30" 
              />
              {errors.amount && (
                <p className="text-xs text-rose-500 flex items-center gap-1 font-medium mt-1">
                  <AlertCircle size={12} /> {errors.amount.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="date" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Data</Label>
              <Input 
                id="date" 
                type="date" 
                {...register('date')} 
                className="rounded-2xl h-11 border-slate-200 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 bg-slate-50/30" 
              />
              {errors.date && (
                <p className="text-xs text-rose-500 flex items-center gap-1 font-medium mt-1">
                  <AlertCircle size={12} /> {errors.date.message}
                </p>
              )}
            </div>
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Categoria</Label>
              <Select 
                onValueChange={(val) => setValue('categoryId', val)} 
                defaultValue={editingTransaction?.categoryId}
              >
                <SelectTrigger className="rounded-2xl h-11 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/30">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  {filteredCategories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categoryId && (
                <p className="text-xs text-rose-500 flex items-center gap-1 font-medium mt-1">
                  <AlertCircle size={12} /> {errors.categoryId.message}
                </p>
              )}
            </div>
            {type === 'expense' && (
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</Label>
                <Select 
                  onValueChange={(val) => setValue('status', val as 'paid' | 'pending')}
                  defaultValue={editingTransaction?.status || 'paid'}
                >
                  <SelectTrigger className="rounded-2xl h-11 border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="paid">Pago</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Observation */}
          <div className="space-y-1.5">
            <Label htmlFor="observation" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Observação (Opcional)</Label>
            <Textarea 
              id="observation" 
              {...register('observation')} 
              placeholder="Adicione detalhes adicionais..."
              className="rounded-2xl border-slate-200 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 bg-slate-50/30 resize-none h-20" 
            />
          </div>

          <DialogFooter className="pt-4 flex flex-col-reverse sm:flex-row gap-2 sm:gap-0">
            <Button type="button" variant="ghost" onClick={onClose} className="rounded-2xl h-11 font-semibold text-slate-500 hover:bg-slate-50 w-full sm:w-auto">
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-2xl h-11 px-8 font-semibold text-white shadow-md shadow-blue-100 transition-all w-full sm:w-auto">
              {editingTransaction ? 'Salvar Alterações' : 'Criar Registro'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};