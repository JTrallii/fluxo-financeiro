package Faculdade.projeto.Fluxo.Financeiro.entity;


import Faculdade.projeto.Fluxo.Financeiro.dto.DadosAtualizarTransacao;
import Faculdade.projeto.Fluxo.Financeiro.dto.DadosCadastroTransacao;
import Faculdade.projeto.Fluxo.Financeiro.enums.StatusTransacao;
import Faculdade.projeto.Fluxo.Financeiro.enums.TipoTransacao;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity(name = "Transacao")
@Table(name = "transacoes", schema = "fluxo_financeiro")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Transacao {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoTransacao tipo;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private BigDecimal valor;

    @Column(name = "data_transacao", nullable = false)
    private LocalDate dataTransacao;

    @Column(name = "forma_pagamento")
    private String formaPagamento;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusTransacao status;

    private String observacao;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Transacao(Usuario usuario, DadosCadastroTransacao dados) {
    }


    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }


    public Transacao(Usuario usuario, Categoria categoria, DadosCadastroTransacao dados) {
        this.usuario = usuario;
        this.categoria = categoria;
        this.tipo = dados.tipo();
        this.descricao = dados.descricao();
        this.valor = dados.valor();
        this.dataTransacao = dados.dataTransacao();
        this.formaPagamento = dados.formaPagamento();
        this.status = dados.status();
        this.observacao = dados.observacao();
    }


    public void atualizarInformacoes(DadosAtualizarTransacao dados, Categoria categoria) {
        if (categoria != null) {
            this.categoria = categoria;
        }

        if (dados.tipo() != null) {
            this.tipo = dados.tipo();
        }

        if (dados.descricao() != null) {
            this.descricao = dados.descricao();
        }

        if (dados.valor() != null) {
            this.valor = dados.valor();
        }

        if (dados.dataTransacao() != null) {
            this.dataTransacao = dados.dataTransacao();
        }

        if (dados.formaPagamento() != null) {
            this.formaPagamento = dados.formaPagamento();
        }

        if (dados.status() != null) {
            this.status = dados.status();
        }

        if (dados.observacao() != null) {
            this.observacao = dados.observacao();
        }
    }
}































