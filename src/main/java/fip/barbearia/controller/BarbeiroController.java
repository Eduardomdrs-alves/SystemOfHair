package fip.barbearia.controller;

import fip.barbearia.entity.*;
import fip.barbearia.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/*
 * Endpoints para Barbeiro.
 * - POST /api/barbeiros
 * - GET /api/barbeiros
 * - GET /api/barbeiros/{id}
 */
@RestController
@RequestMapping("/api/barbeiros")
public class BarbeiroController {

    @Autowired
    private BarbeiroRepository repo;

    @PostMapping
    public Barbeiro criarBarbeiro(@RequestBody Barbeiro b){ return repo.save(b); }

    @GetMapping
    public List<Barbeiro> listar(){ return repo.findAll(); }

    @GetMapping("/{id}")
    public Optional<Barbeiro> obter(@PathVariable Long id){ return repo.findById(id); }
}
