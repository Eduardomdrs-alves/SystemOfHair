package fip.barbearia.repository;

import fip.barbearia.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    List<Agendamento> findByBarbeiroId(Long barbeiroId);
    List<Agendamento> findByClienteId(Long clienteId);
}
