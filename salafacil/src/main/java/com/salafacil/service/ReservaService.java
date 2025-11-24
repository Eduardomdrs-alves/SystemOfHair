
package com.salafacil.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.salafacil.model.Reserva;
import com.salafacil.repository.ReservaRepository;

@Service
public class ReservaService {

    private final ReservaRepository repo;

    public ReservaService(ReservaRepository repo) {
        this.repo = repo;
    }

    // Verifica se existe conflito de horário
    public boolean salaDisponivel(Long salaId, java.time.LocalDateTime inicio, java.time.LocalDateTime fim) {
        List<Reserva> conflitos = repo.findBySalaIdAndInicioLessThanEqualAndFimGreaterThanEqual(
                salaId, fim, inicio
        );
        return conflitos.isEmpty();
    }

    // Criação com verificação
    public Reserva criarReserva(Reserva r) {
        if (!salaDisponivel(r.getSala().getId(), r.getInicio(), r.getFim())) {
            throw new RuntimeException("Sala indisponível para este horário.");
        }
        return repo.save(r);
    }
}
