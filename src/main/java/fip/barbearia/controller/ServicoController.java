package fip.barbearia.controller;

import fip.barbearia.entity.*;
import fip.barbearia.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
 * Endpoints para Servico.
 * - POST /api/servicos
 * - GET /api/servicos
 */
@RestController
@RequestMapping("/api/servicos")
public class ServicoController {
    @Autowired
    private ServicoRepository repo;

    @PostMapping
    public Servico criar(@RequestBody Servico s){ return repo.save(s); }

    @GetMapping
    public List<Servico> listar(){ return repo.findAll(); }
}
