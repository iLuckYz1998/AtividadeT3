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

     // LISTAR CARRINHO -------------------------
    public Carrinho listarCarrinho(String cpf) {
        return carrinhoRepository.findByUsuarioId(cpf)
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado para este usuário."));
    }


    // ----------------------- ADICIONAR ITEM -----------------------
    public Carrinho adicionarItem(String cpf, String produtoId, int quantidade) {

        // 1. Buscar usuário
        Usuario usuario = usuarioRepository.findByCpf(cpf)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        // 2. Buscar ou criar carrinho
        Carrinho carrinho = carrinhoRepository.findByUsuarioId(cpf)
                .orElseGet(() -> {
                    Carrinho novo = new Carrinho();
                    novo.setUsuario(usuario);
                    return carrinhoRepository.save(novo);
                });

        // 3. Buscar produto
        Produto produto = produtoRepository.findByCodigo(produtoId)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado."));

        // 4. Verificar estoque
        if (produto.getQuantidade() < quantidade) {
            throw new RuntimeException("Estoque insuficiente.");
        }

        // 5. Verificar se item já existe no carrinho
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

        // 6. Atualizar total
        atualizarTotal(carrinho);

        return carrinhoRepository.save(carrinho);
    }


    // ----------------------- REMOVER ITEM -----------------------
    public Carrinho removerItem(String cpf, String produtoId) {

        // 1. Buscar carrinho
        Carrinho carrinho = carrinhoRepository.findByUsuarioId(cpf)
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado."));

        // 2. Remover item
        boolean removido = carrinho.getItens()
                .removeIf(i -> i.getProduto().getId().equals(Long.valueOf(produtoId)));

        if (!removido) {
            throw new RuntimeException("Item não encontrado no carrinho.");
        }

        // 3. Recalcular total
        atualizarTotal(carrinho);

        return carrinhoRepository.save(carrinho);
    }


    // ----------------------- FUNÇÃO AUXILIAR -----------------------
    private void atualizarTotal(Carrinho carrinho) {
        double total = carrinho.getItens()
                .stream()
                .mapToDouble(i -> i.getPrecoUnitario() * i.getQuantidade())
                .sum();

        carrinho.setValorTotal(total);
    }
}
