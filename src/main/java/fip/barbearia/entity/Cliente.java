package fip.barbearia.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Cliente")
public class Cliente extends Usuario {
    // Construtor padrão
    public Cliente() {
    }

    private Perfil perfil;

 ;   public Cliente(String nome, String email, String telefone, String senha) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha;
    }

    public Perfil getPerfil() {
        return perfil;
    }

    public void setPerfil(Perfil perfil) {
        this.perfil = perfil;
    }


    public enum Perfil {
        CLIENTE,
        FUNCIONARIO,
        ADMIN
    }
}
