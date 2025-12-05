package com.example.exemplo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.exemplo.dto.AddItemRequest;
import com.example.exemplo.model.Carrinho;
import com.example.exemplo.service.CarrinhoService;

@RestController
@RequestMapping("/carrinho")
public class CarrinhoController {

    @Autowired
    private CarrinhoService carrinhoService;


    
    @GetMapping("/{cpf}")
    public ResponseEntity<Carrinho> listarCarrinho(@PathVariable String cpf) {
        Carrinho carrinho = carrinhoService.listarCarrinho(cpf);
        return ResponseEntity.ok(carrinho);
    }


    
    @PostMapping("/{cpf}/adicionar")
    public ResponseEntity<Carrinho> adicionarItem(
            @PathVariable String cpf,
            @RequestBody AddItemRequest request) {

        Carrinho carrinho = carrinhoService.adicionarItem(
                cpf,
                request.getProdutoId(),
                request.getQuantidade()
        );

        return ResponseEntity.ok(carrinho);
    }


    
    @DeleteMapping("/{cpf}/remover/{produtoId}")
    public ResponseEntity<Carrinho> removerItem(
            @PathVariable String cpf,
            @PathVariable String produtoId) {

        Carrinho carrinho = carrinhoService.removerItem(cpf, produtoId);
        return ResponseEntity.ok(carrinho);
    }
}
