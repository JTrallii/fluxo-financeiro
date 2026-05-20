"use client";

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Tag } from 'lucide-react';
import { useFinance } from '@/context/FinanceContext';
import { Button } from '@/components/ui/button';
import { Category } from '@/types/finance';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
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

export default function CategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    type: 'expense' as 'income' | 'expense',
    color: '#2563EB'
  });

  const handleEdit = (c: Category) => {
    setEditingCategory(c);
    setFormData({ name: c.name, type: c.type, color: c.color });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', type: 'expense', color: '#2563EB' });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
    } else {
      addCategory(formData);
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteCategory(deleteId);
      setDeleteId(null);
    }
  };

  const incomeCategories = categories.filter(c => c.type === 'income');
  const expenseCategories = categories.filter(c => c.type === 'expense');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Categorias</h1>
          <p className="text-slate-500 text-sm">Organize suas transações por tipo de forma visual</p>
        </div>
        <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 rounded-2xl h-12 px-6 gap-2 shadow-lg shadow-blue-100 transition-all hover:shadow-xl hover:-translate-y-0.5">
          <Plus size={18} />
          Nova Categoria
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Income Categories */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-[0.07] pointer-events-none z-0" 
            style={{ backgroundImage: "url('/background2.png')" }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <Tag size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Categorias de Receita</h3>
                <p className="text-xs text-slate-400">Fontes de entrada financeira</p>
              </div>
            </div>
            <div className="space-y-2.5">
              {incomeCategories.map(cat => (
                <div key={cat.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100/50 hover:border-slate-200 hover:bg-slate-50/30 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-4 ring-slate-50" style={{ backgroundColor: cat.color }} />
                    <span className="font-semibold text-slate-700 text-sm">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(cat)} className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl">
                      <Edit2 size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteId(cat.id)} className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expense Categories */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-[0.07] pointer-events-none z-0" 
            style={{ backgroundImage: "url('/background2.png')" }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
                <Tag size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Categorias de Despesa</h3>
                <p className="text-xs text-slate-400">Destinos de saída financeira</p>
              </div>
            </div>
            <div className="space-y-2.5">
              {expenseCategories.map(cat => (
                <div key={cat.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100/50 hover:border-slate-200 hover:bg-slate-50/30 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full ring-4 ring-slate-50" style={{ backgroundColor: cat.color }} />
                    <span className="font-semibold text-slate-700 text-sm">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(cat)} className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl">
                      <Edit2 size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteId(cat.id)} className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[400px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-slate-900">
              {editingCategory ? 'Editar' : 'Nova'} Categoria
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nome da Categoria</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ex: Alimentação" 
                className="rounded-2xl h-11 border-slate-200 bg-slate-50/50"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tipo</Label>
              <Select 
                value={formData.type} 
                onValueChange={(val: 'income' | 'expense') => setFormData({...formData, type: val})}
              >
                <SelectTrigger className="rounded-2xl h-11 border-slate-200 bg-slate-50/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="income">Receita</SelectItem>
                  <SelectItem value="expense">Despesa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="color" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Cor</Label>
              <div className="flex gap-3 items-center">
                <Input 
                  id="color" 
                  type="color" 
                  value={formData.color} 
                  onChange={(e) => setFormData({...formData, color: e.target.value})}
                  className="w-12 h-12 p-1 rounded-2xl cursor-pointer border-slate-200"
                />
                <span className="text-xs text-slate-500 font-mono uppercase font-semibold bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">{formData.color}</span>
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="rounded-2xl">Cancelar</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 rounded-2xl px-8">
                {editingCategory ? 'Salvar' : 'Criar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-slate-900">Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 text-sm">
              Tem certeza que deseja excluir esta categoria? Transações vinculadas a ela podem ficar sem categoria.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-2xl">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-rose-600 hover:bg-rose-700 rounded-2xl">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}