package fip.barbearia.controller;

import fip.barbearia.entity.Cliente;
import fip.barbearia.repository.ClienteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthControllerTest {

    @Mock
    private ClienteRepository repo;

    @InjectMocks
    private AuthController controller = new AuthController();

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    // LOGIN OK
    @Test
    void testLoginSucesso() {
        Cliente cliente = new Cliente();
        cliente.setEmail("teste@teste.com");
        cliente.setSenha("123");

        when(repo.findByEmail("teste@teste.com"))
                .thenReturn(Optional.of(cliente));

        Object resposta = controller.login(cliente.getEmail(), cliente.getSenha());

        assertEquals("ok", resposta);
        verify(repo).findByEmail(cliente.getEmail());
    }

    // LOGIN COM SENHA ERRADA
    @Test
    void testLoginSenhaErrada() {
        Cliente cliente = new Cliente();
        cliente.setEmail("errado@teste.com");
        cliente.setSenha("correta");

        when(repo.findByEmail("errado@teste.com"))
                .thenReturn(Optional.of(cliente));

        Object resposta = controller.login("errado@teste.com", "correta");

        assertEquals("erro", resposta);
        assertEquals("email ou senha inválidos", resposta);
        verify(repo).findByEmail("errado@teste.com");
    }

    // LOGIN COM EMAIL INEXISTENTE
    @Test
    void testLoginEmailInexistente() {
        when(repo.findByEmail("naoexiste@teste.com"))
                .thenReturn(Optional.empty());

        Object resposta = controller.login("naoexiste@teste.com","123");

        assertEquals("erro", resposta);
        assertEquals("email ou senha inválidos", resposta);
        verify(repo).findByEmail("naoexiste@teste.com");
    }
}
