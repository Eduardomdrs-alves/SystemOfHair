package fip.barbearia.controller;

import fip.barbearia.entity.Barbeiro;
import fip.barbearia.repository.BarbeiroRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BarbeiroControllerTest {

    @Mock
    private BarbeiroRepository repo;

    @InjectMocks
    private BarbeiroController controller;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    // POST /api/barbeiros
    @Test
    void testarCriarBarbeiro() {
        Barbeiro b = new Barbeiro();
        b.setNome("João");

        when(repo.save(b)).thenReturn(b);

        Barbeiro resposta = controller.criarBarbeiro(b);

        assertEquals("João", resposta.getNome());
        verify(repo).save(b);
    }

    // GET /api/barbeiros
    @Test
    void testarListarBarbeiros() {
        Barbeiro b1 = new Barbeiro();
        b1.setNome("João");

        Barbeiro b2 = new Barbeiro();
        b2.setNome("Carlos");

        when(repo.findAll()).thenReturn(List.of(b1, b2));

        List<Barbeiro> lista = controller.listar();

        assertEquals(2, lista.size());
        assertEquals("João", lista.get(0).getNome());
        assertEquals("Carlos", lista.get(1).getNome());
        verify(repo).findAll();
    }

    // GET /api/barbeiros/{id}
    @Test
    void testarObterBarbeiroPorId() {
        Barbeiro b = new Barbeiro();
        b.setNome("João");

        when(repo.findById(1L)).thenReturn(Optional.of(b));

        Optional<Barbeiro> resposta = controller.obter(1L);

        assertTrue(resposta.isPresent());
        assertEquals("João", resposta.get().getNome());
        verify(repo).findById(1L);
    }
}
