package Faculdade.projeto.Fluxo.Financeiro.controller;



import Faculdade.projeto.Fluxo.Financeiro.dto.DadosCadastroUsuario;
import Faculdade.projeto.Fluxo.Financeiro.entity.Usuario;
import Faculdade.projeto.Fluxo.Financeiro.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("usuario")
public class UsuarioController {


    @Autowired
    private UsuarioRepository usuarioRepository;

    public void cadastrar(@RequestBody DadosCadastroUsuario dados) {
        usuarioRepository.save(new Usuario(dados));
    }
}
