package fip.barbearia.service;

import fip.barbearia.entity.Admin;
import fip.barbearia.entity.Barbeiro;
import fip.barbearia.entity.Cliente;
import fip.barbearia.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired private AgendamentoRepository agendamentoRepository;
    @Autowired private ClienteRepository clienteRepository;
    @Autowired private BarbeiroRepository barbeiroRepository;
    @Autowired private AdminRepository adminRepository;
    @Autowired private ServicoRepository servicoRepository;

    public Cliente criarUsuario(Cliente cliente){
        clienteRepository.save(cliente);
        return cliente;
    }

    public Object login(String email, String senha){
        // primeiro tenta CLIENTE
        Optional<Cliente> cliente = clienteRepository.findByEmail(email);
        if (cliente.isPresent() && cliente.get().getSenha().equals(senha)) {
            return cliente.get();
        }

        // depois FUNCIONÁRIO
        Optional<Barbeiro> barbeiro = barbeiroRepository.findByEmail(email);
        if (barbeiro.isPresent() && barbeiro.get().getSenha().equals(senha)) {
            return barbeiro.get();
        }

        // depois ADMIN
        Optional<Admin> admin = adminRepository.findByEmail(email);
        if (admin.isPresent() && admin.get().getSenha().equals(senha)) {
            return admin.get();
        }

        throw new RuntimeException("Email ou senha incorretos");
    }

}
