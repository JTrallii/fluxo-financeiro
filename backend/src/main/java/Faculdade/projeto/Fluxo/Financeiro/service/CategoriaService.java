package Faculdade.projeto.Fluxo.Financeiro.service;


import Faculdade.projeto.Fluxo.Financeiro.dto.DadosAtualizarCategoria;
import Faculdade.projeto.Fluxo.Financeiro.dto.DadosCadastroCategoria;
import Faculdade.projeto.Fluxo.Financeiro.dto.DadosListagemCategoria;
import Faculdade.projeto.Fluxo.Financeiro.entity.Categoria;
import Faculdade.projeto.Fluxo.Financeiro.entity.Usuario;
import Faculdade.projeto.Fluxo.Financeiro.repository.CategoriaRepository;
import Faculdade.projeto.Fluxo.Financeiro.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.UUID;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;


    @Transactional
    public void cadastrarCategoria(UUID usuarioId, DadosCadastroCategoria dados) {
        var usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        categoriaRepository.save(new Categoria(usuario, dados));
    }

    public Page<DadosListagemCategoria> listarCategoria(UUID usuarioId, Pageable paginacao) {
        buscarUsuarioAtivo(usuarioId);

        return categoriaRepository
                .findAllByUsuario_Id(usuarioId, paginacao)
                .map(DadosListagemCategoria::new);
    }

    public Page<DadosListagemCategoria> listarCategoriasAtivas(UUID usuarioId, Pageable paginacao) {
        buscarUsuarioAtivo(usuarioId);

        return categoriaRepository
                .findAllByUsuario_IdAndAtivoTrue(usuarioId, paginacao)
                .map(DadosListagemCategoria::new);
    }

    public Page<DadosListagemCategoria> listarCategoriasInativas(UUID usuarioId, Pageable paginacao) {
        buscarUsuarioAtivo(usuarioId);

        return categoriaRepository
                .findAllByUsuario_IdAndAtivoFalse(usuarioId, paginacao)
                .map(DadosListagemCategoria::new);
    }

    @Transactional
    public void atualizarCategoria(UUID usuarioId, UUID categoriaId, DadosAtualizarCategoria dados) {
        buscarUsuarioAtivo(usuarioId);

        var categoria = categoriaRepository.findByIdAndUsuario_Id(categoriaId, usuarioId)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada para este usuário"));

        categoria.atualizarInformacoes(dados);
    }

    @Transactional
    public void deletarCategoria(UUID usuarioId, UUID categoriaId) {
        buscarUsuarioAtivo(usuarioId);

        var categoria = categoriaRepository.findByIdAndUsuario_Id(categoriaId, usuarioId)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada para este usuário"));

        categoria.deletarCategoria();
    }





    private Usuario buscarUsuarioAtivo(UUID usuarioId) {
        var usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!usuario.getAtivo()) {
            throw new RuntimeException("Usuário inativo");
        }

        return usuario;
    }


}

























