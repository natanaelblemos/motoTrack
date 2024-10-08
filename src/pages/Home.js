import React, { useContext, useState } from "react"
import styled from "styled-components";
import Menu from "./components/Menu";
import { MotosContext } from "./components/Contexts";

export const Container = styled.div`
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
`;

export const Abas = styled.ul`
    width: fit-content;
    max-width: 100vw;
    display: flex;
    flex-direction: row;
    gap: 1vw;
    justify-content: center;
    align-items: center;
    list-style-type: none;
    flex-wrap: wrap;

    li{
        width: fit-content;
        font-size: 5vw;
        color: #333;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        background-color: #e5e5e5;
        border-radius: 0 2vw 0 0 ;
        padding: 2vw 5vw;
    }
`

export default function Home(){
    const { motos } = useContext(MotosContext);
    return(
        <Container>
        <Menu />

        <Title>Bem vindo ao MotoTrack</Title>

            <Abas>
                {motos.length > 0 ? (
                    motos.map((moto, index) => (
                        <li key={index}>{moto.modelo}</li> // Assumindo que cada moto tem uma propriedade "nome"
                    ))
                ) : (
                    <p>Nenhuma moto cadastrada</p>
                )}
            </Abas>
      </Container>
    )
}