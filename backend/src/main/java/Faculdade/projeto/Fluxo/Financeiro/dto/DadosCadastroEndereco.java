package Faculdade.projeto.Fluxo.Financeiro.dto;


import jakarta.validation.constraints.Pattern;

public record DadosCadastroEndereco(

        String logradouro,
        String numero,
        String complemento,

        @Pattern(regexp = "\\d{8}")
        String cep,
        String cidade,
        String estado

) {
}
