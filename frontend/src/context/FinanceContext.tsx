"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Transaction, Category, UserProfile, FinanceContextType } from '@/types/finance';
import { toast } from 'sonner';

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'Salário', type: 'income', color: '#16A34A' },
  { id: '2', name: 'Freelance', type: 'income', color: '#2563EB' },
  { id: '3', name: 'Investimentos', type: 'income', color: '#8B5CF6' },
  { id: '4', name: 'Alimentação', type: 'expense', color: '#DC2626' },
  { id: '5', name: 'Transporte', type: 'expense', color: '#F59E0B' },
  { id: '6', name: 'Moradia', type: 'expense', color: '#475569' },
  { id: '7', name: 'Lazer', type: 'expense', color: '#EC4899' },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', description: 'Salário Mensal', amount: 3500, date: new Date().toISOString().split('T')[0], categoryId: '1', type: 'income' },
  { id: '2', description: 'Projeto Freelance', amount: 1200, date: new Date().toISOString().split('T')[0], categoryId: '2', type: 'income' },
  { id: '3', description: 'Supermercado', amount: 450, date: new Date().toISOString().split('T')[0], categoryId: '4', type: 'expense', status: 'paid' },
  { id: '4', description: 'Aluguel', amount: 1200, date: new Date().toISOString().split('T')[0], categoryId: '6', type: 'expense', status: 'paid' },
];

const DEFAULT_PROFILE: UserProfile = {
  name: 'Usuário Demo',
  email: 'usuario@email.com',
  phone: '(00) 00000-0000',
  cpf: '000.000.000-00',
  birthDate: '1990-01-01',
  occupation: 'Desenvolvedor',
  city: 'São Paulo',
  state: 'SP',
  country: 'Brasil',
  currency: 'BRL',
  dateFormat: 'dd/mm/aaaa'
};

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    const savedTransactions = localStorage.getItem('fincontrol_transactions');
    const savedCategories = localStorage.getItem('fincontrol_categories');
    const savedProfile = localStorage.getItem('fincontrol_profile');

    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    else setTransactions(INITIAL_TRANSACTIONS);

    if (savedCategories) setCategories(JSON.parse(savedCategories));
    else setCategories(INITIAL_CATEGORIES);

    if (savedProfile) setProfile(JSON.parse(savedProfile));
    else setProfile(DEFAULT_PROFILE);
  }, []);

  useEffect(() => {
    localStorage.setItem('fincontrol_transactions', JSON.stringify(transactions));
    localStorage.setItem('fincontrol_categories', JSON.stringify(categories));
    localStorage.setItem('fincontrol_profile', JSON.stringify(profile));
  }, [transactions, categories, profile]);

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...t, id: crypto.randomUUID() };
    setTransactions(prev => [newTransaction, ...prev]);
    toast.success('Transação adicionada com sucesso!');
  };

  const updateTransaction = (id: string, t: Partial<Transaction>) => {
    setTransactions(prev => prev.map(item => item.id === id ? { ...item, ...t } : item));
    toast.success('Transação atualizada com sucesso!');
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(item => item.id !== id));
    toast.success('Transação removida!');
  };

  const addCategory = (c: Omit<Category, 'id'>) => {
    const newCategory = { ...c, id: crypto.randomUUID() };
    setCategories(prev => [...prev, newCategory]);
    toast.success('Categoria criada!');
  };

  const updateCategory = (id: string, c: Partial<Category>) => {
    setCategories(prev => prev.map(item => item.id === id ? { ...item, ...c } : item));
    toast.success('Categoria atualizada!');
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(item => item.id !== id));
    toast.success('Categoria removida!');
  };

  const clearAllData = () => {
    setTransactions([]);
    setCategories(INITIAL_CATEGORIES);
    setProfile(DEFAULT_PROFILE);
    toast.info('Todos os dados foram limpos.');
  };

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  const resetProfile = () => {
    setProfile(DEFAULT_PROFILE);
  };

  return (
    <FinanceContext.Provider value={{ 
      transactions, categories, profile, addTransaction, updateTransaction, 
      deleteTransaction, addCategory, updateCategory, deleteCategory, clearAllData,
      updateProfile, resetProfile
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) throw new Error('useFinance must be used within a FinanceProvider');
  return context;
};