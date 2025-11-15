package fip.barbearia.repository;

import fip.barbearia.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Cliente_BD extends JpaRepository<Cliente, Long> {

    @Override
    Optional<Cliente> findById(Long aLong);
}
