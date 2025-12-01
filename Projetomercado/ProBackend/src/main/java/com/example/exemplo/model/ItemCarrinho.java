package com.example.exemplo.model;

import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ItemCarrinho {
    
    @ManyToOne
    private Carrinho carrinho;

    @ManyToOne
    private Produto produto;

    private int quantidade;
    private double precoUnitario;

}
