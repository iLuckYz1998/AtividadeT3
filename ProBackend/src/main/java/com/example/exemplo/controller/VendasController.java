package com.example.exemplo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.exemplo.dto.VendasRequestDTO;
import com.example.exemplo.dto.VendasResponseDTO;
import com.example.exemplo.service.VendasService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/vendas")
public class VendasController {

    @Autowired
    private VendasService vendasService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> salvar(@Valid @RequestBody VendasRequestDTO dto) {
        vendasService.salvarVenda(dto);
        return ResponseEntity
                .created(null)
                .body(Map.of("Message", "Venda registrada com sucesso", "Sucesso", true));
    }

    @GetMapping
    public ResponseEntity<List<VendasResponseDTO>> listarTodas() {
        return ResponseEntity.ok(vendasService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendasResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(vendasService.buscarPorId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deletarVenda(@PathVariable Long id) {
        vendasService.deletarVenda(id);

        return ResponseEntity
                .ok()
                .body(Map.of("message", "Venda deletada com sucesso", "Sucesso", true));
    }
}