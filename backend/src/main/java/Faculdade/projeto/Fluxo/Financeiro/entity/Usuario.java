package Faculdade.projeto.Fluxo.Financeiro.entity;


import Faculdade.projeto.Fluxo.Financeiro.dto.DadosAtualizarUsuario;
import Faculdade.projeto.Fluxo.Financeiro.dto.DadosCadastroUsuario;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity(name = "Usuario")
@Table(name = "usuarios", schema = "fluxo_financeiro")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String nomeCompleto;
    private String email;
    private String telefone;
    private String cpf;
    private LocalDate dataNascimento;
    private String profissao;

    @Column(nullable = false)
    private Boolean ativo = true;

    @OneToMany(mappedBy = "usuario")
    private List<Categoria> categorias;

    @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private Endereco endereco;

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

    public Usuario(DadosCadastroUsuario dados) {
        this.ativo = true;
        this.nomeCompleto = dados.nomeCompleto();
        this.email = dados.email();
        this.telefone = dados.telefone();
        this.cpf = dados.cpf();
        this.dataNascimento = dados.dataNascimento();
        this.profissao = dados.profissao();
    }

    public void atualizarInformacoes(@Valid DadosAtualizarUsuario dados) {
        if (dados.nomeCompleto() != null) {
            this.nomeCompleto = dados.nomeCompleto();
        }

        if (dados.telefone() != null) {
            this.telefone = dados.telefone();
        }

        if (dados.profissao() != null) {
            this.profissao = dados.profissao();
        }

        if (dados.endereco() != null) {
            this.endereco.atualizarInformacoes(dados.endereco());
        }
    }

    public void deletarUsuario() {
        this.ativo = false;
    }
}



























