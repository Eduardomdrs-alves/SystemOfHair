package fip.barbearia.controller;

import fip.barbearia.dto.AgendamentoRequest;
import fip.barbearia.entity.*;
import fip.barbearia.service.AgendamentoService;
import fip.barbearia.service.BarbeiroService;
import fip.barbearia.service.ClienteService;
import fip.barbearia.service.ServicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

/*
 * Endpoints para Agendamento:
 * - POST /api/agendamentos/agendar   (criar agendamento)
 * - GET /api/agendamentos
 * - GET /api/agendamentos/barbeiro/{id}
 * - GET /api/agendamentos/cliente/{id}
 * - POST /api/agendamentos/{id}/confirmar
 * - POST /api/agendamentos/{id}/reagendar
 * - POST /api/agendamentos/{id}/cancelar
 */
@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private BarbeiroService barbeiroService;

    @Autowired
    private ServicoService servicoService;

    // Criar agendamento
    @PostMapping("/agendar")
    public Agendamento agendar(@RequestBody AgendamentoRequest req) {
        Cliente cliente = clienteService.getClienteById(req.getClienteId());
        Barbeiro barbeiro = barbeiroService.getBarbeiroById(req.getBarbeiroId());
        Servico servico = servicoService.getServicoById(req.getServicoId());

        return agendamentoService.criar(cliente.getId(), barbeiro.getId(), servico.getId(), req.getDataHora());
    }

    // Listar todos agendamentos
    @GetMapping
    public List<Agendamento> listarTodos() {
        return agendamentoService.listar();
    }

    // Agendamentos por barbeiro
    @GetMapping("/barbeiro/{id}")
    public List<Agendamento> listarPorBarbeiro(@PathVariable Long id) {
        return agendamentoService.listarPorBarbeiro(id);
    }

    // Agendamentos por cliente
    @GetMapping("/cliente/{id}")
    public List<Agendamento> listarPorCliente(@PathVariable Long id) {
        return agendamentoService.listarPorCliente(id);
    }

    // Confirmar agendamento
    @PostMapping("/{id}/confirmar")
    public Agendamento confirmar(@PathVariable Long id) {
        return agendamentoService.confirmar(id);
    }

    // Reagendar agendamento
    @PostMapping("/{id}/reagendar")
    public Agendamento reagendar(@PathVariable Long id,
                                 @RequestBody LocalDateTime novaData) {
        return agendamentoService.reagendar(id, novaData);
    }

    // Cancelar agendamento
    @PostMapping("/{id}/cancelar")
    public Agendamento cancelar(@PathVariable Long id) {
        return agendamentoService.cancelar(id);
    }
}
