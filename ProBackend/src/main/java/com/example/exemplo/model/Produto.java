package com.example.exemplo.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Produto {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)  
 private Long id;

 @Column(nullable = false, unique=true)
 private String codigo;

 @Column(nullable = false)
 private String nome;

 @Column(nullable = false)
 private String modelo;

@Column(nullable = false)
 private String cor; 
 
 @Column(nullable = false)
 private String tamanho;

 @Column(nullable = false)
 private int quantidade;
 
 @Column(nullable = false)
 private double preco;


    
}






