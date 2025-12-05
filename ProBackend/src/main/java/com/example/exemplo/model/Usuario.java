package com.example.exemplo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
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
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable=false)
    private String nome;

    @Column(nullable=false, unique=true)
    private String email;

    @Column(nullable=false, unique=true)
    private String cpf;

    @Column(nullable=false)
    private String senha;

    @Column(nullable=true)
    private String telefone;

    @Column(nullable=false)
    private String tipo = "CLIENTE"; // ADMIN ou CLIENTE

    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "endereco_id", nullable=false)
    private Endereco endereco;

    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "carrinho_id", nullable=true)
    @JsonIgnore
    private Carrinho carrinho;
}