package Faculdade.projeto.Fluxo.Financeiro.service;


import Faculdade.projeto.Fluxo.Financeiro.dto.DadosAtualizarTransacao;
import Faculdade.projeto.Fluxo.Financeiro.dto.DadosCadastroTransacao;
import Faculdade.projeto.Fluxo.Financeiro.dto.DadosListagemTransacao;
import Faculdade.projeto.Fluxo.Financeiro.entity.Categoria;
import Faculdade.projeto.Fluxo.Financeiro.entity.Transacao;
import Faculdade.projeto.Fluxo.Financeiro.entity.Usuario;
import Faculdade.projeto.Fluxo.Financeiro.enums.StatusTransacao;
import Faculdade.projeto.Fluxo.Financeiro.enums.TipoTransacao;
import Faculdade.projeto.Fluxo.Financeiro.repository.CategoriaRepository;
import Faculdade.projeto.Fluxo.Financeiro.repository.TransacaoRepository;
import Faculdade.projeto.Fluxo.Financeiro.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TransacaoService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TransacaoRepository transacaoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;


    @Transactional
    public void cadastrar(UUID usuarioId, DadosCadastroTransacao dados) {
        var usuario = buscarUsuarioAtivo(usuarioId);

        var categoria = buscarCategoriaAtiva(usuarioId, dados.categoriaId());

        var transacao = new Transacao(usuario, categoria, dados);

        transacaoRepository.save(transacao);
    }

    public Page<DadosListagemTransacao> listarTransacao(UUID usuarioId, Pageable paginacao) {
        buscarUsuarioAtivo(usuarioId);

        return transacaoRepository
                .findAllByUsuario_Id(usuarioId, paginacao)
                .map(DadosListagemTransacao::new);
    }

    public DadosListagemTransacao listarTransacaoPorId(UUID usuarioId, UUID transacaoId) {
        buscarUsuarioAtivo(usuarioId);

        var transacao = transacaoRepository.findByIdAndUsuario_Id(transacaoId, usuarioId)
                .orElseThrow(() -> new RuntimeException("Transação não encontrada para esse usuário "));

        return new DadosListagemTransacao(transacao);
    }

    public Page<DadosListagemTransacao> listarTransacaoPorTipo(UUID usuarioId, TipoTransacao tipo, Pageable paginacao) {
        buscarUsuarioAtivo(usuarioId);

        return transacaoRepository
                .findAllByUsuario_IdAndTipo(usuarioId, tipo, paginacao)
                .map(DadosListagemTransacao::new);
    }

    public Page<DadosListagemTransacao> listarTransacaoPorStatus(UUID usuarioId, StatusTransacao status, Pageable paginacao) {
        buscarUsuarioAtivo(usuarioId);

        return transacaoRepository
                .findAllByUsuario_IdAndStatus(usuarioId, status, paginacao)
                .map(DadosListagemTransacao::new);
    }

    @Transactional
    public void atualizar(UUID usuarioId, UUID transacaoId, DadosAtualizarTransacao dados) {
        buscarUsuarioAtivo(usuarioId);

        var transacao = transacaoRepository.findByIdAndUsuario_Id(transacaoId, usuarioId)
                .orElseThrow(() -> new RuntimeException("Transação não encontrada para este usuário"));

        Categoria categoria = null;

        if (dados.categoriaId() != null) {
            categoria = buscarCategoriaAtiva(usuarioId, dados.categoriaId());
        }

        transacao.atualizarInformacoes(dados, categoria);
    }

    @Transactional
    public void excluir(UUID usuarioId, UUID transacaoId) {
        buscarUsuarioAtivo(usuarioId);

        var transacao = transacaoRepository.findByIdAndUsuario_Id(transacaoId, usuarioId)
                .orElseThrow(() -> new RuntimeException("Transação não encontrada para este usuário"));

        transacaoRepository.delete(transacao);
    }





    private Usuario buscarUsuarioAtivo(UUID usuarioId) {
        var usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!usuario.getAtivo()) {
            throw new RuntimeException("Usuário inativo");
        }

        return usuario;
    }


    private Categoria buscarCategoriaAtiva(UUID usuarioId, UUID categoriaId) {
        var categoria = categoriaRepository.findByIdAndUsuario_Id(categoriaId, usuarioId)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada para este usuário"));

        if (!categoria.getAtivo()) {
            throw new RuntimeException("Categoria inativa");
        }

        return categoria;
    }




}
