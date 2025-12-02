package fip.barbearia.controller;

import fip.barbearia.entity.Cliente;
import fip.barbearia.repository.ClienteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ClienteControllerTest {

    @Mock
    private ClienteRepository repo;

    @InjectMocks
    private ClienteController controller;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCriarCliente() {
        Cliente c = new Cliente();
        c.setNome("João");

        when(repo.save(c)).thenReturn(c);

        Cliente resposta = controller.criarCliente(c);

        assertEquals("João", resposta.getNome());
        verify(repo, times(1)).save(c);
    }

    @Test
    void testListarClientes() {
        List<Cliente> lista = List.of(new Cliente(), new Cliente());
        when(repo.findAll()).thenReturn(lista);

        List<Cliente> resposta = controller.listarClientes();

        assertEquals(2, resposta.size());
        verify(repo).findAll();
    }

    @Test
    void testObterCliente() {
        Cliente c = new Cliente();
        c.setNome("Maria");

        when(repo.findById(1L)).thenReturn(Optional.of(c));

        Optional<Cliente> resposta = controller.obterCliente(1L);

        assertTrue(resposta.isPresent());
        assertEquals("Maria", resposta.get().getNome());
        verify(repo).findById(1L);
    }

    @Test
    void testEditarCliente() {
        Cliente original = new Cliente();
        original.setNome("Antigo");
        original.setTelefone("1111");

        Cliente novosDados = new Cliente();
        novosDados.setNome("Novo");
        novosDados.setTelefone("2222");
        novosDados.setEmail("novo@email.com");
        novosDados.setSenha("123");

        when(repo.findById(1L)).thenReturn(Optional.of(original));
        when(repo.save(original)).thenReturn(original);

        Cliente atualizado = controller.editarCliente(1L, novosDados);

        assertEquals("Novo", atualizado.getNome());
        assertEquals("2222", atualizado.getTelefone());
        assertEquals("novo@email.com", atualizado.getEmail());
        assertEquals("123", atualizado.getSenha());

        verify(repo).findById(1L);
        verify(repo).save(original);
    }

    @Test
    void testDeletarCliente() {
        doNothing().when(repo).deleteById(1L);

        controller.deletarCliente(1L);

        verify(repo).deleteById(1L);
    }
}
