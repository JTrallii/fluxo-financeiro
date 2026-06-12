package Faculdade.projeto.Fluxo.Financeiro.dto;

import Faculdade.projeto.Fluxo.Financeiro.entity.Categoria;
import Faculdade.projeto.Fluxo.Financeiro.entity.Transacao;
import Faculdade.projeto.Fluxo.Financeiro.enums.StatusTransacao;
import Faculdade.projeto.Fluxo.Financeiro.enums.TipoTransacao;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record DadosListagemTransacao(

        UUID id,
        UUID usuarioId,
        UUID categoriaId,
        String nome,
        TipoTransacao tipo,
        String descricao,
        BigDecimal valor,
        LocalDate dataTransacao,
        String formaPagamento,
        StatusTransacao status,
        String observacao


) {


    public DadosListagemTransacao(Transacao transacao) {
        this(
                transacao.getId(),
                transacao.getUsuario().getId(),
                transacao.getCategoria().getId(),
                transacao.getCategoria().getNome(),
                transacao.getTipo(),
                transacao.getDescricao(),
                transacao.getValor(),
                transacao.getDataTransacao(),
                transacao.getFormaPagamento(),
                transacao.getStatus(),
                transacao.getObservacao()
        );
    }
}
