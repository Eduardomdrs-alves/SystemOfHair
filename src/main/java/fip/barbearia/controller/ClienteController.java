package fip.barbearia.controller;

import fip.barbearia.entity.*;
import fip.barbearia.repository.*;
import fip.barbearia.service.ClienteService;
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

    private final ClienteService clienteService = new ClienteService();

    @PostMapping
    public Cliente criarCliente(@RequestBody Cliente cliente) {
        return clienteService.saveCliente(cliente);
    }

    @GetMapping
    public List<Cliente> listarClientes() {
        return clienteService.getAllClientes();
    }

    @GetMapping("/{id}")
    public Optional<Cliente> obterCliente(@PathVariable Long id) {
        return Optional.ofNullable(clienteService.getClienteById(id));
    }

    @PutMapping("/{id}")
    public Cliente editarCliente(@PathVariable Long id, @RequestBody Cliente dados) {
        return clienteService.updateCliente(id, dados);
    }

    @DeleteMapping("/{id}")
    public void deletarCliente(@PathVariable Long id) {
        clienteService.deleteCliente(id);
    }
}
