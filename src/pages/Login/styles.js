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
  width: 350px;
  color: #fff;
  border-radius: 5px;
  border-left: 3px solid #fff;
  border-bottom: 3px solid #fff;
  /* background: #47495d; */

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
  width: 30%;
`

export const FormLogin = styled.form`
  display: flex;
  flex-direction: column;
`;