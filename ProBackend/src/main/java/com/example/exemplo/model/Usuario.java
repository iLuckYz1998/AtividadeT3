
package com.example.exemplo.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    @OneToOne(cascade=CascadeType.ALL)
     @Column(nullable=false)
    private Endereco endereco;

    @OneToOne(cascade = CascadeType.ALL)
    @Column(nullable=true)
    private Carrinho carrinho;
}
