package com.example.exemplo.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn; 
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vendas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    
    @OneToOne 
    @JoinColumn(name = "comprador_id", nullable = false) 
    private Usuario comprador; 

    @OneToOne
    @JoinColumn(name = "carrinho_id", nullable = false) 
    private Carrinho carrinho;
    
    @Column(nullable = false)
    private String pagamento;

    @Column(nullable = false)
    private LocalDateTime dataVenda;
}