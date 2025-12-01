package com.example.exemplo.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


import com.example.exemplo.model.Vendas;
import com.example.exemplo.repository.VendasRepository;

import jakarta.validation.Valid;

public class VendasController {

    private VendasRepository vendasRepository;

    @PostMapping
    public ResponseEntity<Vendas> salvar(@Valid @RequestBody Vendas venda){
        vendasRepository.save(venda);
        return ResponseEntity.ok(venda);
        
      
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vendas> buscarPorId(@PathVariable Long id){
        Vendas venda = vendasRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Venda não encontrada"));
        return ResponseEntity.ok(venda);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarVenda(@PathVariable Long id){
        if(!vendasRepository.existsById(id)){
            throw new RuntimeException("Venda não encontrada");
        }   
        vendasRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}