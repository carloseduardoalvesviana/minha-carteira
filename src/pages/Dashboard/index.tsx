import { useEffect, useState } from 'react';
import { Container, FormTransaction, Title, Transactions } from './styles';

type transacao = {
  valor: any;
  tipo: string;
  descricao: string;
  id: number;
}

function Dashboard() {
  const [descricao, setDescricao] = useState<string>("");
  const [valor, setValor] = useState<number>(0);
  const [tipo, setTipo] = useState<string>("entrada");
  const [transacoes, setTransacoes] = useState<transacao[]>([]);
  const [saldo, setSaldo] = useState(0);

  function HandleValorChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValor(parseFloat(e.target.value));
  }

  function HandleDescricaoChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDescricao(e.target.value);
  }

  function HandleTipoChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setTipo(e.target.value);
  }

  useEffect(() => {
    let transacoesLocal = localStorage.getItem('@transacoes');
    setTransacoes([...JSON.parse(transacoesLocal)]);
  }, []);

  useEffect(() => {
    const entradas = transacoes.filter(t => t.tipo === 'entrada');
    const saidas = transacoes.filter(t => t.tipo === 'saida');

    let valorEntrada: any = 0;
    let valorSaida: any = 0;

    entradas.map(entrada => valorEntrada = parseFloat(valorEntrada) + parseFloat(entrada.valor));
    saidas.map(saida => valorSaida = parseFloat(valorSaida) + parseFloat(saida.valor));

    setSaldo(valorEntrada - valorSaida);

    localStorage.setItem('@transacoes', JSON.stringify(transacoes));
  }, [transacoes]);

  useEffect(() => {
    localStorage.setItem('@saldo', JSON.stringify(saldo));
  }, [saldo])

  function HandleFormSubmit(e) {
    e.preventDefault();

    setTransacoes([
      ...transacoes,
      {
        descricao,
        valor,
        tipo,
        id: Math.floor(Math.random() * 9999)
      }
    ]);

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
        <p>Olá</p>
      </Title>

      <FormTransaction onSubmit={HandleFormSubmit}>
        <button type='submit'>
          Adicionar
        </button>
        <input type="text" onChange={HandleDescricaoChange} required placeholder='Ex: gasolina...' value={descricao} />
        <input type="number" onChange={HandleValorChange} required placeholder='valor' value={valor} />
        <select name="tipo" onChange={HandleTipoChange}>
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