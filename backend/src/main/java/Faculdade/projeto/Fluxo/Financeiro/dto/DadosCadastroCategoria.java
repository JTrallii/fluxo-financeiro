package Faculdade.projeto.Fluxo.Financeiro.dto;

import Faculdade.projeto.Fluxo.Financeiro.enums.TipoTransacao;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroCategoria(

        @NotBlank
        String nome,

        @NotNull
        TipoTransacao tipo,

        @NotBlank
        String cor


) {
}
