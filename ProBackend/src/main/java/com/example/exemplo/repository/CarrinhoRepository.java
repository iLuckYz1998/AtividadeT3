package com.example.exemplo.repository;

import com.example.exemplo.model.Carrinho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {

    @Query("SELECT c FROM Carrinho c WHERE c.usuario.cpf = :cpf")
    Optional<Carrinho> findByUsuarioCpf(@Param("cpf") String cpf);
}