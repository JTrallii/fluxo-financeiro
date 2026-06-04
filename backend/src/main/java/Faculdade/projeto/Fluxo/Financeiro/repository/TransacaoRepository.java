package Faculdade.projeto.Fluxo.Financeiro.repository;

import Faculdade.projeto.Fluxo.Financeiro.entity.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TransacaoRepository extends JpaRepository<Transacao, UUID> {
}
