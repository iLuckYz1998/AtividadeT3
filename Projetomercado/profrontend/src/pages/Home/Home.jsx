import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { produtoService, carrinhoService } from '../../services/api';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [adicionando, setAdicionando] = useState({});

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

  const adicionarAoCarrinho = async (produtoId) => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (!usuario) {
      alert('Você precisa fazer login para adicionar produtos ao carrinho!');
      navigate('/login');
      return;
    }

    try {
      setAdicionando({ ...adicionando, [produtoId]: true });
      setSucesso('');
      setErro('');

      await carrinhoService.adicionarItem(usuario.cpf, produtoId, 1);

      setSucesso('Produto adicionado ao carrinho com sucesso!');
      setTimeout(() => setSucesso(''), 3000);
    } catch (error) {
      setErro('Erro ao adicionar produto ao carrinho.');
      console.error('Erro:', error);
      setTimeout(() => setErro(''), 3000);
    } finally {
      setAdicionando({ ...adicionando, [produtoId]: false });
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

      {sucesso && <div className="sucesso-msg">{sucesso}</div>}
      {erro && <div className="erro-msg">{erro}</div>}

      {produtos.length === 0 ? (
        <p className="vazio">Nenhum produto cadastrado ainda.</p>
      ) : (
        <div className="produtos-grid">
          {produtos.map((produto) => (
            <div key={produto.id} className="produto-card">
              <div className="produto-imagem">
                <div className="placeholder-imagem">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                  </svg>
                </div>
              </div>
              <div className="produto-info-card">
                <h3>{produto.nome}</h3>
                <div className="produto-detalhes-card">
                  <span className="badge">{produto.modelo}</span>
                  <span className="badge">{produto.cor}</span>
                  <span className="badge">{produto.tamanho}</span>
                </div>
                <div className="produto-footer-card">
                  <div className="preco-destaque">
                    <span className="cifrao">R$</span>
                    <span className="valor">{produto.preco ? produto.preco.toFixed(2) : '0.00'}</span>
                  </div>
                  <p className="estoque-info">
                    {produto.quantidade > 0 ? `${produto.quantidade} em estoque` : 'Indisponível'}
                  </p>
                </div>
              </div>
              <button
                className="btn-comprar"
                onClick={() => adicionarAoCarrinho(produto.id)}
                disabled={produto.quantidade === 0 || adicionando[produto.id]}
              >
                {adicionando[produto.id] ? 'Adicionando...' : produto.quantidade > 0 ? 'Adicionar ao Carrinho' : 'Esgotado'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
