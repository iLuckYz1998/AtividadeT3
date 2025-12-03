package com.example.exemplo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.exemplo.dto.ProdutoRequestDTO;
import com.example.exemplo.dto.ProdutoResponseDTO;
import com.example.exemplo.service.ProdutoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/produto")
public class ProdutoController {
    
    @Autowired
    private ProdutoService produtoService;

        
    @PostMapping
    public ResponseEntity<Map<String, Object>> salvar(@Valid @RequestBody ProdutoRequestDTO dto){
        produtoService.salvarProduto(dto);
        return ResponseEntity
        .created(null)
        .body(Map.of("Message", "Cadastramento com sucesso", "Sucesso", true));

        
    }

    

    @GetMapping
    public ResponseEntity<List<ProdutoResponseDTO>> listar(){
        return ResponseEntity
        .ok()
        .body(produtoService.ListarProduto());
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> atualizar(
        @PathVariable Long id,
        @Valid @RequestBody  ProdutoRequestDTO dto){
            produtoService.atualizarProduto(id, dto);

            return ResponseEntity
            .ok()
            .body(Map.of("menssage", "Atualizado com sucesso", "Sucesso", "true"));
        }


    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deletarUsuario (@PathVariable Long id){
        produtoService.deletarProduto(id);
        return ResponseEntity
        .ok()
        .body(Map.of("menssage","Excluido com sucesso", "Sucesso", true));
    }
}
