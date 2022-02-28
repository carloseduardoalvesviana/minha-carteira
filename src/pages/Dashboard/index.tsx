import React, { useEffect, useState } from 'react';
import { Container, FormTransaction, Title, Transactions } from './styles';

import { Transaction } from '../../types/TransactionType';

const Dashboard = () => {
  const [description, setDescription] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const [type, setType] = useState<string>("entrada");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    let t: any = localStorage.getItem('@transacoes');
    if(t){
      setTransactions([...JSON.parse(t)]);
    }
  }, []);

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

  function HandleValorChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(parseFloat(e.target.value));
  }

  function HandleDescricaoChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  function HandleTipoChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setType(e.target.value);
  }

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
        <span className='saldo'>Saldo {balance} R$</span>
      </Title>

      <FormTransaction onSubmit={HandleFormSubmit}>
        <input type="text" onChange={HandleDescricaoChange} required placeholder='Ex: gasolina...' value={description} />
        <input type="number" onChange={HandleValorChange} required placeholder='valor' value={value} />

        <select name="tipo" onChange={HandleTipoChange}>
          <option value="entrada">Entrada</option>
          <option value="saida">Saida</option>
        </select>

        <button type='submit'>Salvar</button>
      </FormTransaction>

      <Transactions>

        <p>Transações</p>

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