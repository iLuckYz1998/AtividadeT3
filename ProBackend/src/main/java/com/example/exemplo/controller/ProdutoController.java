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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.exemplo.dto.ProdutoRequestDTO;
import com.example.exemplo.dto.ProdutoResponseDTO;
import com.example.exemplo.model.Usuario;
import com.example.exemplo.repository.UsuarioRepository;
import com.example.exemplo.service.ProdutoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/produtos") 
public class ProdutoController {
    
    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private void validarAdmin(Long usuarioId){
        if(usuarioId == null){
            throw new RuntimeException("Usuário não autenticado");
        }

        Usuario usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if(!"ADMIN".equals(usuario.getTipo())){
            throw new RuntimeException("Apenas administradores podem realizar esta operação");
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> salvar(
        @RequestHeader(value = "Usuario-Id", required = false) Long usuarioId,
        @Valid @RequestBody ProdutoRequestDTO dto){
        validarAdmin(usuarioId);
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
        @RequestHeader(value = "Usuario-Id", required = false) Long usuarioId,
        @PathVariable Long id,
        @Valid @RequestBody  ProdutoRequestDTO dto){
            validarAdmin(usuarioId);
            produtoService.atualizarProduto(id, dto);

            return ResponseEntity
            .ok()
            .body(Map.of("menssage", "Atualizado com sucesso", "Sucesso", "true"));
        }


    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deletarUsuario (
        @RequestHeader(value = "Usuario-Id", required = false) Long usuarioId,
        @PathVariable Long id){
        validarAdmin(usuarioId);
        produtoService.deletarProduto(id);

        return ResponseEntity
        .ok()
        .body(Map.of("menssage", "Produto deletado com sucesso", "Sucesso", "true"));
    }
}