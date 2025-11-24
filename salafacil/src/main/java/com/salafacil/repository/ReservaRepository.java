
package com.salafacil.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.salafacil.model.Reserva;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

 List<Reserva> findBySalaIdAndInicioLessThanEqualAndFimGreaterThanEqual(
     Long salaId, LocalDateTime fim, LocalDateTime inicio
 );
}
