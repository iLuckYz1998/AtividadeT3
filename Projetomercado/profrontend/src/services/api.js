const API_BASE_URL = 'http://localhost:8080';

async function request(url, options = {}) {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    
    const errorBody = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(`Erro na requisição: ${errorBody.message || response.statusText}`);
  }


  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return {};
  }
  
  return response.json();
}

export const produtoService = {
  
  listar: () => request('/produtos'),

 
  criar: (produto) => request('/produtos', {
    method: 'POST',
    body: JSON.stringify(produto),
  }),

 
  atualizar: (id, produto) => request(`/produtos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(produto),
  }),

  
  deletar: (id) => request(`/produtos/${id}`, {
    method: 'DELETE',
  }),
};

export const usuarioService = {
  listar: () => request('/usuario'),

  criar: (usuario) => request('/usuario', {
    method: 'POST',
    body: JSON.stringify(usuario),
  }),
};

export const carrinhoService = {
  listar: (cpf) => request(`/carrinho/${cpf}`),

  adicionarItem: (cpf, produtoId, quantidade) =>
    request(`/carrinho/${cpf}/adicionar`, {
      method: 'POST',
      body: JSON.stringify({ produtoId, quantidade }),
    }),

  removerItem: (cpf, produtoId) =>
    request(`/carrinho/${cpf}/remover/${produtoId}`, {
      method: 'DELETE',
    }),
};