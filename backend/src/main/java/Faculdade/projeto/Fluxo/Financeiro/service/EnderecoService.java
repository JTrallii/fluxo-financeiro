package Faculdade.projeto.Fluxo.Financeiro.service;


import Faculdade.projeto.Fluxo.Financeiro.dto.DadosCadastroEndereco;
import Faculdade.projeto.Fluxo.Financeiro.dto.DadosListagemEndereco;
import Faculdade.projeto.Fluxo.Financeiro.entity.Endereco;
import Faculdade.projeto.Fluxo.Financeiro.entity.Usuario;
import Faculdade.projeto.Fluxo.Financeiro.repository.EnderecoRepository;
import Faculdade.projeto.Fluxo.Financeiro.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class EnderecoService {

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;


    @Transactional
    public void cadastrar(UUID usuarioId, DadosCadastroEndereco dados) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        enderecoRepository.save(new Endereco(dados, usuario));
    }

    public DadosListagemEndereco listarEndereco(UUID usuarioId) {
        var endereco = enderecoRepository.findByUsuarioId(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        return new DadosListagemEndereco(endereco);
    }

    @Transactional
    public void atualizarEndereco(UUID usuarioId, DadosCadastroEndereco dados) {
        var endereco = enderecoRepository.findByUsuarioId(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        endereco.atualizarInformacoes(dados);
    }


}

























