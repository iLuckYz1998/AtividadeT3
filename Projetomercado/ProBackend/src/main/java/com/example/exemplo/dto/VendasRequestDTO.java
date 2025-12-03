package com.example.exemplo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class VendasRequestDTO {

    
    
    
    @NotBlank(message = "O Cpf do Cliente é obrigatório")
    private String cpfCliente;

  


}
