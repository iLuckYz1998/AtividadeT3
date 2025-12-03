package com.example.exemplo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.exemplo.model.ItemCarrinho;
import com.example.exemplo.model.Carrinho;
import com.example.exemplo.model.Produto;
import com.example.exemplo.model.Usuario;
import com.example.exemplo.repository.CarrinhoRepository;
import com.example.exemplo.repository.ProdutoRepository;
import com.example.exemplo.repository.UsuarioRepository;

@Service
public class CarrinhoService {

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    
    public Carrinho listarCarrinho(String cpf) {
        return carrinhoRepository.findByUsuarioCpf(cpf)
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado para este usuário."));
    }


    
    public Carrinho adicionarItem(String cpf, String produtoId, int quantidade) {

        
        Usuario usuario = usuarioRepository.findByCpf(cpf)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        
        Carrinho carrinho = carrinhoRepository.findByUsuarioCpf(cpf)
                .orElseGet(() -> {
                    Carrinho novo = new Carrinho();
                    novo.setUsuario(usuario);
                    return carrinhoRepository.save(novo);
                });

        
        Produto produto = produtoRepository.findByCodigo(produtoId)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado."));

        
        if (produto.getQuantidade() < quantidade) {
            throw new RuntimeException("Estoque insuficiente.");
        }

        
        ItemCarrinho itemExistente = carrinho.getItens()
                .stream()
                .filter(i -> i.getProduto().getId().equals(Long.valueOf(produtoId)))
                .findFirst()
                .orElse(null);

        if (itemExistente != null) {
            itemExistente.setQuantidade(itemExistente.getQuantidade() + quantidade);

        } else {
            ItemCarrinho novoItem = new ItemCarrinho();
            novoItem.setCarrinho(carrinho);
            novoItem.setProduto(produto);
            novoItem.setQuantidade(quantidade);
            novoItem.setPrecoUnitario(produto.getPreco());

            carrinho.getItens().add(novoItem);
        }

        
        atualizarTotal(carrinho);

        return carrinhoRepository.save(carrinho);
    }


    
    public Carrinho removerItem(String cpf, String produtoId) {

        
        Carrinho carrinho = carrinhoRepository.findByUsuarioCpf(cpf)
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado."));

        
        boolean removido = carrinho.getItens()
                .removeIf(i -> i.getProduto().getId().equals(Long.valueOf(produtoId)));

        if (!removido) {
            throw new RuntimeException("Item não encontrado no carrinho.");
        }

        
        atualizarTotal(carrinho);

        return carrinhoRepository.save(carrinho);
    }


    
    private void atualizarTotal(Carrinho carrinho) {
        double total = carrinho.getItens()
                .stream()
                .mapToDouble(i -> i.getPrecoUnitario() * i.getQuantidade())
                .sum();

        int totalItens = carrinho.getItens()
                .stream()
                .mapToInt(ItemCarrinho::getQuantidade)
                .sum();

        carrinho.setValorTotal(total);
        carrinho.setTotalItens(totalItens);
    }
}