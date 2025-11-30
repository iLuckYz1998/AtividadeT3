package com.example.exemplo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/")

public class welcome {

    @GetMapping    
    public String aplicacao(){
        return "Sua aplicação está funcionando!";
    }

}
