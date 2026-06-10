package Faculdade.projeto.Fluxo.Financeiro.controller;



import Faculdade.projeto.Fluxo.Financeiro.dto.DadosAtualizarCategoria;
import Faculdade.projeto.Fluxo.Financeiro.dto.DadosCadastroCategoria;
import Faculdade.projeto.Fluxo.Financeiro.dto.DadosListagemCategoria;
import Faculdade.projeto.Fluxo.Financeiro.service.CategoriaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/usuarios/{usuarioId}/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;


    @PostMapping
    public void cadastrarCategoria(@PathVariable UUID usuarioId, @RequestBody @Valid DadosCadastroCategoria dados) {
        categoriaService.cadastrarCategoria(usuarioId, dados);
    }

    @GetMapping
    public Page<DadosListagemCategoria> listarCategoria(@PathVariable UUID usuarioId, @PageableDefault(size = 10) Pageable paginacao) {
        return categoriaService.listarCategoria(usuarioId, paginacao);
    }

    @GetMapping("/ativas")
    public Page<DadosListagemCategoria> listarCategoriaAtivas(@PathVariable UUID usuarioId, @PageableDefault(size = 10) Pageable paginacao) {
        return categoriaService.listarCategoriasAtivas(usuarioId, paginacao);
    }

    @GetMapping("/inativas")
    public Page<DadosListagemCategoria> listarCategoriaInativas(@PathVariable UUID usuarioId, @PageableDefault(size = 10) Pageable paginacao) {
        return categoriaService.listarCategoriasInativas(usuarioId, paginacao);
    }

    @PutMapping("/{categoriaId}")
    public void atualizarCategoria(@PathVariable UUID usuarioId, @PathVariable UUID categoriaId, @RequestBody DadosAtualizarCategoria dados) {
        categoriaService.atualizarCategoria(usuarioId, categoriaId, dados);
    }

    @DeleteMapping("/{categoriaId}")
    public void deletarCategoria(@PathVariable UUID usuarioId, @PathVariable UUID categoriaId) {
        categoriaService.deletarCategoria(usuarioId, categoriaId);
    }


}























