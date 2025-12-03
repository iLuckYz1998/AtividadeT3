import { useState, useEffect } from 'react';
import { produtoService } from '../../services/api';
import './Home.css';

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const data = await produtoService.listar();
      setProdutos(data);
      setErro('');
    } catch (error) {
      setErro('Erro ao carregar produtos. Verifique se o backend está rodando.');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="home">
        <h1>Bem-vindo ao Mercado Online</h1>
        <div className="loading">Carregando produtos...</div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="home">
        <h1>Bem-vindo ao Mercado Online</h1>
        <div className="erro">{erro}</div>
      </div>
    );
  }

  return (
    <div className="home">
      <h1>Bem-vindo ao Mercado Online</h1>
      <p className="subtitle">Confira nossos produtos em destaque</p>

      {produtos.length === 0 ? (
        <p className="vazio">Nenhum produto cadastrado ainda.</p>
      ) : (
        <div className="produtos-grid">
          {produtos.map((produto) => (
            <div key={produto.id} className="produto-card">
              <div className="produto-header">
                <h3>{produto.nome}</h3>
              </div>
              <div className="produto-body">
                <p className="modelo">Modelo: {produto.modelo}</p>
                <p className="cor">Cor: {produto.cor}</p>
                <p className="tamanho">Tamanho: {produto.tamanho}</p>
                <p className="preco">
                  R$ {produto.preco ? produto.preco.toFixed(2) : '0.00'}
                </p>
                <p className="quantidade">
                  Disponível: {produto.quantidade || 0} unidades
                </p>
              </div>
              <button className="btn-comprar">Adicionar ao Carrinho</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
