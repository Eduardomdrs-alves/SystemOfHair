
package com.salafacil.controller;

import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.salafacil.model.Usuario;
import com.salafacil.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioRepository repo;

    public UsuarioController(UsuarioRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public Usuario criar(@RequestBody Usuario u) {
        return repo.save(u);
    }

    @GetMapping
    public List<Usuario> listar() {
        return repo.findAll();
    }
}
