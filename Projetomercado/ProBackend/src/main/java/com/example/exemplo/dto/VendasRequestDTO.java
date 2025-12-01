package com.example.exemplo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class VendasRequestDTO {

    //Valida a entrada de dados do usuario conforme os criterios.
    //A api aceitará os daods somente se atender os criterios.
    // Casa contrario retorna em jsonn uma das mensagens abaixo.

    
    
    @NotBlank(message = "O Cpf do Cliente é obrigatório")
    private String cpfCliente;

  


}
