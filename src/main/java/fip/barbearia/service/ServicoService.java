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
        try {
            return servicoRepository.save(servico);
        } catch (Exception e) {
            System.out.println("Erro ao salvar serviço: " + e.getMessage());
            return null;
        }
        // Caso tenha uma perca de conexão com o banco de dados
    }

    public Servico getServicoById(Long id) {
        try {
            return servicoRepository.findById(id).orElse(null);
        } catch (Exception e) {
            System.out.println("Erro ao buscar serviço por ID: " + e.getMessage());
            return null;
        }
    }

    public List<Servico> getAllServico() {
        try {
            return servicoRepository.findAll();
        } catch (Exception e) {
            System.out.println("Erro ao buscar todos os serviços: " + e.getMessage());
            return null;
        }
        // Falha ao consultar banco de dados
    }

    public Servico updateServico(Long id, Servico dados) {
        try {
            Servico existente = getServicoById(id);

            if (existente != null) {
                existente.setNome(dados.getNome());
                existente.setPreco(dados.getPreco());
                existente.setDuracao(dados.getDuracao());

                return servicoRepository.save(existente);
            }

            return null;

        } catch (Exception e) {
            System.out.println("Erro ao atualizar serviço: " + e.getMessage());
            return null;
        }
        // Duas exceções podem ser geradas, ao buscar o serviço e caso perca a conexão ao tentar salvar o banco de dados
    }

    public void delete(Long id) {
        try {
            servicoRepository.deleteById(id);
        } catch (Exception e) {
            System.out.println("Erro ao deletar serviço: " + e.getMessage());
        }
    }
}
