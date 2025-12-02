package fip.barbearia.controller;

import fip.barbearia.entity.*;
import fip.barbearia.repository.*;
import fip.barbearia.service.ServicoService;
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

    private final ServicoService servicoService = new ServicoService();

    @PostMapping
    public Servico criar(@RequestBody Servico s) {
        return servicoService.saveServico(s);
    }

    @GetMapping
    public List<Servico> listar() {
        return servicoService.getAllServico();
    }
}
