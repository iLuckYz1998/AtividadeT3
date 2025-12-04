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


  criar: (produto, usuarioId) => request('/produtos', {
    method: 'POST',
    body: JSON.stringify(produto),
    headers: {
      'Usuario-Id': usuarioId
    }
  }),


  atualizar: (id, produto, usuarioId) => request(`/produtos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(produto),
    headers: {
      'Usuario-Id': usuarioId
    }
  }),


  deletar: (id, usuarioId) => request(`/produtos/${id}`, {
    method: 'DELETE',
    headers: {
      'Usuario-Id': usuarioId
    }
  }),
};

export const usuarioService = {
  listar: () => request('/usuario'),

  criar: (usuario) => request('/usuario', {
    method: 'POST',
    body: JSON.stringify(usuario),
  }),

  login: (credentials) => request('/usuario/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
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

export const vendasService = {
  listar: () => request('/vendas'),

  criar: (venda) => request('/vendas', {
    method: 'POST',
    body: JSON.stringify(venda),
  }),

  buscarPorCpf: (cpf) => request(`/vendas/usuario/${cpf}`),
};