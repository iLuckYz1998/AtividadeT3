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

import com.example.exemplo.dto.LoginRequestDTO;
import com.example.exemplo.dto.UsuarioRequestDTO;
import com.example.exemplo.dto.UsuarioResponseDTO;
import com.example.exemplo.service.UsuarioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    
    @PostMapping
    public ResponseEntity<Map<String, Object>> salvar(@Valid @RequestBody UsuarioRequestDTO dto){
        usuarioService.salvarCliente(dto);
        return ResponseEntity
        .created(null)
        .body(Map.of("Message", "Cadastramento com sucesso", "Sucesso", true));

        
    }

    

    @GetMapping
    public ResponseEntity<List<UsuarioResponseDTO>> listar(){
        return ResponseEntity
        .ok()
        .body(usuarioService.ListarTodos());
    }

    
    @PutMapping("/{id}") 
    public ResponseEntity<Map<String, Object>> atualizar(
        @PathVariable Long id,
        @Valid @RequestBody  UsuarioRequestDTO dto){ 
            usuarioService.atualizarUsuario(id, dto);

            return ResponseEntity
            .ok()
            .body(Map.of("menssage", "Atualizado com sucesso", "Sucesso", "true"));
        }

       
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deletarUsuario (@PathVariable Long id){
        usuarioService.deletarUsuario(id);

        return ResponseEntity
        .ok()
        .body(Map.of("menssage", "Usuario deletado com sucesso", "Sucesso", "true"));
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioResponseDTO> login(@Valid @RequestBody LoginRequestDTO dto){
        UsuarioResponseDTO usuario = usuarioService.login(dto.getEmail(), dto.getSenha());
        return ResponseEntity.ok(usuario);
    }
}