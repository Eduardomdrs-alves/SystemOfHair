package fip.barbearia.service;

import fip.barbearia.entity.Cliente;
import fip.barbearia.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente saveCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Cliente getClienteById(Long id) {
        return clienteRepository.findById(id).orElse(null);
    }

    public List<Cliente> getAllClientes() {
        return clienteRepository.findAll();
    }

    public Cliente getClienteByEmail(String email) {
        return clienteRepository.findByEmail(email).orElse(null);
    }

    public Cliente updateCliente(Long id, Cliente dados) {
        Cliente existente = getClienteById(id);

        if (existente != null) {
            existente.setNome(dados.getNome());
            existente.setEmail(dados.getEmail());
            existente.setTelefone(dados.getTelefone());
            existente.setSenha(dados.getSenha());
            existente.setPerfil(dados.getPerfil());
            return clienteRepository.save(existente);
        }

        return null;
    }

    public void deleteCliente(Long id) {
        clienteRepository.deleteById(id);
    }
}
