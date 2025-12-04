package fip.barbearia.controller;

import fip.barbearia.entity.Servico;
import fip.barbearia.repository.ServicoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ServicoControllerTest {

    @Mock
    private ServicoRepository repo;

    @InjectMocks
    private ServicoController controller;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCriar() {
        Servico servico = new Servico();

        when(repo.save(servico)).thenReturn(servico);

        Servico resultado = controller.criar(servico);

        assertEquals(servico, resultado);
        verify(repo, times(1)).save(servico);
    }

    @Test
    void testListar() {
        List<Servico> lista = List.of(new Servico(), new Servico());

        when(repo.findAll()).thenReturn(lista);

        List<Servico> resultado = controller.listar();

        assertEquals(2, resultado.size());
        verify(repo, times(1)).findAll();
    }
}