import React, { useEffect, useState } from 'react';
import { Container, FormTransaction, Title, Transactions } from './styles';

import { Transaction } from '../../types/TransactionType';

function Dashboard() {
  const [description, setDescription] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const [type, setType] = useState<string>("entrada");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setTransactions([...JSON.parse(localStorage.getItem('@transacoes') || "")]);
  }, []);

  function HandleValorChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(parseFloat(e.target.value));
  }

  function HandleDescricaoChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  function HandleTipoChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setType(e.target.value);
  }

  useEffect(() => {
    const entradas = transactions.filter(t => t.type === 'entrada');
    const saidas = transactions.filter(t => t.type === 'saida');

    let valorEntrada: any = 0;
    let valorSaida: any = 0;

    entradas.map(entrada => valorEntrada = parseFloat(valorEntrada) + parseFloat(entrada.value));
    saidas.map(saida => valorSaida = parseFloat(valorSaida) + parseFloat(saida.value));

    setBalance(valorEntrada - valorSaida);

    localStorage.setItem('@transacoes', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('@saldo', JSON.stringify(balance));
  }, [balance])

  function HandleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    setTransactions([
      ...transactions,
      {
        description,
        value,
        type,
        id: Math.floor(Math.random() * 9999)
      }
    ]);

    setDescription("");
    setValue(0);
  }

  function DeleteTransaction(transaction: Transaction) {
    setTransactions([...transactions.filter(t => t !== transaction)]);
  }

  return (
    <Container>
      <Title>
        <h1>Minha Carteira</h1>
        <p>Olá</p>
      </Title>

      <FormTransaction onSubmit={HandleFormSubmit}>
        <button type='submit'>Adicionar</button>
        <input type="text" onChange={HandleDescricaoChange} required placeholder='Ex: gasolina...' value={description} />
        <input type="number" onChange={HandleValorChange} required placeholder='valor' value={value} />

        <select name="tipo" onChange={HandleTipoChange}>
          <option value="entrada">Entrada</option>
          <option value="saida">Saida</option>
        </select>
      </FormTransaction>

      <Transactions>
        <span className='saldo'>Meu saldo {balance} R$</span>

        <p>Historico de transações</p>

        <ul>
          {transactions.map(transaction => (
            <li key={transaction.id}>
              <span>
                <span className={transaction.type === 'saida' ? 'saida' : 'entrada'}>{transaction.type}</span>
                <span className='descricao'>{transaction.description}</span>
                <span className='valor'>{transaction.value} R$</span>
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