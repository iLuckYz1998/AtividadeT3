package com.example.exemplo.dto;

import com.example.exemplo.model.Produto;
import com.example.exemplo.model.Usuario;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class VendasResponseDTO{

   private Usuario Cliente;
   private Produto produto;
   

    
}
