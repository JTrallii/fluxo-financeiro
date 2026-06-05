package Faculdade.projeto.Fluxo.Financeiro.controller;

import Faculdade.projeto.Fluxo.Financeiro.dto.DadosAtualizarUsuario;
import Faculdade.projeto.Fluxo.Financeiro.dto.DadosCadastroUsuario;
import Faculdade.projeto.Fluxo.Financeiro.dto.DadosListagemUsuario;
import Faculdade.projeto.Fluxo.Financeiro.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;


    @PostMapping
    public void cadastrar(@RequestBody @Valid DadosCadastroUsuario dados) {
        usuarioService.cadastrar(dados);
    }

    //Precisa ser feito o map por que o findAll retorna uma entidade e precisamos que retorne o DTO
    @GetMapping
    public Page<DadosListagemUsuario> listarTodosUsuarios(@PageableDefault(size = 10) Pageable paginacao) {
        return usuarioService.listarTodosUsuarios(paginacao);
    }

    @GetMapping("/{id}")
    public DadosListagemUsuario listarUsuario(@PathVariable UUID id) {
        return usuarioService.listarUsuario(id);
    }

    @GetMapping("/ativos")
    public Page<DadosListagemUsuario> listarTodosUsuariosAtivos(@PageableDefault(size = 10) Pageable paginacao) {
        return usuarioService.listarTodosUsuariosAtivos(paginacao);
    }

    @GetMapping("/inativos")
    public Page<DadosListagemUsuario> listarTodosUsuariosInativos(@PageableDefault(size = 10) Pageable paginacao) {
        return usuarioService.listarTodosUsuariosInativos(paginacao);
    }

    @PutMapping("/{id}")
    public void atualizarUsuario(@PathVariable UUID id, @RequestBody @Valid DadosAtualizarUsuario dados) {
        usuarioService.atualizarUsuario(id, dados);
    }

    @DeleteMapping("/{id}")
    public void excluirUsuario(@PathVariable UUID id) {
        usuarioService.excluirUsuario(id);
    }
}




























