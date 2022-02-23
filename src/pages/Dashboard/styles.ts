import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  flex-direction: column;
  color: #fff;
  min-height: 100vh;
`;

export const Title = styled.div`
  width: 100%;
  margin-top: 60px;
  display: flex;
  flex-direction: column;

  .saldo {
    background: #ad66e5;
    padding: 10px;
    border-radius: 5px;
    border-left: 2px solid #fff;
    margin-top: 10px;
  }

`;

export const FormTransaction = styled.form`
  margin-top: 30px;
  width: 100%;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  input {
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 5px;
    flex: 1;
    margin-left: 5px;
    background: #20212c;
    color: #fff;
  }

  button {
    background: #c534c2;
    color: #fff;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
    margin-right: 5px;
  }

  select {
    padding: 8px;
    background: #20212c;
    color: #fff;
    margin-left: 5px;
  }
`;

export const Transactions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 40px;

  p {
    margin-top: 20px;
  }

  ul {
    list-style-position: inside;
    list-style-type: decimal;
    

    li {
      background: #20212c;
      margin: 10px 0px;
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      border-left: 3px solid #c534c2;

      display: flex;
      align-items: center;
      flex-direction: row;

      span {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .descricao {
        background: #c534c2;
        color: #fff;
        border-radius: 5px;
        padding: 5px;
        margin-right: 10px;
      }

      .valor {
        background: #c534c2;
        color: #fff;
        border-radius: 5px;
        padding: 5px;
        margin-right: 10px;
      }

      .saida {
        background: #fc78a2;
        border-left: 2px solid #fff;
        color: #fff;
        border-radius: 5px;
        padding: 5px;
        margin-right: 10px;
      }

      .entrada {
        background: #3d6b62;
        border-left: 2px solid #fff;
        color: #fff;
        border-radius: 5px;
        padding: 5px;
        margin-right: 10px;
      }

      display: flex;
      flex-direction: row;
      justify-content: space-between;

      button {
        padding: 5px;
        background: #c534c2;
        color: #fff;
        border: none;
        outline: none;
        border-radius: 5px;
      }
    }
  }
`;