package com.example.exemplo.model;

import java.util.ArrayList;
import java.util.List;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Carrinho {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long Id;

private Usuario usuario;

  @OneToMany(mappedBy = "carrinho", cascade = CascadeType.ALL, orphanRemoval = true)
 private List<ItemCarrinho> itens = new ArrayList<>();

@Column(nullable=false)
private int totalItens;

@Column(nullable=false)
double valorTotal;

@Column(nullable=false)
private String cpfUsuario;




}
