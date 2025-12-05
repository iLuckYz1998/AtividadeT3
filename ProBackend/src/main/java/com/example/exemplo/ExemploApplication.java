package com.example.exemplo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.exemplo.model.Carrinho;
import com.example.exemplo.model.Endereco;
import com.example.exemplo.model.Usuario;
import com.example.exemplo.repository.UsuarioRepository;

@SpringBootApplication
public class ExemploApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExemploApplication.class, args);
	}

	@Bean
	public CommandLineRunner criarAdminPadrao(UsuarioRepository usuarioRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
		return args -> {
			// Verificar se admin já existe
			if (usuarioRepository.findByEmail("admin@mercado.com").isEmpty()) {
				Usuario admin = new Usuario();
				admin.setNome("Administrador");
				admin.setCpf("000.000.000-00");
				admin.setEmail("admin@mercado.com");
				admin.setSenha(bCryptPasswordEncoder.encode("admin123"));
				admin.setTipo("ADMIN");
				admin.setTelefone("0000-0000");
				
				// Criar endereço padrão
				Endereco endereco = new Endereco();
				endereco.setRua("Administração");
				endereco.setNumero("0");
				endereco.setCidade("Sistema");
				endereco.setEstado("SP");
				endereco.setCep("00000-000");
				admin.setEndereco(endereco);
				
				// Criar carrinho para admin
				Carrinho carrinho = new Carrinho();
				admin.setCarrinho(carrinho);
				carrinho.setUsuario(admin);
				
				usuarioRepository.save(admin);
				System.out.println("✓ Usuário admin criado com sucesso!");
				System.out.println("  Email: admin@mercado.com");
				System.out.println("  Senha: admin123");
			}
		};
	}

}
