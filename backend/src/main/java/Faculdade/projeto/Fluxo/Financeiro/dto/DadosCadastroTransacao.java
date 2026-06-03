package Faculdade.projeto.Fluxo.Financeiro.dto;

import Faculdade.projeto.Fluxo.Financeiro.enums.StatusTransacao;
import Faculdade.projeto.Fluxo.Financeiro.enums.TipoTransacao;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record DadosCadastroTransacao(
        @NotNull
        UUID usuarioId,

        UUID categoriaId,

        @NotNull
        TipoTransacao tipo,

        @NotBlank
        String descricao,

        @NotNull
        @DecimalMin(value = "0.01")
        BigDecimal valor,

        @NotNull
        LocalDate dataTransacao,

        String formaPagamento,

        @NotNull
        StatusTransacao status,

        String observacao
) {
}

