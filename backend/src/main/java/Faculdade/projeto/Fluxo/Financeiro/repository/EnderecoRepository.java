package Faculdade.projeto.Fluxo.Financeiro.repository;

import Faculdade.projeto.Fluxo.Financeiro.entity.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EnderecoRepository extends JpaRepository<Endereco, UUID> {
}
