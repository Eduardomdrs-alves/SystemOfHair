package fip.barbearia.controller;

import fip.barbearia.dto.AgendamentoRequest;
import fip.barbearia.entity.*;
import fip.barbearia.repository.*;
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

    private final AgendamentoRepository agendamentoRepository;
    private final ClienteRepository clienteRepository;
    private final BarbeiroRepository barbeiroRepository;
    private final ServicoRepository servicoRepository;

    public AgendamentoController(
            AgendamentoRepository agendamentoRepository,
            ClienteRepository clienteRepository,
            BarbeiroRepository barbeiroRepository,
            ServicoRepository servicoRepository) {
        this.agendamentoRepository = agendamentoRepository;
        this.clienteRepository = clienteRepository;
        this.barbeiroRepository = barbeiroRepository;
        this.servicoRepository = servicoRepository;
    }

    // Agendar serviço
    @PostMapping("/agendar")
    public Agendamento agendar(@RequestBody AgendamentoRequest req) {

        Cliente cliente = clienteRepository.findById(req.getClienteId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        Barbeiro barbeiro = barbeiroRepository.findById(req.getBarbeiroId())
                .orElseThrow(() -> new RuntimeException("Barbeiro não encontrado"));

        Servico servico = servicoRepository.findById(req.getServicoId())
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));

        Agendamento agendamento = new Agendamento(
                req.getDataHora(),
                cliente,
                barbeiro,
                servico
        );

        return agendamentoRepository.save(agendamento);
    }

    //Listar todos agendamentos
    @GetMapping
    public List<Agendamento> listarTodos() {
        return agendamentoRepository.findAll();
    }

    // Agenda do barbeiro
    @GetMapping("/barbeiro/{id}")
    public List<Agendamento> listarPorBarbeiro(@PathVariable Long id) {
        return agendamentoRepository.findByBarbeiroId(id);
    }

    // Agendamentos do cliente
    @GetMapping("/cliente/{id}")
    public List<Agendamento> listarPorCliente(@PathVariable Long id) {
        return agendamentoRepository.findByClienteId(id);
    }

    // Cancelar agendamento
    @PostMapping("/{id}/cancelar")
    public Agendamento cancelar(@PathVariable Long id) {

        Agendamento ag = agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));

        ag.cancelar();
        return agendamentoRepository.save(ag);
    }

    // Reagendar
    @PostMapping("/{id}/reagendar")
    public Agendamento reagendar(@PathVariable Long id,
                                 @RequestBody LocalDateTime novaData) {

        Agendamento ag = agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));

        ag.reagendar(novaData);
        return agendamentoRepository.save(ag);
    }
}
