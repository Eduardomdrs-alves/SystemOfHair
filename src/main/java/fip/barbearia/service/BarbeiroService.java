package fip.barbearia.service;

import fip.barbearia.entity.*;
import fip.barbearia.repository.BarbeiroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BarbeiroService {

    @Autowired
    private BarbeiroRepository barbeiroRepository;

    public Barbeiro saveBarbeiro(Barbeiro barbeiro) {
        return barbeiroRepository.save(barbeiro);
    }

    public Barbeiro getBarbeiroById(Long id) {
        return barbeiroRepository.findById(id).orElse(null);
    }

    public List<Barbeiro> getAllBarbeiro() {
        return barbeiroRepository.findAll();
    }

    public Barbeiro getBarbeiroByEmail(String email) {
        return barbeiroRepository.findByEmail(email).orElse(null);
    }

    public Barbeiro updateBarbeiro(Long id, Barbeiro dados) {
        Barbeiro existente = getBarbeiroById(id);

        if (existente != null) {
            existente.setNome(dados.getNome());
            existente.setEmail(dados.getEmail());
            existente.setTelefone(dados.getTelefone());
            existente.setSenha(dados.getSenha());
            return barbeiroRepository.save(existente);
        }

        return null;
    }

    public void delete(Long id) {
        barbeiroRepository.deleteById(id);
    }

    // Regra: verificar se já existe agendamento no mesmo horário
    public boolean estaDisponivel(Long barbeiroId, LocalDateTime dataHora) {
        Barbeiro b = getBarbeiroById(barbeiroId);
        if (b == null) return false;
        return !b.verificarAgenda(dataHora);
    }

    public void adicionarAgendamento(Barbeiro barbeiro, Agendamento ag) {
        barbeiro.getAgendamentos().add(ag);
        barbeiroRepository.save(barbeiro);
    }
}
