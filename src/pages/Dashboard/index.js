import { useEffect, useState } from 'react';

import { Container, FormTransaction, Title, Transactions } from './styles';

function Dashboard() {
  const [usuario] = useState(JSON.parse(localStorage.getItem('@expense-email')));
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [tipo, setTipo] = useState("entrada");
  const [transacoes, setTransacoes] = useState([]);
  const [saldo, setSaldo] = useState(0);
  
  useEffect(() => {
    let transacoesLocal = localStorage.getItem('@transacoes');
    setTransacoes([...JSON.parse(transacoesLocal)]);
  }, []);

  useEffect(() => {
    localStorage.setItem('@transacoes', JSON.stringify(transacoes));
  }, [transacoes])

  useEffect(() => {
    const entradas = transacoes.filter(t => t.tipo === 'entrada');
    const saidas = transacoes.filter(t => t.tipo === 'saida');

    let valorEntrada = 0;
    let valorSaida = 0;

    entradas.map(entrada => valorEntrada = parseFloat(valorEntrada) + parseFloat(entrada.valor));

    saidas.map(saida => valorSaida = parseFloat(valorSaida) + parseFloat(saida.valor));

    setSaldo(valorEntrada - valorSaida);
  }, [transacoes]);

  useEffect(() => {
    localStorage.setItem('@saldo', JSON.stringify(saldo));
  }, [saldo])

  function HandleFormSubmit(e) {
    e.preventDefault();

    let obj = {
      descricao, valor, tipo,
      id: Math.floor(Math.random() * 9999),
    }

    setTransacoes([...transacoes, obj]);
    setDescricao("");
    setValor(0);
  }

  function DeleteTransaction(transaction) {
    setTransacoes([...transacoes.filter(t => t !== transaction)]);
  }

  return (
    <Container>
      <Title>
        <h1>Minha Carteira</h1>
        <p>Olá, {usuario}</p>
      </Title>

      <FormTransaction onSubmit={HandleFormSubmit}>
        <button type='submit'>
          Adicionar
        </button>
        <input type="text" onChange={(e) => setDescricao(e.target.value)} required placeholder='Ex: gasolina...' value={descricao} />
        <input type="number" onChange={(e) => setValor(e.target.value)} required placeholder='valor' value={valor} />
        <select name="tipo" onChange={(e) => setTipo(e.target.value)}>
          <option value="entrada">Entrada</option>
          <option value="saida">Saida</option>
        </select>
      </FormTransaction>

      <Transactions>
        <span className='saldo'>Meu saldo {saldo} R$</span>

        <p>Historico de transações</p>

        <ul>
          {transacoes.map(transaction => (
            <li key={transaction.id}>
              <span>
                <span className={transaction.tipo === 'saida' ? 'saida' : 'entrada'}>{transaction.tipo}</span>
                <span className='descricao'>{transaction.descricao}</span>
                <span className='valor'>{transaction.valor} R$</span>
              </span>
              <button type='button' onClick={() => DeleteTransaction(transaction)}>Deletar</button>
            </li>
          ))}
        </ul>
      </Transactions>
    </Container>
  )
}

export default Dashboard;
