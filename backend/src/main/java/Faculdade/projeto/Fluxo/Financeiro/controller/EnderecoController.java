package Faculdade.projeto.Fluxo.Financeiro.controller;


import Faculdade.projeto.Fluxo.Financeiro.dto.DadosCadastroEndereco;
import Faculdade.projeto.Fluxo.Financeiro.entity.Endereco;
import Faculdade.projeto.Fluxo.Financeiro.entity.Usuario;
import Faculdade.projeto.Fluxo.Financeiro.repository.EnderecoRepository;
import Faculdade.projeto.Fluxo.Financeiro.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("endereco")
public class EnderecoController {

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/usuarios/{usuarioId}/endereco")
    public void cadastrar(
            @PathVariable UUID usuarioId,
            @RequestBody DadosCadastroEndereco dados
    ) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        enderecoRepository.save(new Endereco(dados, usuario));
    }

}

























