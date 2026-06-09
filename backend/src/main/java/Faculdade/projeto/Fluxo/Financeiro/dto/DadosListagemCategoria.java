package Faculdade.projeto.Fluxo.Financeiro.dto;

import Faculdade.projeto.Fluxo.Financeiro.entity.Categoria;
import Faculdade.projeto.Fluxo.Financeiro.enums.TipoTransacao;

import java.util.UUID;

public record DadosListagemCategoria(

        UUID id,
        String nome,
        TipoTransacao tipo,
        String cor,
        Boolean ativo

) {

    public DadosListagemCategoria(Categoria categoria) {
        this(
                categoria.getId(),
                categoria.getNome(),
                categoria.getTipo(),
                categoria.getCor(),
                categoria.getAtivo()
        );
    }

}
