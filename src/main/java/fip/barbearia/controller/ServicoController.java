package fip.barbearia.controller;

import fip.barbearia.entity.Servico;
import fip.barbearia.service.ServicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/servicos")
public class ServicoController {

    @Autowired
    private ServicoService servicoService;

    // Criar serviço
    @PostMapping
    public Servico criar(@RequestBody Servico s) {
        return servicoService.saveServico(s);
    }

    // Listar todos
    @GetMapping
    public List<Servico> listar() {
        return servicoService.getAllServico();
    }

    // Atualizar serviço
    @PutMapping("/{id}")
    public Servico atualizar(@PathVariable Long id, @RequestBody Servico s) {
        Servico existente = servicoService.getServicoById(id);
        if (existente == null) {
            throw new RuntimeException("Serviço não encontrado");
        }
        existente.setNome(s.getNome());
        existente.setPreco(s.getPreco());
        existente.setDuracao(s.getDuracao());
        return servicoService.saveServico(existente);
    }


}
