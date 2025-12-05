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
    codigo: '',
    nome: '',
    modelo: '',
    cor: '',
    tamanho: '',
    quantidade: '',
    preco: ''
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

      // Validação cliente igual às anotações do backend
      if (!formData.codigo || formData.codigo.trim().length < 3) {
        setErro('O código é obrigatório e deve ter pelo menos 3 caracteres.');
        setLoading(false);
        return;
      }

      if (!formData.nome || formData.nome.trim().length < 3) {
        setErro('O nome é obrigatório e deve ter pelo menos 3 caracteres.');
        setLoading(false);
        return;
      }

      const quantidadeNum = parseInt(formData.quantidade);
      const precoNum = parseFloat(formData.preco);

      if (isNaN(quantidadeNum) || quantidadeNum < 0) {
        setErro('A quantidade deve ser um número inteiro maior ou igual a 0.');
        setLoading(false);
        return;
      }

      if (isNaN(precoNum) || precoNum <= 0) {
        setErro('O preço deve ser um número maior que 0.');
        setLoading(false);
        return;
      }

      const produto = {
        codigo: formData.codigo.trim(),
        nome: formData.nome.trim(),
        modelo: formData.modelo.trim(),
        cor: formData.cor.trim(),
        tamanho: formData.tamanho.trim(),
        quantidade: quantidadeNum,
        preco: precoNum,
      };

      if (editando) {
        await produtoService.atualizar(editando, produto, usuario.id);
        setMensagem('Produto atualizado com sucesso!');
      } else {
        await produtoService.criar(produto, usuario.id);
        setMensagem('Produto cadastrado com sucesso!');
      }

      setFormData({ codigo: '', nome: '', modelo: '', cor: '', tamanho: '', quantidade: '', preco: '' });
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
      codigo: produto.codigo,
      nome: produto.nome,
      modelo: produto.modelo,
      cor: produto.cor,
      tamanho: produto.tamanho,
      quantidade: produto.quantidade.toString(),
      preco: produto.preco.toString()
    });
    setEditando(produto.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelarEdicao = () => {
    setFormData({ codigo: '', nome: '', modelo: '', cor: '', tamanho: '', quantidade: '', preco: '' });
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
              <label htmlFor="codigo">Código do Produto *</label>
              <input
                type="text"
                id="codigo"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
                required
                minLength={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="nome">Nome do Produto *</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                minLength={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="modelo">Modelo *</label>
              <input
                type="text"
                id="modelo"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cor">Cor *</label>
              <input
                type="text"
                id="cor"
                name="cor"
                value={formData.cor}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="tamanho">Tamanho *</label>
              <input
                type="text"
                id="tamanho"
                name="tamanho"
                value={formData.tamanho}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantidade">Quantidade *</label>
              <input
                type="number"
                id="quantidade"
                name="quantidade"
                value={formData.quantidade}
                onChange={handleChange}
                min="0"
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
                <th>Código</th>
                <th>Nome</th>
                <th>Modelo</th>
                <th>Cor</th>
                <th>Tamanho</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => (
                <tr key={produto.id}>
                  <td>{produto.id}</td>
                  <td>{produto.codigo}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.modelo}</td>
                  <td>{produto.cor}</td>
                  <td>{produto.tamanho}</td>
                  <td>{produto.quantidade}</td>
                  <td>R$ {produto.preco.toFixed(2)}</td>
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
