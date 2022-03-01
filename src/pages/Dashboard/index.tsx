import React, { useEffect, useState } from 'react';
import { Container, FormTransaction, Title, Transactions } from './styles';

import { Transaction } from '../../types/TransactionType';

import { supabase } from '../../supabase/client';

const Dashboard = () => {
  const [description, setDescription] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const [type, setType] = useState<string>("entrada");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);

  async function getData() {
    const { data, error } = await supabase.from('transactions').select();

    if (error) {
      return;
    }

    if (data) {
      let transactionsData: Transaction[] = data;
      setTransactions([...transactionsData]);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const entrances = transactions.filter(t => t.type === 'entrada');
    const exits = transactions.filter(t => t.type === 'saida');

    let entrancesValues: any = 0;
    let exitsValues: any = 0;

    entrances.map(enV => entrancesValues = parseFloat(entrancesValues) + parseFloat(enV.value));
    exits.map(exV => exitsValues = parseFloat(exitsValues) + parseFloat(exV.value));

    setBalance(entrancesValues - exitsValues);
  }, [transactions]);

  function HandleValorChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(parseFloat(e.target.value));
  }

  function HandleDescricaoChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  function HandleTipoChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setType(e.target.value);
  }

  async function HandleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([
          {
            description,
            value,
            type
          }
        ]);
      if (error) {
        return;
      }

      let transactionsData: Transaction[] = data || [];
      setTransactions([...transactions, transactionsData[0]]);
      setDescription("");
      setValue(0);
    } catch (error) {
      return;
    }

  }

  async function DeleteTransaction(transaction: Transaction) {
    const { data, error } = await supabase
      .from('transactions')
      .delete()
      .match({ id: transaction.id });

    if (error) {
      return;
    }

    if (data) {
      getData();
    }
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