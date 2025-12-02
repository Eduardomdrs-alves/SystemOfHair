package fip.barbearia.controller;

import fip.barbearia.entity.*;
import fip.barbearia.repository.*;
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

    @Autowired private AgendamentoRepository agRepo;
    @Autowired private ClienteRepository clienteRepo;
    @Autowired private BarbeiroRepository barbeiroRepo;
    @Autowired private ServicoRepository servicoRepo;

    @PostMapping
    public Agendamento criarAgendamento(@RequestBody AgendamentoDTO dto){
        Cliente cliente = clienteRepo.findById(dto.getClienteId()).orElseThrow();
        Barbeiro barbeiro = barbeiroRepo.findById(dto.getBarbeiroId()).orElseThrow();
        Servico servico = servicoRepo.findById(dto.getServicoId()).orElseThrow();

        Agendamento a = new Agendamento(dto.getDataHora(), cliente, barbeiro, servico);
        // adiciona ao barbeiro
        barbeiro.getAgendamentos().add(a);
        return agRepo.save(a);
    }

    @GetMapping
    public List<Agendamento> listar(){ return agRepo.findAll(); }

    @PutMapping("/{id}/confirmar")
    public Agendamento confirmar(@PathVariable Long id){
        Agendamento a = agRepo.findById(id).orElseThrow();
        a.confirmar();
        return agRepo.save(a);
    }

    @PutMapping("/{id}/reagendar")
    public Agendamento reagendar(@PathVariable Long id, @RequestBody ReagendarDTO dto){
        Agendamento a = agRepo.findById(id).orElseThrow();
        a.reagendar(dto.getDataHora());
        return agRepo.save(a);
    }

    @PutMapping("/{id}/cancelar")
    public Agendamento cancelar(@PathVariable Long id){
        Agendamento a = agRepo.findById(id).orElseThrow();
        a.cancelar();
        return agRepo.save(a);
    }

    // DTOs locais para simplificar payloads
    public static class AgendamentoDTO {
        private Long clienteId;
        private Long barbeiroId;
        private Long servicoId;
        private LocalDateTime dataHora;
        // getters e setters
        public Long getClienteId(){return clienteId;}
        public void setClienteId(Long clienteId){this.clienteId = clienteId;}
        public Long getBarbeiroId(){return barbeiroId;}
        public void setBarbeiroId(Long barbeiroId){this.barbeiroId = barbeiroId;}
        public Long getServicoId(){return servicoId;}
        public void setServicoId(Long servicoId){this.servicoId = servicoId;}
        public LocalDateTime getDataHora(){return dataHora;}
        public void setDataHora(LocalDateTime dataHora){this.dataHora = dataHora;}
    }

    public static class ReagendarDTO {
        private LocalDateTime dataHora;
        public LocalDateTime getDataHora(){return dataHora;}
        public void setDataHora(LocalDateTime dataHora){this.dataHora = dataHora;}
    }
}
