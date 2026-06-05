package Faculdade.projeto.Fluxo.Financeiro.dto;

import Faculdade.projeto.Fluxo.Financeiro.entity.Usuario;

import java.time.LocalDate;
import java.util.UUID;

public record DadosListagemUsuario(

        UUID id,
        String nomeCompleto,
        String email,
        String telefone,
        String cpf,
        LocalDate dataNascimento,
        String profissao

) {

    public DadosListagemUsuario(Usuario usuario) {
        this(usuario.getId(),
                usuario.getNomeCompleto(),
                usuario.getEmail(),
                usuario.getTelefone(),
                usuario.getCpf(),
                usuario.getDataNascimento(),
                usuario.getProfissao());
    }
}
