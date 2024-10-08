import React, { useState } from 'react'
import styled from 'styled-components'
import axiosRequest from './components/AxiosRequest'
import { useAuth } from './components/Contexts'
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #EBF8FF;
`;

const LoginForm = styled.form`
  background-color: white;
  padding: 0.8vw;
  padding-bottom: 2vw;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: fit-content;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 2vw;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  color: #2B6CB0;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #4299E1;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 80%;
  padding: 0.75rem;
  flex-grow: 1;
  border: 1px solid #E2E8F0;
  border-radius: 4px;
  font-size: 1vw;
  height: 3vw;
  font-size:5vw;

  &:focus {
    outline: none;
    border-color: #4299E1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`;

const Button = styled.button`
  width: 90%;
  padding: 0.75rem;
  background-color: #ED8936;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #DD6B20;
  }
`;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logado, handleLogin, handleLogout } = useAuth();
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        let formData = new FormData()
        formData.set('action','getUser')
        formData.set('user',email)
        formData.set('senha',password)
        const result = await axiosRequest(formData)
        if(result.error === false){
            handleLogin(result.dados)
            navigate('/mototrack/home')
        }else{
            handleLogout()
        }
    }catch(error){
        console.log(error);
        
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>MotoTrack</Title>
        <Subtitle>Faça login para acessar o sistema</Subtitle>
        <Input
          type="text"
          placeholder="Digite Seu Login"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Entrar</Button>
      </LoginForm>
    </LoginContainer>
  );
}