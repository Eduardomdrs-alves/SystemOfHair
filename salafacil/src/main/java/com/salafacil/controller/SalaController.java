
package com.salafacil.controller;

import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.salafacil.model.Sala;
import com.salafacil.repository.SalaRepository;

@RestController
@RequestMapping("/salas")
public class SalaController {

    private final SalaRepository repo;

    public SalaController(SalaRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public Sala criar(@RequestBody Sala s) {
        return repo.save(s);
    }

    @GetMapping
    public List<Sala> listar() {
        return repo.findAll();
    }
}
