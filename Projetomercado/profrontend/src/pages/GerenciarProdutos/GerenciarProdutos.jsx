import { useState, useEffect } from 'react';
import { produtoService } from '../../services/api';
import './GerenciarProdutos.css';

function GerenciarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [editando, setEditando] = useState(null);

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    estoque: ''
  });

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const data = await produtoService.listar();
      setProdutos(data);
    } catch (error) {
      setErro('Erro ao carregar produtos');
      console.error('Erro:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');
    setErro('');

    try {
      const usuario = JSON.parse(localStorage.getItem('usuario'));

      const produto = {
        nome: formData.nome,
        descricao: formData.descricao,
        preco: parseFloat(formData.preco),
        estoque: parseInt(formData.estoque)
      };

      if (editando) {
        await produtoService.atualizar(editando, produto, usuario.id);
        setMensagem('Produto atualizado com sucesso!');
      } else {
        await produtoService.criar(produto, usuario.id);
        setMensagem('Produto cadastrado com sucesso!');
      }

      setFormData({ nome: '', descricao: '', preco: '', estoque: '' });
      setEditando(null);
      carregarProdutos();

    } catch (error) {
      setErro('Erro ao salvar produto: ' + error.message);
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = (produto) => {
    setFormData({
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco.toString(),
      estoque: produto.estoque.toString()
    });
    setEditando(produto.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelarEdicao = () => {
    setFormData({ nome: '', descricao: '', preco: '', estoque: '' });
    setEditando(null);
  };

  const handleDeletar = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este produto?')) {
      return;
    }

    try {
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      await produtoService.deletar(id, usuario.id);
      setMensagem('Produto deletado com sucesso!');
      carregarProdutos();
    } catch (error) {
      setErro('Erro ao deletar produto: ' + error.message);
      console.error('Erro:', error);
    }
  };

  return (
    <div className="gerenciar-produtos">
      <h1>Gerenciar Produtos</h1>

      {mensagem && <div className="sucesso">{mensagem}</div>}
      {erro && <div className="erro">{erro}</div>}

      <div className="form-container">
        <h2>{editando ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h2>
        <form onSubmit={handleSubmit} className="form-produto">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nome">Nome do Produto *</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="preco">Preço (R$) *</label>
              <input
                type="number"
                id="preco"
                name="preco"
                value={formData.preco}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="estoque">Estoque *</label>
              <input
                type="number"
                id="estoque"
                name="estoque"
                value={formData.estoque}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição *</label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Salvando...' : editando ? 'Atualizar Produto' : 'Cadastrar Produto'}
            </button>
            {editando && (
              <button type="button" className="btn-cancel" onClick={handleCancelarEdicao}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="lista-produtos">
        <h2>Produtos Cadastrados</h2>
        {produtos.length === 0 ? (
          <p className="sem-produtos">Nenhum produto cadastrado ainda.</p>
        ) : (
          <table className="tabela-produtos">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.id}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.descricao}</td>
                  <td>R$ {produto.preco.toFixed(2)}</td>
                  <td>{produto.estoque}</td>
                  <td className="acoes">
                    <button
                      className="btn-editar"
                      onClick={() => handleEditar(produto)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-deletar"
                      onClick={() => handleDeletar(produto.id)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default GerenciarProdutos;
