package Faculdade.projeto.Fluxo.Financeiro.repository;

import Faculdade.projeto.Fluxo.Financeiro.entity.Transacao;
import Faculdade.projeto.Fluxo.Financeiro.enums.StatusTransacao;
import Faculdade.projeto.Fluxo.Financeiro.enums.TipoTransacao;
import io.micrometer.observation.ObservationFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TransacaoRepository extends JpaRepository<Transacao, UUID> {

    Page<Transacao> findAllByUsuario_Id(UUID usuarioId, Pageable paginacao);

    Page<Transacao> findAllByUsuario_IdAndTipo(UUID usuarioId, TipoTransacao tipo, Pageable paginacao);

    Page<Transacao> findAllByUsuario_IdAndStatus(UUID usuarioId, StatusTransacao status, Pageable paginacao);

    Optional<Transacao> findByIdAndUsuario_Id(UUID transacaoId, UUID usuarioId);
}
