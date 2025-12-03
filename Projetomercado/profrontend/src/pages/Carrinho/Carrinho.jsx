import { useState } from 'react';
import { carrinhoService } from '../../services/api';
import './Carrinho.css';

function Carrinho() {
  const [cpf, setCpf] = useState('');
  const [carrinho, setCarrinho] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const buscarCarrinho = async (e) => {
    if (e) e.preventDefault();

    if (!cpf.trim()) {
      setErro('Digite um CPF válido');
      return;
    }

    try {
      setLoading(true);
      setErro('');
      const data = await carrinhoService.listar(cpf);
      setCarrinho(data);
    } catch (error) {
      setErro('Erro ao buscar carrinho. Verifique se o CPF está correto.');
      setCarrinho(null);
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const removerItem = async (produtoId) => {
    try {
      const data = await carrinhoService.removerItem(cpf, produtoId);
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
      (total, item) => total + item.produto.preco * item.quantidade,
      0
    );
  };

  return (
    <div className="carrinho-page">
      <h1>Meu Carrinho</h1>

      <div className="busca-carrinho">
        <form onSubmit={buscarCarrinho}>
          <div className="form-group">
            <label htmlFor="cpf">Digite seu CPF para ver seu carrinho:</label>
            <div className="input-group">
              <input
                type="text"
                id="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
              />
              <button type="submit" className="btn-buscar" disabled={loading}>
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
          </div>
        </form>
      </div>

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
                      <p className="item-desc">{item.produto.descricao}</p>
                      <div className="item-detalhes">
                        <span>Quantidade: {item.quantidade}</span>
                        <span className="preco-unitario">
                          R$ {item.produto.preco.toFixed(2)} / un
                        </span>
                      </div>
                    </div>
                    <div className="item-acoes">
                      <div className="subtotal">
                        R$ {(item.produto.preco * item.quantidade).toFixed(2)}
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
                <button className="btn-finalizar">
                  Finalizar Compra
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
