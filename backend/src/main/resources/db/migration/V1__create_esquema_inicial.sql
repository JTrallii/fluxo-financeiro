


CREATE SCHEMA IF NOT EXISTS fluxo_financeiro;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS fluxo_financeiro.usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome_completo TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    telefone TEXT,
    cpf TEXT UNIQUE,
    data_nascimento DATE,
    profissao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS fluxo_financeiro.endereco (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL UNIQUE REFERENCES fluxo_financeiro.usuarios(id) ON DELETE CASCADE,
    logradouro TEXT,
    numero TEXT,
    complemento TEXT,
    cep TEXT,
    cidade TEXT,
    estado TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fluxo_financeiro.categorias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES fluxo_financeiro.usuarios(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    tipo TEXT NOT NULL,
    cor TEXT,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_categoria_tipo CHECK (tipo IN ('RECEITA', 'DESPESA'))
    );

CREATE TABLE IF NOT EXISTS fluxo_financeiro.transacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES fluxo_financeiro.usuarios(id) ON DELETE CASCADE,
    categoria_id UUID REFERENCES fluxo_financeiro.categorias(id) ON DELETE SET NULL,
    tipo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_transacao DATE NOT NULL,
    forma_pagamento TEXT,
    status TEXT NOT NULL,
    observacao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_transacao_tipo CHECK (tipo IN ('RECEITA', 'DESPESA')),
    CONSTRAINT chk_transacao_status CHECK (status IN ('PAGO', 'PENDENTE', 'RECEBIDO')),
    CONSTRAINT chk_transacao_valor CHECK (valor > 0)
    );



CREATE INDEX IF NOT EXISTS idx_categorias_usuario_id
    ON fluxo_financeiro.categorias(usuario_id);

CREATE INDEX IF NOT EXISTS idx_transacoes_usuario_id
    ON fluxo_financeiro.transacoes(usuario_id);

CREATE INDEX IF NOT EXISTS idx_transacoes_usuario_tipo
    ON fluxo_financeiro.transacoes(usuario_id, tipo);

CREATE INDEX IF NOT EXISTS idx_transacoes_usuario_data
    ON fluxo_financeiro.transacoes(usuario_id, data_transacao);

CREATE INDEX IF NOT EXISTS idx_transacoes_usuario_categoria
    ON fluxo_financeiro.transacoes(usuario_id, categoria_id);