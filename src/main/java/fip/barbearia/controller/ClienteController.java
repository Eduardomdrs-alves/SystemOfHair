package fip.barbearia.controller;

import fip.barbearia.entity.*;
import fip.barbearia.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/*
 * Endpoints para CRUD de Cliente.
 * - POST /api/clientes
 * - GET /api/clientes
 * - GET /api/clientes/{id}
 * - PUT /api/clientes/{id}
 * - DELETE /api/clientes/{id}
 */
@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository repo;

    @PostMapping
    public Cliente criarCliente(@RequestBody Cliente cliente){
        // Método em português: criarConta
        return repo.save(cliente);
    }

    @GetMapping
    public List<Cliente> listarClientes(){ return repo.findAll(); }

    @GetMapping("/{id}")
    public Optional<Cliente> obterCliente(@PathVariable Long id){ return repo.findById(id); }

    @PutMapping("/{id}")
    public Cliente editarCliente(@PathVariable Long id, @RequestBody Cliente dados){
        Cliente c = repo.findById(id).orElseThrow();
        c.setNome(dados.getNome());
        c.setTelefone(dados.getTelefone());
        c.setEmail(dados.getEmail());
        // senha só altera se fornecida
        if (dados.getSenha() != null && !dados.getSenha().isEmpty()) c.setSenha(dados.getSenha());
        return repo.save(c);
    }

    @DeleteMapping("/{id}")
    public void deletarCliente(@PathVariable Long id){ repo.deleteById(id); }
}
