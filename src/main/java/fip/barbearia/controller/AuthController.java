package fip.barbearia.controller;

import fip.barbearia.entity.*;
import fip.barbearia.repository.*;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final ClienteRepository clienteRepository;
    private final BarbeiroRepository barbeiroRepository;
    private final AdminRepository adminRepository;

    public AuthController(ClienteRepository clienteRepository,
                          BarbeiroRepository barbeiroRepository,
                          AdminRepository adminRepository) {
        this.clienteRepository = clienteRepository;
        this.barbeiroRepository = barbeiroRepository;
        this.adminRepository = adminRepository;
    }

    // REGISTRO (SÓ CLIENTE)
    @PostMapping("/registrar")
    public Cliente registrarCliente(@RequestBody Cliente cliente) {

        cliente.setPerfil(Cliente.Perfil.CLIENTE);
        return clienteRepository.save(cliente);
    }

    // LOGIN (TODOS)
    @PostMapping("/login")
    public Object login(@RequestParam String email,
                        @RequestParam String senha) {

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
        //RAUL TROCA AQUI POR EXCECAO PERSONALIZADA
    }
}
