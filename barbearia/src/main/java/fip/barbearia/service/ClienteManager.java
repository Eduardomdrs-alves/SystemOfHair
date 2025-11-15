package fip.barbearia.service;

import fip.barbearia.entity.Cliente;
import fip.barbearia.repository.Cliente_BD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClienteManager {

    @Autowired
    private Cliente_BD banco;

    private Cliente cliente;
    private String nome;

    /*
    CLASSE QUE CONTÉM OS MÉTODOS PARA OS CLIENTES
    AQUI FAZ TODO O SERVIÇO QUE CORRE A LÓGICA!
     */

    public ClienteManager(String nome){
        this.nome=nome;
    }

    public ClienteManager(){}

    public ClienteManager(Cliente cliente){
        this.cliente=cliente;
    }

    public Cliente criarConta(){
        return banco.save(cliente);
    }

    public Optional<Cliente> existeTelefone(){
        return banco.findById(cliente.getId());
    }

    public boolean existeEmail(){
        return false;
    }

    public boolean fazerLogin(){
        return false;
    }

}
