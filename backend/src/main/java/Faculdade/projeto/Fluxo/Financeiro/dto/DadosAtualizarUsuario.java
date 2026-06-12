package Faculdade.projeto.Fluxo.Financeiro.dto;


import jakarta.validation.Valid;
import java.util.UUID;

public record DadosAtualizarUsuario(

        UUID id,
        String nomeCompleto,

        String telefone,
        String profissao,

        @Valid
        DadosCadastroEndereco endereco

) {
}
