
package com.salafacil.controller;

import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.salafacil.model.Reserva;
import com.salafacil.repository.ReservaRepository;
import com.salafacil.service.ReservaService;

@RestController
@RequestMapping("/reservas")
public class ReservaController {

    private final ReservaRepository repo;
    private final ReservaService service;

    public ReservaController(ReservaRepository repo, ReservaService service) {
        this.repo = repo;
        this.service = service;
    }

    @PostMapping
    public Reserva criar(@RequestBody Reserva r) {
        return service.criarReserva(r);
    }

    @GetMapping
    public List<Reserva> listar() {
        return repo.findAll();
    }

    // Endpoint para verificar disponibilidade
    @GetMapping("/disponivel")
    public boolean disponivel(@RequestParam Long salaId,
                              @RequestParam String inicio,
                              @RequestParam String fim) {
        java.time.LocalDateTime i = java.time.LocalDateTime.parse(inicio);
        java.time.LocalDateTime f = java.time.LocalDateTime.parse(fim);
        return service.salaDisponivel(salaId, i, f);
    }
}
