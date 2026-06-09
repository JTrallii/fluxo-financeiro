package Faculdade.projeto.Fluxo.Financeiro.dto;

import Faculdade.projeto.Fluxo.Financeiro.enums.TipoTransacao;

public record DadosAtualizarCategoria(

        String nome,
        TipoTransacao tipo,
        String cor

) {
}
