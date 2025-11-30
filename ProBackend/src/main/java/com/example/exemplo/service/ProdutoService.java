package com.example.exemplo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;

import com.example.exemplo.dto.ProdutoRequestDTO;
import com.example.exemplo.dto.ProdutoResponseDTO;
import com.example.exemplo.model.Produto;
import com.example.exemplo.repository.ProdutoRepository;

@Service
public class ProdutoService {
    
    @Autowired
    private ProdutoRepository produtoRepository;

    // Consulta no banco de dados
    public List<ProdutoResponseDTO> ListarProduto(){
        return produtoRepository
        .findAll()
        .stream()
        .map(p -> new ProdutoResponseDTO(p.getCodigo(),p.getNome()))
        .toList();
    }

    // Salvar um novo usuario. 
    public Produto salvarProduto(ProdutoRequestDTO produtoRequestDTO){
        if(produtoRepository.findByCodigo(produtoRequestDTO.getCodigo()).isPresent()){
            throw new RuntimeException("Produto já cadastrado");
        }
            
        Produto novoProduto = new Produto();
        novoProduto.setNome(produtoRequestDTO.getNome());
        novoProduto.setCodigo(produtoRequestDTO.getCodigo());
                
        produtoRepository.save(novoProduto);
        return novoProduto;
        }
      

    
        //Update
        @PutMapping("/{id}")
        public Produto atualizarProduto(Long id, ProdutoRequestDTO dto){
            if(!produtoRepository.existsById(id)){
                throw new RuntimeException("Produto não encontrado");
            }   
            
            Produto atualizarProduto = new Produto();
            atualizarProduto.setId(id);
            atualizarProduto.setNome(dto.getNome());
            atualizarProduto.setCodigo(dto.getCodigo());
            

            produtoRepository.save(atualizarProduto);
            return atualizarProduto;
            
        }
    
        // Delete
        @DeleteMapping("/{id}")
        public void deletarProduto(Long id){
            if(!produtoRepository.existsById(id)){
                throw new RuntimeException("Produto não encontrado");
            }   
            produtoRepository.deleteById(id);
        }   
}
