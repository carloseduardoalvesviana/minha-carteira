import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box, InputEmail,
  ButtonSumit, FormLogin, Container
} from './styles';

function Login() {
  const [email, setEmail] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    let user = localStorage.getItem('@expense-email');
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  function HandleEmailChange(e) {
    setEmail(e.target.value);
  }

  function HandleFormSubmit(e) {
    e.preventDefault();
    localStorage.setItem('@expense-email', JSON.stringify(email));
    navigate("/dashboard");
  }

  return (
    <Container>
      <Box>
        <h1>Vamos lá...</h1>
        <FormLogin onSubmit={HandleFormSubmit}>
          <label htmlFor='email'>Email</label>
          <InputEmail
            value={email}
            onChange={HandleEmailChange}
            type="email"
            autoComplete
            id='email'
            placeholder='Digite seu email'
          />
          <ButtonSumit type='submit'>Log in</ButtonSumit>
        </FormLogin>
      </Box>
    </Container>
  );
}

export default Login;