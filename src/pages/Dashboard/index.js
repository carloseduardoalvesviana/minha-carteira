import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, FormTransaction, Title, Transactions } from './styles';

function Dashboard() {
  const [user] = useState(JSON.parse(localStorage.getItem('@expense-email')));
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);

  let navigate = useNavigate();

  if (user === null) {
    navigate("/");
  }

  return (
    <Container>
      <Title>
        <h1>Minha Carteira</h1>

        <p>{user}</p>
      </Title>

      <FormTransaction>
        <button type='submit'>
          Adicionar
        </button>
        <input type="text" onChange={(e) => setDescricao(e.target.value)} required placeholder='Descrição' value={descricao} />
        <input type="number" onChange={(e) => setValor(e.target.value)} required placeholder='valor' value={valor} />
      </FormTransaction>

      <Transactions>
        <p>Historico de transações</p>
        <ul>
          <li>
            <span>compra da casa: 40.0000$s</span>
            <button type='button'>deletar</button>
          </li>
        </ul>
      </Transactions>
    </Container>
  )
}

export default Dashboard;