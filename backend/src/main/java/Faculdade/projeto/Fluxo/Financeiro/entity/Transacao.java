package Faculdade.projeto.Fluxo.Financeiro.entity;

import Faculdade.projeto.Fluxo.Financeiro.dto.DadosCadastroTransacao;
import Faculdade.projeto.Fluxo.Financeiro.enums.StatusTransacao;
import Faculdade.projeto.Fluxo.Financeiro.enums.TipoTransacao;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity(name = "Transacao")
@Table(name = "transacoes", schema = "fluxo_financeiro")
public class Transacao {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private UUID usuarioId;
    private UUID categoriaId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoTransacao tipo;
    private String descricao;
    private BigDecimal valor;
    private LocalDate dataTransacao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusTransacao status;
    private String observacao;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Transacao() {}

    public Transacao(UUID id, UUID usuarioId, UUID categoriaId, TipoTransacao tipo, String descricao, BigDecimal valor, LocalDate dataTransacao, StatusTransacao status, String observacao) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.categoriaId = categoriaId;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
        this.dataTransacao = dataTransacao;
        this.status = status;
        this.observacao = observacao;
    }

    public Transacao(DadosCadastroTransacao dados) {
        this.usuarioId = dados.usuarioId();
        this.categoriaId = dados.categoriaId();
        this.tipo = dados.tipo();
        this.descricao = dados.descricao();
        this.valor = dados.valor();
        this.dataTransacao = dados.dataTransacao();
        this.status = dados.status();
        this.observacao = dados.observacao();
    }



    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(UUID usuarioId) {
        this.usuarioId = usuarioId;
    }

    public UUID getCategoriaId() {
        return categoriaId;
    }

    public void setCategoriaId(UUID categoriaId) {
        this.categoriaId = categoriaId;
    }

    public TipoTransacao getTipo() {
        return tipo;
    }

    public void setTipo(TipoTransacao tipo) {
        this.tipo = tipo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public LocalDate getDataTransacao() {
        return dataTransacao;
    }

    public void setDataTransacao(LocalDate dataTransacao) {
        this.dataTransacao = dataTransacao;
    }

    public StatusTransacao getStatus() {
        return status;
    }

    public void setStatus(StatusTransacao status) {
        this.status = status;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    @Override
    public String toString() {
        return "Trasacao: " +
                "id =" + id +
                ", usuarioId =" + usuarioId +
                ", categoriaId =" + categoriaId +
                ", tipo ='" + tipo + '\'' +
                ", descricao ='" + descricao + '\'' +
                ", valor =" + valor +
                ", dataTransacao =" + dataTransacao +
                ", status =" + status +
                ", observacao ='" + observacao + '\'';
    }
}
