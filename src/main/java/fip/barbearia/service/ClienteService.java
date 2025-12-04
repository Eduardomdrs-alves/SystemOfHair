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
        try {
            return clienteRepository.save(cliente);
        } catch (Exception e) {
            System.out.println("Erro ao salvar cliente: " + e.getMessage());
            return null;
        }
    }

    public Cliente getClienteById(Long id) {
        try {
            return clienteRepository.findById(id).orElse(null);
        } catch (Exception e) {
            System.out.println("Erro ao buscar cliente por ID: " + e.getMessage());
            return null;
        }
    }

    public List<Cliente> getAllClientes() {
        try {
            return clienteRepository.findAll();
        } catch (Exception e) {
            System.out.println("Erro ao buscar todos os clientes: " + e.getMessage());
            return null;
        }    }

    public Cliente getClienteByEmail(String email) {
        try {
            // Busca por campo único pode gerar exceções caso haja falha no banco.
            return clienteRepository.findByEmail(email).orElse(null);
        } catch (Exception e) {
            System.out.println("Erro ao buscar cliente por e-mail: " + e.getMessage());
            return null;
        }
    }

    public Cliente updateCliente(Long id, Cliente dados) {
        try {
            // Tanto a busca quanto o save podem gerar erros, por isso tudo está no try/catch.
            Cliente existente = getClienteById(id);

            if (existente != null) {
                // Atualização local não gera exceção, mas o save() pode falhar ao persistir.
                existente.setNome(dados.getNome());
                existente.setEmail(dados.getEmail());
                existente.setTelefone(dados.getTelefone());
                existente.setSenha(dados.getSenha());
                existente.setPerfil(dados.getPerfil());
                return clienteRepository.save(existente);
            }

            return null;

        } catch (Exception e) {
            System.out.println("Erro ao atualizar cliente: " + e.getMessage());
            return null;
        }
    }

    public void deleteCliente(Long id) {
        try {
            clienteRepository.deleteById(id);
        } catch (Exception e) {
            System.out.println("Erro ao deletar cliente: " + e.getMessage());
        }
    }
}
