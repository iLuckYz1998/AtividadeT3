package com.example.exemplo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoRequestDTO {

    @NotBlank(message = "O codigo é obrigatória")
    @Size(min = 3, message = "O codigo deve ter no mínimo 3 digitos")
    private String codigo;

    @NotBlank(message = "O nome é obrigatório")
    @Size(min = 3, message = "O nome deve ter no mínimo 3 caracteres")
    private String nome;
   
    @NotBlank(message = "O modelo é obrigatório")
    private String modelo;

    @NotBlank(message = "A cor é obrigatória")
    private String cor;

     @NotBlank(message = "A quantidade é obrigatória")
    private int quantidade;

     @NotBlank(message = "A preço é obrigatória")
    private double preco;





     
 
    





}
