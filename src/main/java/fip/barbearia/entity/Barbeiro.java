package fip.barbearia.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "Barbearia")
public class Barbeiro extends Usuario {
    @OneToMany(mappedBy = "barbeiro", cascade = CascadeType.ALL)
    private List<Agendamento> agendamentos = new ArrayList<>();

    public Barbeiro() {
    }

    public Barbeiro(String nome, String email, String telefone, String senha) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha;
    }

    public List<Agendamento> getAgendamentos() {
        return agendamentos;
    }

    public void setAgendamentos(List<Agendamento> agendamentos) {
        this.agendamentos = agendamentos;
    }

    // verifica agenda - método simples que retorna se existe agendamento no mesmo horário
    public boolean verificarAgenda(java.time.LocalDateTime dataHora) {
        return agendamentos.stream().anyMatch(a -> a.getDataHora().equals(dataHora));
    }
}