package Faculdade.projeto.Fluxo.Financeiro.service;


import Faculdade.projeto.Fluxo.Financeiro.dto.DadosAtualizarUsuario;
import Faculdade.projeto.Fluxo.Financeiro.dto.DadosCadastroUsuario;
import Faculdade.projeto.Fluxo.Financeiro.dto.DadosListagemUsuario;
import Faculdade.projeto.Fluxo.Financeiro.entity.Usuario;
import Faculdade.projeto.Fluxo.Financeiro.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public void cadastrar(DadosCadastroUsuario dados) {
        usuarioRepository.save(new Usuario(dados));
    }

    public Page<DadosListagemUsuario> listarTodosUsuarios(Pageable paginacao) {
        return usuarioRepository
                .findAll(paginacao)
                .map(DadosListagemUsuario::new);
    }

    public DadosListagemUsuario listarUsuario(UUID id) {
        var usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return new DadosListagemUsuario(usuario);
    }

    public Page<DadosListagemUsuario> listarTodosUsuariosAtivos(Pageable paginacao) {
        return usuarioRepository
                .findAllByAtivoTrue(paginacao)
                .map(DadosListagemUsuario::new);
    }

    public Page<DadosListagemUsuario> listarTodosUsuariosInativos(Pageable paginacao) {
        return usuarioRepository
                .findAllByAtivoFalse(paginacao)
                .map(DadosListagemUsuario::new);
    }

    @Transactional
    public void atualizarUsuario(UUID id, DadosAtualizarUsuario dados) {
        var usuario = usuarioRepository.getReferenceById(id);
        usuario.atualizarInformacoes(dados);
    }

    @Transactional
    public void excluirUsuario(UUID id) {
        var usuario = usuarioRepository.getReferenceById(id);
        usuario.deletarUsuario();
    }

}
























