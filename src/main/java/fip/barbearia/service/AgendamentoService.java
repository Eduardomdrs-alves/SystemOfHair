package fip.barbearia.service;

import fip.barbearia.entity.Agendamento;
import fip.barbearia.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    // Criar agendamento
    public Agendamento saveAgendamento(Agendamento agendamento) {
        return agendamentoRepository.save(agendamento);
    }

    // Buscar agendamento por ID
    public Agendamento getAgendamentoById(Long id) {
        Optional<Agendamento> agendamento = agendamentoRepository.findById(id);
        return agendamento.orElse(null);
    }

    // Listar todos
    public List<Agendamento> getAllAgendamentos() {
        return agendamentoRepository.findAll();
    }

    // Deletar por ID
    public void deleteAgendamento(Long id) {
        agendamentoRepository.deleteById(id);
    }

    // Atualizar agendamento
    public Agendamento updateAgendamento(Long id, Agendamento detalhes) {

        Optional<Agendamento> optional = agendamentoRepository.findById(id);

        if (optional.isPresent()) {
            Agendamento existente = optional.get();

            existente.setDataHora(detalhes.getDataHora());
            existente.setStatus(detalhes.getStatus());
            existente.setCliente(detalhes.getCliente());
            existente.setBarbeiro(detalhes.getBarbeiro());
            existente.setServico(detalhes.getServico());

            return agendamentoRepository.save(existente);
        }

        return null;
    }

    // Métodos específicos do domínio (opcionais)
    public Agendamento confirmar(Long id) {
        Agendamento ag = getAgendamentoById(id);
        if (ag != null) {
            ag.confirmar();
            return agendamentoRepository.save(ag);
        }
        return null;
    }

    public Agendamento reagendar(Long id, LocalDateTime novaData) {
        Agendamento ag = getAgendamentoById(id);
        if (ag != null) {
            ag.reagendar(novaData);
            return agendamentoRepository.save(ag);
        }
        return null;
    }

    public Agendamento cancelar(Long id) {
        Agendamento ag = getAgendamentoById(id);
        if (ag != null) {
            ag.cancelar();
            return agendamentoRepository.save(ag);
        }
        return null;
    }
}
