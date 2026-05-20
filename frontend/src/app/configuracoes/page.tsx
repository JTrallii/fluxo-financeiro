"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Settings, Save, RotateCcw, AlertCircle } from 'lucide-react';
import { useFinance } from '@/context/FinanceContext';
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
import { toast } from 'sonner';

const profileSchema = z.object({
  name: z.string().min(3, 'Nome completo deve ter ao menos 3 caracteres'),
  email: z.string().email('Insira um e-mail válido'),
  phone: z.string().optional(),
  cpf: z.string().optional(),
  birthDate: z.string().optional(),
  occupation: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  currency: z.string().min(1, 'Moeda padrão é obrigatória'),
  dateFormat: z.string().min(1, 'Formato de data é obrigatório'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function SettingsPage() {
  const { profile, updateProfile, resetProfile } = useFinance();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: profile
  });

  // Sync form values when profile context loads
  useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);

  const onSubmit = (data: ProfileFormData) => {
    updateProfile(data);
    toast.success('Perfil atualizado com sucesso.');
  };

  const onError = () => {
    toast.error('Preencha os campos obrigatórios corretamente.');
  };

  const handleRestore = () => {
    resetProfile();
    toast.info('Dados restaurados para o padrão.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Meu Perfil</h1>
        <p className="text-slate-500 text-sm">Atualize suas informações pessoais e dados de cadastro.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Profile Card & Preferences */}
          <div className="md:col-span-1 space-y-6">
            {/* Profile Summary Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center flex flex-col items-center relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-[0.07] pointer-events-none z-0" 
                style={{ backgroundImage: "url('/background2.png')" }}
              />
              <div className="relative z-10 flex flex-col items-center w-full">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 border border-blue-100">
                  <User size={36} />
                </div>
                <h3 className="font-bold text-slate-900 text-base truncate max-w-full">{profile?.name || 'Usuário'}</h3>
                <p className="text-xs text-slate-400 truncate max-w-full mb-1">{profile?.email}</p>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider mt-2">
                  {profile?.occupation || 'Membro'}
                </span>
              </div>
            </div>

            {/* Preferences Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-[0.07] pointer-events-none z-0" 
                style={{ backgroundImage: "url('/background2.png')" }}
              />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-50">
                  <Settings size={18} className="text-slate-400" />
                  <h4 className="font-bold text-slate-900 text-sm">Preferências</h4>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Moeda Padrão</Label>
                    <Select 
                      defaultValue={profile?.currency}
                      onValueChange={(val) => setValue('currency', val)}
                    >
                      <SelectTrigger className="rounded-2xl h-11 border-slate-200 bg-slate-50/50">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        <SelectItem value="BRL">Real Brasileiro (R$)</SelectItem>
                        <SelectItem value="USD">Dólar Americano ($)</SelectItem>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.currency && (
                      <p className="text-xs text-rose-500 flex items-center gap-1 font-medium mt-1">
                        <AlertCircle size={12} /> {errors.currency.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Formato de Data</Label>
                    <Select 
                      defaultValue={profile?.dateFormat}
                      onValueChange={(val) => setValue('dateFormat', val)}
                    >
                      <SelectTrigger className="rounded-2xl h-11 border-slate-200 bg-slate-50/50">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        <SelectItem value="dd/mm/aaaa">DD/MM/AAAA</SelectItem>
                        <SelectItem value="aaaa-mm-dd">AAAA-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.dateFormat && (
                      <p className="text-xs text-rose-500 flex items-center gap-1 font-medium mt-1">
                        <AlertCircle size={12} /> {errors.dateFormat.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Personal Information Form */}
          <div className="md:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-[0.07] pointer-events-none z-0" 
              style={{ backgroundImage: "url('/background2.png')" }}
            />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-50">
                <User size={18} className="text-slate-400" />
                <h4 className="font-bold text-slate-900 text-sm">Dados Pessoais</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nome Completo *</Label>
                  <Input 
                    id="name" 
                    {...register('name')} 
                    placeholder="Seu nome completo" 
                    className="rounded-2xl h-11 border-slate-200 bg-slate-50/30" 
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-500 flex items-center gap-1 font-medium mt-1">
                      <AlertCircle size={12} /> {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider">E-mail *</Label>
                  <Input 
                    id="email" 
                    type="email"
                    {...register('email')} 
                    placeholder="seu@email.com" 
                    className="rounded-2xl h-11 border-slate-200 bg-slate-50/30" 
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-500 flex items-center gap-1 font-medium mt-1">
                      <AlertCircle size={12} /> {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Telefone</Label>
                  <Input 
                    id="phone" 
                    {...register('phone')} 
                    placeholder="(00) 00000-0000" 
                    className="rounded-2xl h-11 border-slate-200 bg-slate-50/30" 
                  />
                </div>

                {/* CPF */}
                <div className="space-y-1.5">
                  <Label htmlFor="cpf" className="text-xs font-bold text-slate-500 uppercase tracking-wider">CPF</Label>
                  <Input 
                    id="cpf" 
                    {...register('cpf')} 
                    placeholder="000.000.000-00" 
                    className="rounded-2xl h-11 border-slate-200 bg-slate-50/30" 
                  />
                </div>

                {/* Birth Date */}
                <div className="space-y-1.5">
                  <Label htmlFor="birthDate" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Data de Nascimento</Label>
                  <Input 
                    id="birthDate" 
                    type="date"
                    {...register('birthDate')} 
                    className="rounded-2xl h-11 border-slate-200 bg-slate-50/30" 
                  />
                </div>

                {/* Occupation */}
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="occupation" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Profissão</Label>
                  <Input 
                    id="occupation" 
                    {...register('occupation')} 
                    placeholder="Ex: Desenvolvedor, Administrador..." 
                    className="rounded-2xl h-11 border-slate-200 bg-slate-50/30" 
                  />
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <Label htmlFor="city" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cidade</Label>
                  <Input 
                    id="city" 
                    {...register('city')} 
                    placeholder="Sua cidade" 
                    className="rounded-2xl h-11 border-slate-200 bg-slate-50/30" 
                  />
                </div>

                {/* State */}
                <div className="space-y-1.5">
                  <Label htmlFor="state" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</Label>
                  <Input 
                    id="state" 
                    {...register('state')} 
                    placeholder="Ex: SP, RJ..." 
                    className="rounded-2xl h-11 border-slate-200 bg-slate-50/30" 
                  />
                </div>

                {/* Country */}
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="country" className="text-xs font-bold text-slate-500 uppercase tracking-wider">País</Label>
                  <Input 
                    id="country" 
                    {...register('country')} 
                    placeholder="Seu país" 
                    className="rounded-2xl h-11 border-slate-200 bg-slate-50/30" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={handleRestore}
            className="rounded-2xl h-12 px-6 gap-2 text-slate-500 hover:bg-slate-100 w-full sm:w-auto justify-center"
          >
            <RotateCcw size={16} />
            Restaurar dados padrão
          </Button>
          <Button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-2xl h-12 px-8 gap-2 text-white shadow-lg shadow-blue-100 transition-all hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto justify-center"
          >
            <Save size={16} />
            Salvar alterações
          </Button>
        </div>
      </form>
    </div>
  );
}