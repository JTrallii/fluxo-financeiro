package Faculdade.projeto.Fluxo.Financeiro.controller;



import Faculdade.projeto.Fluxo.Financeiro.dto.DadosAtualizarUsuario;
import Faculdade.projeto.Fluxo.Financeiro.dto.DadosCadastroUsuario;
import Faculdade.projeto.Fluxo.Financeiro.dto.DadosListagemUsuario;
import Faculdade.projeto.Fluxo.Financeiro.entity.Usuario;
import Faculdade.projeto.Fluxo.Financeiro.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("usuarios")
public class UsuarioController {


    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping
    @Transactional
    public void cadastrar(@RequestBody @Valid DadosCadastroUsuario dados) {
        usuarioRepository.save(new Usuario(dados));
    }

    //Precisa ser feito o map por que o findAll retorna uma entidade e precisamos que retorne o DTO
    @GetMapping
    public Page<DadosListagemUsuario> listarTodosUsuarios(@PageableDefault(size = 10) Pageable paginacao) {
        return usuarioRepository
                .findAll(paginacao)
                .map(DadosListagemUsuario::new);
    }

    @GetMapping("/{id}")
    public DadosListagemUsuario listarUsuario(@PathVariable UUID id) {
        var usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return new DadosListagemUsuario(usuario);
    }

    @GetMapping("/ativos")
    public Page<DadosListagemUsuario> listarTodosUsuariosAtivos(@PageableDefault(size = 10) Pageable paginacao) {
        return usuarioRepository
                .findAllByAtivoTrue(paginacao)
                .map(DadosListagemUsuario::new);
    }

    @GetMapping("/inativos")
    public Page<DadosListagemUsuario> listarTodosUsuariosInativos(@PageableDefault(size = 10) Pageable paginacao) {
        return usuarioRepository
                .findAllByAtivoFalse(paginacao)
                .map(DadosListagemUsuario::new);
    }

    @PutMapping("/{id}")
    @Transactional
    public void atualizarUsuario(@PathVariable UUID id, @RequestBody @Valid DadosAtualizarUsuario dados) {
        var usuario = usuarioRepository.getReferenceById(id);
        usuario.atualizarInformacoes(dados);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public void excluirUsuario(@PathVariable UUID id) {
        var usuario = usuarioRepository.getReferenceById(id);
        usuario.deletarUsuario();
    }
}




























