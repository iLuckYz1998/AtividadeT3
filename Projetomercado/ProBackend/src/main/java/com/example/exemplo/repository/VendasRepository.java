package com.example.exemplo.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.exemplo.model.Usuario;
import com.example.exemplo.model.Vendas;

@Repository
public interface VendasRepository extends JpaRepository<Vendas, Long> {

    Optional<Vendas> findByComprador(Usuario comprador);
    Optional<Vendas> findByData(LocalDateTime data);

}
