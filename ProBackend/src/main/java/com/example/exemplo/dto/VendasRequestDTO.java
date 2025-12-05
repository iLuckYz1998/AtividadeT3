package com.example.exemplo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class VendasRequestDTO {

    @NotNull(message = "O ID do comprador é obrigatório")
    private Long compradorId;

    @NotNull(message = "O ID do carrinho é obrigatório")
    private Long carrinhoId;

    @NotBlank(message = "A forma de pagamento é obrigatória")
    private String pagamento;
}
