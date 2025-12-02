package fip.barbearia.entity;

import jakarta.persistence.*;

@Entity
public class Admin extends Usuario {
    public Admin() {
    }

    public Admin(String nome, String email, String telefone, String senha) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha;
    }
}
