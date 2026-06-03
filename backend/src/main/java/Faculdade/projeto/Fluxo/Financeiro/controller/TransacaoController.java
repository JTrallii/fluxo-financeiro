package Faculdade.projeto.Fluxo.Financeiro.controller;


import Faculdade.projeto.Fluxo.Financeiro.dto.DadosCadastroTransacao;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("transacao")
public class TransacaoController {

    @PostMapping
    public void cadastrar(@RequestBody DadosCadastroTransacao dados) {
        System.out.println(dados);
    }

}
