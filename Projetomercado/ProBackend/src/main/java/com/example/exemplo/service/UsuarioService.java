package com.example.exemplo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


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
        .map(u -> new UsuarioResponseDTO(u.getNome(), u.getCpf(), u.getEmail(), u.getTipo(), u.getId()))
        .toList();
    }

     
    public Usuario salvarCliente(UsuarioRequestDTO usuarioRequestDTO){
        if(usuarioRepository.findByEmail(usuarioRequestDTO.getEmail()).isPresent() ||
           usuarioRepository.findByCpf(usuarioRequestDTO.getCpf()).isPresent()){ 
            throw new IllegalArgumentException("Cliente já cadastrado com este e-mail ou CPF.");
        }
            
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(usuarioRequestDTO.getNome());
        novoUsuario.setEmail(usuarioRequestDTO.getEmail());
        novoUsuario.setCpf(usuarioRequestDTO.getCpf());
        novoUsuario.setEndereco(usuarioRequestDTO.getEndereco());
        novoUsuario.setTelefone(usuarioRequestDTO.getTelefone());
        novoUsuario.setSenha(bCryptPasswordEncoder.encode(usuarioRequestDTO.getSenha()));
        novoUsuario.setTipo(usuarioRequestDTO.getTipo() != null ? usuarioRequestDTO.getTipo() : "CLIENTE");

        usuarioRepository.save(novoUsuario);
        return novoUsuario;
    }

        
        
    public Usuario atualizarUsuario(Long id, UsuarioRequestDTO dto){
        if(!usuarioRepository.existsById(id)){
            throw new RuntimeException("Cliente não encontrado");
        }   
        
        
        Usuario atualizarUsuario = usuarioRepository.findById(id).get();
        
        atualizarUsuario.setNome(dto.getNome());
        atualizarUsuario.setEmail(dto.getEmail());
        atualizarUsuario.setCpf(dto.getCpf());
        atualizarUsuario.setEndereco(dto.getEndereco());
        atualizarUsuario.setTelefone(dto.getTelefone());

        if (dto.getSenha() != null && !dto.getSenha().isEmpty()) {
            atualizarUsuario.setSenha(bCryptPasswordEncoder.encode(dto.getSenha()));
        }

        usuarioRepository.save(atualizarUsuario);
        return atualizarUsuario;
        
    }

        
    public void deletarUsuario(Long id){
        if(!usuarioRepository.existsById(id)){
            throw new RuntimeException("Uusario não encontrado");
        }
        usuarioRepository.deleteById(id);
    }

    public UsuarioResponseDTO login(String email, String senha){
        Usuario usuario = usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Email ou senha inválidos"));

        if(!bCryptPasswordEncoder.matches(senha, usuario.getSenha())){
            throw new RuntimeException("Email ou senha inválidos");
        }

        return new UsuarioResponseDTO(usuario.getNome(), usuario.getCpf(), usuario.getEmail(), usuario.getTipo(), usuario.getId());
    }
}