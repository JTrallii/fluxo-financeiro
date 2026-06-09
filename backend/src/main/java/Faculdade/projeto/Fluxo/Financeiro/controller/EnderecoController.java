package Faculdade.projeto.Fluxo.Financeiro.controller;


import Faculdade.projeto.Fluxo.Financeiro.dto.DadosCadastroEndereco;
import Faculdade.projeto.Fluxo.Financeiro.dto.DadosListagemEndereco;
import Faculdade.projeto.Fluxo.Financeiro.service.EnderecoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/usuarios/{usuarioId}/endereco")
public class EnderecoController {

    @Autowired
    private EnderecoService enderecoService;

    @PostMapping
    public void cadastrar(@PathVariable UUID usuarioId, @RequestBody @Valid DadosCadastroEndereco dados) {
        enderecoService.cadastrar(usuarioId, dados);
    }

    @GetMapping
    public DadosListagemEndereco listarEndereco(@PathVariable UUID usuarioId) {
        return enderecoService.listarEndereco(usuarioId);
    }

    @PutMapping
    public void atualizarEndereco(@PathVariable UUID usuarioId, @RequestBody @Valid DadosCadastroEndereco dados) {
        enderecoService.atualizarEndereco(usuarioId, dados);
    }

}

























