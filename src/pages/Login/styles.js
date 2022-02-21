import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  `;

export const Box = styled.div`
  padding: 15px;
  margin: 0 auto;
  width: 300px;
  color: #fff;
  border-left: 3px solid #c534c2;

  display: flex;
  flex-direction: column;

  h1 {
    text-align: left;
    margin-bottom: 20px;
  }
`;

export const InputEmail = styled.input`
  outline: none;
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 8px;
  background: #20212c;
  margin-top: 10px;
  color: #fff;
`;

export const ButtonSumit = styled.button`
  background: linear-gradient(to right, #b916da, #d326aa);
  color: #fff;
  border: none;
  outline: none;
  padding: 8px;
  margin-top: 10px;
  border-radius: 5px;
`

export const FormLogin = styled.form`
  display: flex;
  flex-direction: column;
`;