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

        try {
            // As buscas podem falhar caso o ID não exista ou o banco esteja indisponível
            Cliente cliente = clienteRepository.findById(clienteId).orElseThrow();
            Barbeiro barbeiro = barbeiroRepository.findById(barbeiroId).orElseThrow();
            Servico servico = servicoRepository.findById(servicoId).orElseThrow();

            boolean ocupado = barbeiro.getAgendamentos().stream()
                    .anyMatch(a -> a.getDataHora().equals(dataHora));

            if (ocupado) {
                throw new RuntimeException("O barbeiro já possui agendamento nesse horário.");
            }

            Agendamento ag = new Agendamento(dataHora, cliente, barbeiro, servico);

            barbeiro.getAgendamentos().add(ag);

            return agendamentoRepository.save(ag);

        } catch (Exception e) {
            System.out.println("Erro ao criar agendamento: " + e.getMessage());
            return null;
        }
    }

    public List<Agendamento> listar() {
        try {
            return agendamentoRepository.findAll();
        } catch (Exception e) {
            System.out.println("Erro ao listar agendamentos: " + e.getMessage());
            return null;
        }
    }

    public List<Agendamento> listarPorCliente(Long clienteId) {
        try {
            return agendamentoRepository.findByClienteId(clienteId);
        } catch (Exception e) {
            System.out.println("Erro ao listar agendamentos por cliente: " + e.getMessage());
            return null;
        }
    }

    public List<Agendamento> listarPorBarbeiro(Long barbeiroId) {
        try {
            return agendamentoRepository.findByBarbeiroId(barbeiroId);
        } catch (Exception e) {
            System.out.println("Erro ao listar agendamentos por barbeiro: " + e.getMessage());
            return null;
        }
    }

    public Agendamento confirmar(Long id) {
        try {
            Agendamento ag = agendamentoRepository.findById(id).orElseThrow();
            ag.confirmar();

            return agendamentoRepository.save(ag);

        } catch (Exception e) {
            System.out.println("Erro ao confirmar agendamento: " + e.getMessage());
            return null;
        }
    }

    public Agendamento reagendar(Long id, LocalDateTime novaData) {
        try {
            Agendamento ag = agendamentoRepository.findById(id).orElseThrow();

            if (ag.getBarbeiro().verificarAgenda(novaData)) {
                throw new RuntimeException("O barbeiro já possui agendamento nesse horário.");
            }

            ag.reagendar(novaData);

            return agendamentoRepository.save(ag);

        } catch (Exception e) {
            System.out.println("Erro ao reagendar agendamento: " + e.getMessage());
            return null;
        }
    }

    public Agendamento cancelar(Long id) {
        try {
            Agendamento ag = agendamentoRepository.findById(id).orElseThrow();
            ag.cancelar();
            return agendamentoRepository.save(ag);
        } catch (Exception e) {
            System.out.println("Erro ao cancelar agendamento: " + e.getMessage());
            return null;
        }
    }

    public void deletar(Long id) {
        try {
            agendamentoRepository.deleteById(id);
        } catch (Exception e) {
            System.out.println("Erro ao deletar agendamento: " + e.getMessage());
        }
    }
}
