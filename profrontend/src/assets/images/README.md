# Imagens do Sistema

## Organização de Assets

Esta pasta contém todas as imagens utilizadas no sistema.

### Imagens Disponíveis:

1. **carrinho-de-compras.png**
   - Ícone do carrinho de compras
   - Usado no logo do header
   - Tamanho: 40x40px (redimensionado via CSS)
   - Cor: Branca (aplicado filtro CSS)

2. **background-login.jpg**
   - Imagem de fundo para páginas de autenticação
   - Usado em: Login e Cadastro
   - Efeito: Desfocado com overlay azul (backdrop-filter: blur)
   - Crédito: Jezael Melgoza (Unsplash)

### Uso no Código:

```javascript
// Importar imagem no componente
import carrinhoIcon from '../../assets/images/carrinho-de-compras.png';

// Ou via CSS
background-image: url('../../assets/images/background-login.jpg');
```

### Padronização:

- Todas as imagens devem ser colocadas nesta pasta
- Use nomes descritivos em kebab-case
- Mantenha tamanhos otimizados para web
- Documente novas imagens adicionadas aqui
