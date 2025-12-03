package com.example.exemplo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;

import com.example.exemplo.dto.UsuarioRequestDTO;
import com.example.exemplo.dto.UsuarioResponseDTO;
import com.example.exemplo.model.Usuario;
import com.example.exemplo.repository.UsuarioRepository;



@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    
    public List<UsuarioResponseDTO> ListarTodos(){
        return usuarioRepository
        .findAll()
        .stream()
        .map(u -> new UsuarioResponseDTO(u.getNome(), u.getEmail()))
        .toList();
    }

     
    public Usuario salvarCliente(UsuarioRequestDTO usuarioRequestDTO){
        if(usuarioRepository.findByEmail(usuarioRequestDTO.getEmail()).isPresent()){
            throw new RuntimeException("Cliente já cadastrado");
        }
            
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(usuarioRequestDTO.getNome());
        novoUsuario.setEmail(usuarioRequestDTO.getEmail());
        
        novoUsuario.setSenha(bCryptPasswordEncoder.encode(usuarioRequestDTO.getSenha()));
        
        usuarioRepository.save(novoUsuario);
        return novoUsuario;
        }

        

    
        
        @PutMapping("/{id}")
        public Usuario atualizarUsuario(Long id, UsuarioRequestDTO dto){
            if(!usuarioRepository.existsById(id)){
                throw new RuntimeException("Cliente não encontrado");
            }   
            
            Usuario atualizarUsuario = new Usuario();
            atualizarUsuario.setId(id);
            atualizarUsuario.setNome(dto.getNome());
            atualizarUsuario.setEmail(dto.getEmail());
            atualizarUsuario.setSenha(bCryptPasswordEncoder.encode(dto.getSenha()));

            usuarioRepository.save(atualizarUsuario);
            return atualizarUsuario;
            
        }
    
        
        @DeleteMapping("/{id}")
        public void deletarUsuario(Long id){
            if(!usuarioRepository.existsById(id)){
                throw new RuntimeException("Uusario não encontrado");
            }   
            usuarioRepository.deleteById(id);
        }   
}

