import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { carrinhoService, vendasService } from '../../services/api';
import './Carrinho.css';

function Carrinho() {
  const navigate = useNavigate();
  const [carrinho, setCarrinho] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [finalizando, setFinalizando] = useState(false);
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    if (!usuario) {
      navigate('/login');
      return;
    }
    buscarCarrinho();
  }, []);

  const buscarCarrinho = async () => {
    try {
      setLoading(true);
      setErro('');
      const data = await carrinhoService.listar(usuario.cpf);
      setCarrinho(data);
    } catch (error) {
      setErro('Erro ao buscar carrinho.');
      setCarrinho(null);
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const removerItem = async (produtoId) => {
    try {
      const data = await carrinhoService.removerItem(usuario.cpf, produtoId);
      setCarrinho(data);
      setErro('');
    } catch (error) {
      setErro('Erro ao remover item do carrinho.');
      console.error('Erro:', error);
    }
  };

  const calcularTotal = () => {
    if (!carrinho || !carrinho.itens) return 0;
    return carrinho.itens.reduce(
      (total, item) => total + item.precoUnitario * item.quantidade,
      0
    );
  };

  const finalizarCompra = async () => {
    if (!carrinho || !carrinho.itens || carrinho.itens.length === 0) {
      setErro('Seu carrinho está vazio!');
      return;
    }

    if (!window.confirm('Deseja finalizar a compra?')) {
      return;
    }

    try {
      setFinalizando(true);
      setErro('');
      setSucesso('');

      const venda = {
        usuarioCpf: usuario.cpf,
        valorTotal: calcularTotal()
      };

      await vendasService.criar(venda);

      setSucesso('Compra finalizada com sucesso!');

      // Limpar carrinho após 2 segundos e recarregar
      setTimeout(async () => {
        await buscarCarrinho();
        setSucesso('');
      }, 2000);

    } catch (error) {
      setErro('Erro ao finalizar compra. Tente novamente.');
      console.error('Erro:', error);
    } finally {
      setFinalizando(false);
    }
  };

  if (loading) {
    return (
      <div className="carrinho-page">
        <h1>Meu Carrinho</h1>
        <div className="loading">Carregando carrinho...</div>
      </div>
    );
  }

  return (
    <div className="carrinho-page">
      <h1>Meu Carrinho</h1>

      {sucesso && <div className="sucesso">{sucesso}</div>}
      {erro && <div className="erro">{erro}</div>}

      {carrinho && (
        <div className="carrinho-container">
          {!carrinho.itens || carrinho.itens.length === 0 ? (
            <div className="carrinho-vazio">
              <h2>Seu carrinho está vazio</h2>
              <p>Adicione produtos para começar suas compras!</p>
            </div>
          ) : (
            <>
              <div className="itens-carrinho">
                <h2>Itens no Carrinho</h2>
                {carrinho.itens.map((item, index) => (
                  <div key={index} className="item-carrinho">
                    <div className="item-info">
                      <h3>{item.produto.nome}</h3>
                      <p className="item-desc">Modelo: {item.produto.modelo} | Cor: {item.produto.cor} | Tamanho: {item.produto.tamanho}</p>
                      <div className="item-detalhes">
                        <span>Quantidade: {item.quantidade}</span>
                        <span className="preco-unitario">
                          R$ {item.precoUnitario.toFixed(2)} / un
                        </span>
                      </div>
                    </div>
                    <div className="item-acoes">
                      <div className="subtotal">
                        R$ {(item.precoUnitario * item.quantidade).toFixed(2)}
                      </div>
                      <button
                        className="btn-remover"
                        onClick={() => removerItem(item.produto.id)}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="resumo-carrinho">
                <h2>Resumo do Pedido</h2>
                <div className="resumo-linha">
                  <span>Subtotal:</span>
                  <span>R$ {calcularTotal().toFixed(2)}</span>
                </div>
                <div className="resumo-linha">
                  <span>Frete:</span>
                  <span>A calcular</span>
                </div>
                <div className="resumo-total">
                  <span>Total:</span>
                  <span>R$ {calcularTotal().toFixed(2)}</span>
                </div>
                <button
                  className="btn-finalizar"
                  onClick={finalizarCompra}
                  disabled={finalizando}
                >
                  {finalizando ? 'Finalizando...' : 'Finalizar Compra'}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Carrinho;
