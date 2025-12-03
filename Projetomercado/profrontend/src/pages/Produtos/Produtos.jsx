import { useState, useEffect } from 'react';
import { produtoService } from '../../services/api';
import './Produtos.css';

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [modoEdicao, setModoEdicao] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);

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
      setLoading(true);
      const data = await produtoService.listar();
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
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

    try {
      const produto = {
        nome: formData.nome,
        descricao: formData.descricao,
        preco: parseFloat(formData.preco),
        estoque: parseInt(formData.estoque)
      };

      if (modoEdicao && produtoEditando) {
        await produtoService.atualizar(produtoEditando.id, produto);
        setMensagem('Produto atualizado com sucesso!');
      } else {
        await produtoService.criar(produto);
        setMensagem('Produto cadastrado com sucesso!');
      }

      setErro('');
      limparFormulario();
      carregarProdutos();
    } catch (error) {
      setErro('Erro ao salvar produto. Verifique os dados.');
      setMensagem('');
      console.error('Erro:', error);
    }
  };

  const handleEditar = (produto) => {
    setFormData({
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco.toString(),
      estoque: produto.estoque.toString()
    });
    setProdutoEditando(produto);
    setModoEdicao(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeletar = async (id) => {
    if (!window.confirm('Deseja realmente excluir este produto?')) {
      return;
    }

    try {
      await produtoService.deletar(id);
      setMensagem('Produto excluído com sucesso!');
      setErro('');
      carregarProdutos();
    } catch (error) {
      setErro('Erro ao excluir produto.');
      console.error('Erro:', error);
    }
  };

  const limparFormulario = () => {
    setFormData({
      nome: '',
      descricao: '',
      preco: '',
      estoque: ''
    });
    setModoEdicao(false);
    setProdutoEditando(null);
  };

  return (
    <div className="produtos-page">
      <h1>Gerenciar Produtos</h1>

      {mensagem && <div className="sucesso">{mensagem}</div>}
      {erro && <div className="erro">{erro}</div>}

      <div className="produtos-container">
        <div className="form-container">
          <h2>{modoEdicao ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h2>

          <form onSubmit={handleSubmit} className="form-produto">
            <div className="form-group">
              <label htmlFor="nome">Nome *</label>
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

            <div className="form-row">
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

            <div className="form-buttons">
              <button type="submit" className="btn-submit">
                {modoEdicao ? 'Atualizar' : 'Cadastrar'}
              </button>
              {modoEdicao && (
                <button
                  type="button"
                  className="btn-cancelar"
                  onClick={limparFormulario}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="lista-container">
          <h2>Produtos Cadastrados</h2>

          {loading ? (
            <p>Carregando...</p>
          ) : produtos.length === 0 ? (
            <p className="vazio">Nenhum produto cadastrado.</p>
          ) : (
            <div className="produtos-lista">
              {produtos.map((produto) => (
                <div key={produto.id} className="produto-item">
                  <div className="produto-info">
                    <h3>{produto.nome}</h3>
                    <p className="desc">{produto.descricao}</p>
                    <div className="produto-detalhes">
                      <span className="preco">
                        R$ {produto.preco ? produto.preco.toFixed(2) : '0.00'}
                      </span>
                      <span className="estoque">
                        Estoque: {produto.estoque}
                      </span>
                    </div>
                  </div>
                  <div className="produto-acoes">
                    <button
                      className="btn-editar"
                      onClick={() => handleEditar(produto)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-excluir"
                      onClick={() => handleDeletar(produto.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Produtos;
