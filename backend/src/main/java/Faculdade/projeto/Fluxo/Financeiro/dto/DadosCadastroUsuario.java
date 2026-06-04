package Faculdade.projeto.Fluxo.Financeiro.dto;

import Faculdade.projeto.Fluxo.Financeiro.entity.Endereco;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record DadosCadastroUsuario(

        @NotBlank
        String nomeCompleto,

        @NotBlank
        @Email
        String email,

        String telefone,
        String cpf,
        LocalDate dataNascimento,
        String profissao,

        Endereco endereco

) {
}
