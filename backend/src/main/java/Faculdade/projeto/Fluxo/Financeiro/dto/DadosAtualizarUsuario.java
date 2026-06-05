package Faculdade.projeto.Fluxo.Financeiro.dto;

import Faculdade.projeto.Fluxo.Financeiro.entity.Endereco;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;

public record DadosAtualizarUsuario(

        @NotNull
        UUID id,
        @NotBlank
        String nomeCompleto,

        String telefone,
        String profissao,

        @Valid
        DadosCadastroEndereco endereco

) {
}
