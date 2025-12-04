package fip.barbearia.service;

import fip.barbearia.entity.Servico;
import fip.barbearia.repository.ServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicoService {

    @Autowired
    private ServicoRepository servicoRepository;

    public Servico saveServico(Servico servico) {
        return servicoRepository.save(servico);
    }

    public Servico getServicoById(Long id) {
        return servicoRepository.findById(id).orElse(null);
    }

    public List<Servico> getAllServico() {
        return servicoRepository.findAll();
    }

    public Servico updateServico(Long id, Servico dados) {
        Servico existente = getServicoById(id);

        if (existente != null) {
            existente.setNome(dados.getNome());
            existente.setPreco(dados.getPreco());
            existente.setDuracao(dados.getDuracao());
            return servicoRepository.save(existente);
        }

        return null;
    }

    public void delete(Long id) {
        servicoRepository.deleteById(id);
    }
}
