package com.example.exemplo.repository;

import com.example.exemplo.model.Usuario;
import com.example.exemplo.model.Vendas;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface VendasRepository extends JpaRepository<Vendas, Long> {

    Optional<Vendas> findByComprador(Usuario comprador);
}