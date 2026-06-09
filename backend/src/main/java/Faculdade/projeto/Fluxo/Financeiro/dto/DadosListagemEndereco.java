package Faculdade.projeto.Fluxo.Financeiro.dto;

import Faculdade.projeto.Fluxo.Financeiro.entity.Endereco;
import jakarta.validation.constraints.Pattern;

import java.util.UUID;

public record DadosListagemEndereco(

        UUID id,
        String logradouro,
        String numero,
        String complemento,
        String cep,
        String cidade,
        String estado

) {

    public DadosListagemEndereco(Endereco endereco) {
        this(
                endereco.getId(),
                endereco.getLogradouro(),
                endereco.getNumero(),
                endereco.getComplemento(),
                endereco.getCep(),
                endereco.getCidade(),
                endereco.getEstado()
        );
    }
}
