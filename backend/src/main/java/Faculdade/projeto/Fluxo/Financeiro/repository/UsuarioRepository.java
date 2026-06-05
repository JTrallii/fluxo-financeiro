package Faculdade.projeto.Fluxo.Financeiro.repository;

import Faculdade.projeto.Fluxo.Financeiro.entity.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UsuarioRepository extends JpaRepository<Usuario, UUID> {
    Page<Usuario> findAllByAtivoTrue(Pageable paginacao);

    Page<Usuario> findAllByAtivoFalse(Pageable paginacao);
}
