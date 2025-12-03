package com.example.exemplo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ProdutoResponseDTO{

    private Long id;
    private String codigo;
    private String nome;
    private String modelo;
    private String cor;
    private String tamanho;
    private int quantidade;
    private double preco;

}
