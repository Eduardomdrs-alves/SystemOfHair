package fip.barbearia.service;

import fip.barbearia.entity.Cliente;
import fip.barbearia.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    // Criar
    public Cliente saveCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    // Buscar por ID
    public Cliente getClienteById(Long id) {
        return clienteRepository.findById(id).orElse(null);
    }

    // Listar todos
    public List<Cliente> getAllClientes() {
        return clienteRepository.findAll();
    }

    // Atualizar
    public Cliente updateCliente(Long id, Cliente dados) {
        Optional<Cliente> optional = clienteRepository.findById(id);

        if (optional.isPresent()) {
            Cliente existente = optional.get();

            existente.setNome(dados.getNome());
            existente.setEmail(dados.getEmail());
            existente.setTelefone(dados.getTelefone());

            return clienteRepository.save(existente);
        }
        return null;
    }

    // Deletar
    public void deleteCliente(Long id) {
        clienteRepository.deleteById(id);
    }
}
