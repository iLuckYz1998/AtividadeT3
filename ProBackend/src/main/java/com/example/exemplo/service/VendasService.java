package com.example.exemplo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.exemplo.dto.VendasRequestDTO;
import com.example.exemplo.dto.VendasResponseDTO;
import com.example.exemplo.model.Carrinho;
import com.example.exemplo.model.Usuario;
import com.example.exemplo.model.Vendas;
import com.example.exemplo.repository.CarrinhoRepository;
import com.example.exemplo.repository.UsuarioRepository;
import com.example.exemplo.repository.VendasRepository;

@Service
public class VendasService {

    @Autowired
    private VendasRepository vendasRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    public Vendas salvarVenda(VendasRequestDTO dto) {
        Usuario comprador = usuarioRepository.findById(dto.getCompradorId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Carrinho carrinho = carrinhoRepository.findById(dto.getCarrinhoId())
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));

        Vendas venda = new Vendas();
        venda.setComprador(comprador);
        venda.setCarrinho(carrinho);
        venda.setPagamento(dto.getPagamento());
        venda.setDataVenda(LocalDateTime.now());

        return vendasRepository.save(venda);
    }

    public List<VendasResponseDTO> listarTodas() {
        return vendasRepository.findAll()
                .stream()
                .map(v -> new VendasResponseDTO(
                        v.getId(),
                        v.getComprador().getNome(),
                        v.getCarrinho().getValorTotal(),
                        v.getPagamento(),
                        v.getDataVenda()
                ))
                .toList();
    }

    public VendasResponseDTO buscarPorId(Long id) {
        Vendas venda = vendasRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venda não encontrada"));

        return new VendasResponseDTO(
                venda.getId(),
                venda.getComprador().getNome(),
                venda.getCarrinho().getValorTotal(),
                venda.getPagamento(),
                venda.getDataVenda()
        );
    }

    public void deletarVenda(Long id) {
        if (!vendasRepository.existsById(id)) {
            throw new RuntimeException("Venda não encontrada");
        }
        vendasRepository.deleteById(id);
    }
}