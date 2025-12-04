package com.example.exemplo.dto;

import com.example.exemplo.model.Endereco;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UsuarioRequestDTO {

    
    @NotBlank(message = "O nome é obrigatório")
    @Size(min = 3, message = "O nome deve ter no mínimo 3 caracteres")
    private String nome;

    @NotBlank(message = "O CPF é obrigatório")
    @Size(min = 11,max =11, message = "O CPF deve ter 11 dígitos")
    private String cpf;
    
    @NotBlank(message = "O email é obrigatório")
    private String email;
    
    private String telefone;

    @NotNull(message = "O endereço é obrigatório")
    private Endereco endereco;

    @NotBlank(message = "A senha é obrigatória")
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
    private String senha;

    private String tipo = "CLIENTE"; // ADMIN ou CLIENTE

}
