package fip.barbearia.controller;

import fip.barbearia.entity.*;
import fip.barbearia.repository.*;
import fip.barbearia.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // REGISTRO (SÓ CLIENTE)
    @PostMapping("/registrar")
    public Cliente registrarCliente(@RequestBody Cliente cliente) {
        return authService.criarUsuario(cliente);
    }

    // LOGIN (TODOS)
    @PostMapping("/login")
    public Object login(@RequestParam String email,
                        @RequestParam String senha) {
        return authService.login(email,senha);
    }

}
