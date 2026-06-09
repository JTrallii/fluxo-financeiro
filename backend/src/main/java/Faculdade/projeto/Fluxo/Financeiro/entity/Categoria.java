package Faculdade.projeto.Fluxo.Financeiro.entity;


import Faculdade.projeto.Fluxo.Financeiro.dto.DadosAtualizarCategoria;
import Faculdade.projeto.Fluxo.Financeiro.dto.DadosCadastroCategoria;
import Faculdade.projeto.Fluxo.Financeiro.enums.TipoTransacao;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity(name = "Categoria")
@Table(name = "categorias", schema = "fluxo_financeiro")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoTransacao tipo;

    private String cor;

    private Boolean ativo = true;

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

    public Categoria(Usuario usuario, DadosCadastroCategoria dados ) {
        this.usuario = usuario;
        this.nome = dados.nome();
        this.tipo = dados.tipo();
        this.cor = dados.cor();
        this.ativo = true;
    }


    public void deletarCategoria() {
        this.ativo = false;
    }


    public void atualizarInformacoes(DadosAtualizarCategoria dados) {
        if (dados.nome() != null) {
            this.nome = dados.nome();
        }

        if (dados.tipo() != null) {
            this.tipo = dados.tipo();
        }

        if (dados.cor() != null) {
            this.cor = dados.cor();
        }
    }
}





























