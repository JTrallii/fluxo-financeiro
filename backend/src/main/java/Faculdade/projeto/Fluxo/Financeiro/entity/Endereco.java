package Faculdade.projeto.Fluxo.Financeiro.entity;


import Faculdade.projeto.Fluxo.Financeiro.dto.DadosCadastroEndereco;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "endereco", schema = "fluxo_financeiro")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "usuario_id", nullable = false, unique = true)
    private Usuario usuario;
    private String logradouro;
    private String numero;
    private String complemento;
    private String cep;
    private String cidade;
    private String estado;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Endereco(DadosCadastroEndereco dados, Usuario usuario) {
        this.usuario = usuario;
        this.logradouro = dados.logradouro();
        this.numero = dados.numero();
        this.complemento = dados.complemento();
        this.cep = dados.cep();
        this.cidade = dados.cidade();
        this.estado = dados.estado();
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

    public void atualizarInformacoes(@Valid DadosCadastroEndereco dados) {
        if (dados.logradouro() != null) {
            this.logradouro = dados.logradouro();
        }

        if (dados.numero() != null) {
            this.numero = dados.numero();
        }

        if (dados.complemento() != null) {
            this.complemento = dados.complemento();
        }

        if (dados.cep() != null) {
            this.cep = dados.cep();
        }

        if (dados.cidade() != null) {
            this.cidade = dados.cidade();
        }

        if (dados.estado() != null) {
            this.estado = dados.estado();
        }


    }
}

























