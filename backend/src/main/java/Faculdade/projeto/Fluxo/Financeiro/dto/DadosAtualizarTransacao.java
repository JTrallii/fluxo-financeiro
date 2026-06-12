package Faculdade.projeto.Fluxo.Financeiro.dto;

import Faculdade.projeto.Fluxo.Financeiro.enums.StatusTransacao;
import Faculdade.projeto.Fluxo.Financeiro.enums.TipoTransacao;
import jakarta.validation.constraints.DecimalMin;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record DadosAtualizarTransacao(

        UUID categoriaId,

        TipoTransacao tipo,

        String descricao,

        @DecimalMin(value = "0.01")
        BigDecimal valor,

        LocalDate dataTransacao,

        String formaPagamento,

        StatusTransacao status,

        String observacao

) {
}
