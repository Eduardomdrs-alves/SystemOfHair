package fip.barbearia.controller;

import fip.barbearia.entity.*;
import fip.barbearia.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Map;

/*
 * Controle de autenticação muito simples:
 * Recebe email e senha, busca cliente com esse email e compara senha.
 * Retorna 200 OK se bater, 401 se falhar.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body){
        String email = body.get("email");
        String senha = body.get("senha");
        Optional<Cliente> c = clienteRepository.findByEmail(email);
        if (c.isPresent() && c.get().getSenha().equals(senha)) {
            return Map.of("status","ok","usuarioId", c.get().getId());
        }
        return Map.of("status","erro","mensagem","email ou senha inválidos");
    }
}
