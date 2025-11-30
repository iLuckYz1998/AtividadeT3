package com.example.atvback_end.controller;

import org.springframework.web.bind.annotation.GetMapping;

public class Welcome {
    @GetMapping
    public String welcome(){
        return "VAmos Começar o Projeto!";
    }
    
}
