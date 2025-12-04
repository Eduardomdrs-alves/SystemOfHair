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
        try {
            return barbeiroRepository.save(barbeiro);
        } catch (Exception e) {
            System.out.println("Erro ao salvar barbeiro: " + e.getMessage());
            return null;
        }
    }

    public Barbeiro getBarbeiroById(Long id) {
        try {
            return barbeiroRepository.findById(id).orElse(null);
        } catch (Exception e) {
            System.out.println("Erro ao buscar barbeiro por ID: " + e.getMessage());
            return null;
        }
    }

    public List<Barbeiro> getAllBarbeiro() {
        try {
            // Listagens no banco podem lançar exceções de comunicação ou consulta.
            return barbeiroRepository.findAll();
        } catch (Exception e) {
            System.out.println("Erro ao buscar todos os barbeiros: " + e.getMessage());
            return null;
        }
    }

    public Barbeiro getBarbeiroByEmail(String email) {
        try {
            return barbeiroRepository.findByEmail(email).orElse(null);
        } catch (Exception e) {
            System.out.println("Erro ao buscar barbeiro por e-mail: " + e.getMessage());
            return null;
        }
    }

    public Barbeiro updateBarbeiro(Long id, Barbeiro dados) {
        try {
            Barbeiro existente = getBarbeiroById(id);

            if (existente != null) {
                existente.setNome(dados.getNome());
                existente.setEmail(dados.getEmail());
                existente.setTelefone(dados.getTelefone());
                existente.setSenha(dados.getSenha());
                return barbeiroRepository.save(existente);
            }

            return null;

        } catch (Exception e) {
            System.out.println("Erro ao atualizar barbeiro: " + e.getMessage());
            return null;
        }
    }

    public void delete(Long id) {
        try {
            barbeiroRepository.deleteById(id);
        } catch (Exception e) {
            System.out.println("Erro ao deletar barbeiro: " + e.getMessage());
        }
    }

    public boolean estaDisponivel(Long barbeiroId, LocalDateTime dataHora) {
        try {
            Barbeiro b = getBarbeiroById(barbeiroId);
            if (b == null) return false;
            return !b.verificarAgenda(dataHora);
        } catch (Exception e) {
            System.out.println("Erro ao verificar disponibilidade: " + e.getMessage());
            return false;
        }
    }

    public void adicionarAgendamento(Barbeiro barbeiro, Agendamento ag) {
        try {
            barbeiro.getAgendamentos().add(ag);
            barbeiroRepository.save(barbeiro);
        } catch (Exception e) {
            System.out.println("Erro ao adicionar agendamento ao barbeiro: " + e.getMessage());
        }
    }
}
