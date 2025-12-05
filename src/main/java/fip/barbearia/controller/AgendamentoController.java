package fip.barbearia.controller;

import fip.barbearia.dto.AgendamentoRequest;
import fip.barbearia.entity.*;
import fip.barbearia.repository.*;
import fip.barbearia.service.AgendamentoService;
import fip.barbearia.service.BarbeiroService;
import fip.barbearia.service.ClienteService;
import fip.barbearia.service.ServicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

/*
 * Endpoints para Agendamento.
 * - POST /api/agendamentos   (criar agendamento)
 * - GET /api/agendamentos
 * - PUT /api/agendamentos/{id}/confirmar
 * - PUT /api/agendamentos/{id}/reagendar  (body: {"dataHora":"2025-12-01T14:00"})
 * - PUT /api/agendamentos/{id}/cancelar
 */
@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    // Agendar serviço
    @PostMapping("/agendar")
    public Agendamento agendar(@RequestBody AgendamentoRequest req) {
        Cliente cliente = new ClienteService().getClienteById(req.getClienteId());
        Barbeiro barbeiro = new BarbeiroService().getBarbeiroById(req.getBarbeiroId());
        Servico servico = new ServicoService().getServicoById(req.getServicoId());

        return agendamentoService.criar(cliente.getId(), barbeiro.getId(), servico.getId(), req.getDataHora());
    }

    //Listar todos agendamentos
    @GetMapping
    public List<Agendamento> listarTodos() {
        return agendamentoService.listar();
    }

    // Agenda do barbeiro
    @GetMapping("/barbeiro/{id}")
    public List<Agendamento> listarPorBarbeiro(@PathVariable Long id) {
        return agendamentoService.listarPorBarbeiro(id);
    }

    // Agendamentos do cliente
    @GetMapping("/cliente/{id}")
    public List<Agendamento> listarPorCliente(@PathVariable Long id) {
        return agendamentoService.listarPorCliente(id);
    }

    // Cancelar agendamento
    @PostMapping("/{id}/cancelar")
    public Agendamento cancelar(@PathVariable Long id) {
        return agendamentoService.cancelar(id);
    }

    // Reagendar
    @PostMapping("/{id}/reagendar")
    public Agendamento reagendar(@PathVariable Long id,
                                 @RequestBody LocalDateTime novaData) {
        return agendamentoService.reagendar(id, novaData);
    }
}
