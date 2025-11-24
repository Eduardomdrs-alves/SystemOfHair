
package com.salafacil.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.salafacil.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {}
