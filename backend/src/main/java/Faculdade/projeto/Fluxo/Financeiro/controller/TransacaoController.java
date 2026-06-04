package Faculdade.projeto.Fluxo.Financeiro.controller;


import Faculdade.projeto.Fluxo.Financeiro.dto.DadosCadastroTransacao;
import Faculdade.projeto.Fluxo.Financeiro.entity.Transacao;
import Faculdade.projeto.Fluxo.Financeiro.repository.TransacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("transacao")
public class TransacaoController {

    @Autowired
    private TransacaoRepository transacaoRepository;

    @PostMapping
    public void cadastrar(@RequestBody DadosCadastroTransacao dados) {
        transacaoRepository.save(new Transacao(dados));
    }

}
