package Faculdade.projeto.Fluxo.Financeiro.repository;

import Faculdade.projeto.Fluxo.Financeiro.entity.Categoria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CategoriaRepository extends JpaRepository<Categoria, UUID> {
    Page<Categoria> findAllByUsuario_Id(UUID usuarioId, Pageable paginacao);

    Page<Categoria> findAllByUsuario_IdAndAtivoTrue(UUID usuarioId, Pageable paginacao);

    Page<Categoria> findAllByUsuario_IdAndAtivoFalse(UUID usuarioId, Pageable paginacao);

    Optional<Categoria> findByIdAndUsuario_Id(UUID categoriaId, UUID usuarioId);
}
