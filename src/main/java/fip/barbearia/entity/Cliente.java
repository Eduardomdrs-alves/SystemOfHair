package fip.barbearia.entity;

import jakarta.persistence.*;

@Entity
public class Cliente extends Usuario {
    // Construtor padrão
    public Cliente() {
    }

    public Cliente(String nome, String email, String telefone, String senha) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha;
    }
}
