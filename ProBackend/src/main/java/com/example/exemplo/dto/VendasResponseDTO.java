package com.example.exemplo.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VendasResponseDTO {

    private Long id;
    private String nomeCliente;
    private double valorTotal;
    private String pagamento;
    private LocalDateTime dataVenda;
}
