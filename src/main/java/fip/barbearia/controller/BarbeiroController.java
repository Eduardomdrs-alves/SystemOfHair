package fip.barbearia.controller;

import fip.barbearia.entity.*;
import fip.barbearia.repository.*;
import fip.barbearia.service.BarbeiroService;
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

    private final BarbeiroService barbeiroService = new BarbeiroService();

    @PostMapping
    public Barbeiro criarBarbeiro(@RequestBody Barbeiro b) {
        return barbeiroService.saveBarbeiro(b);
    }

    @GetMapping
    public List<Barbeiro> listar() {
        return barbeiroService.getAllBarbeiro();
    }

    @GetMapping("/{id}")
    public Optional<Barbeiro> obter(@PathVariable Long id) {
        return Optional.ofNullable(barbeiroService.getBarbeiroById(id));
    }
}
