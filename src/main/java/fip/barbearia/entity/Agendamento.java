package fip.barbearia.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "Agendamento")
public class Agendamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataHora;

    @Enumerated(EnumType.STRING)
    private StatusAgendamento status;

    @ManyToOne
    private Cliente cliente;

    @ManyToOne
    private Barbeiro barbeiro;

    @ManyToOne
    private Servico servico;

    public Agendamento() {
    }

    public Agendamento(LocalDateTime dataHora, Cliente cliente, Barbeiro barbeiro, Servico servico) {
        this.dataHora = dataHora;
        this.cliente = cliente;
        this.barbeiro = barbeiro;
        this.servico = servico;
        this.status = StatusAgendamento.AGENDADO;
    }

    // getters e setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public StatusAgendamento getStatus() {
        return status;
    }

    public void setStatus(StatusAgendamento status) {
        this.status = status;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Barbeiro getBarbeiro() {
        return barbeiro;
    }

    public void setBarbeiro(Barbeiro barbeiro) {
        this.barbeiro = barbeiro;
    }

    public Servico getServico() {
        return servico;
    }

    public void setServico(Servico servico) {
        this.servico = servico;
    }

    // Métodos do diagrama
    public void confirmar() {
        this.status = StatusAgendamento.AGENDADO;
    }

    public void reagendar(LocalDateTime novaData) {
        this.dataHora = novaData;
        this.status = StatusAgendamento.REAGENDADO;
    }

    public void cancelar() {
        this.status = StatusAgendamento.CANCELADO;
    }
}
