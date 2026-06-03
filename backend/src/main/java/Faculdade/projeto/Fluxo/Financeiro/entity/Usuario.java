package Faculdade.projeto.Fluxo.Financeiro.entity;


import jakarta.persistence.*;
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

    @OneToMany(mappedBy = "usuario")
    private List<Categoria> categorias;

    @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private Endereco endereco;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}
