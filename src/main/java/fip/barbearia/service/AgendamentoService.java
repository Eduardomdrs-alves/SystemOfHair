package fip.barbearia.service;

import fip.barbearia.entity.*;
import fip.barbearia.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AgendamentoService {

    @Autowired private AgendamentoRepository agendamentoRepository;
    @Autowired private ClienteRepository clienteRepository;
    @Autowired private BarbeiroRepository barbeiroRepository;
    @Autowired private ServicoRepository servicoRepository;

    public Agendamento criar(Long clienteId, Long barbeiroId, Long servicoId, LocalDateTime dataHora) {

        Cliente cliente = clienteRepository.findById(clienteId).orElseThrow();
        Barbeiro barbeiro = barbeiroRepository.findById(barbeiroId).orElseThrow();
        Servico servico = servicoRepository.findById(servicoId).orElseThrow();

        // regra de conflito
        boolean ocupado = barbeiro.getAgendamentos().stream()
                .anyMatch(a -> a.getDataHora().equals(dataHora));

        if (ocupado) {
            throw new RuntimeException("O barbeiro já possui agendamento nesse horário.");
        }

        Agendamento ag = new Agendamento(dataHora, cliente, barbeiro, servico);

        // adiciona na lista do barbeiro
        barbeiro.getAgendamentos().add(ag);

        return agendamentoRepository.save(ag);
    }

    public List<Agendamento> listar() {
        return agendamentoRepository.findAll();
    }

    public List<Agendamento> listarPorCliente(Long clienteId) {
        return agendamentoRepository.findByClienteId(clienteId);
    }

    public List<Agendamento> listarPorBarbeiro(Long barbeiroId) {
        return agendamentoRepository.findByBarbeiroId(barbeiroId);
    }

    public Agendamento confirmar(Long id) {
        Agendamento ag = agendamentoRepository.findById(id).orElseThrow();
        ag.confirmar();
        return agendamentoRepository.save(ag);
    }

    public Agendamento reagendar(Long id, LocalDateTime novaData) {
        Agendamento ag = agendamentoRepository.findById(id).orElseThrow();

        // regra de conflito
        if (ag.getBarbeiro().verificarAgenda(novaData)) {
            throw new RuntimeException("O barbeiro já possui agendamento nesse horário.");
        }

        ag.reagendar(novaData);
        return agendamentoRepository.save(ag);
    }

    public Agendamento cancelar(Long id) {
        Agendamento ag = agendamentoRepository.findById(id).orElseThrow();
        ag.cancelar();
        return agendamentoRepository.save(ag);
    }

    public void deletar(Long id) {
        agendamentoRepository.deleteById(id);
    }
}
