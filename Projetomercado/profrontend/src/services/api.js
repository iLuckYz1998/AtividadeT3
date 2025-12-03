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
    throw new Error(`Erro na requisição: ${response.statusText}`);
  }

  return response.json();
}

export const produtoService = {
  listar: () => request('/produto'),

  criar: (produto) => request('/produto', {
    method: 'POST',
    body: JSON.stringify(produto),
  }),

  atualizar: (id, produto) => request(`/produto/${id}`, {
    method: 'PUT',
    body: JSON.stringify(produto),
  }),

  deletar: (id) => request(`/produto/${id}`, {
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
