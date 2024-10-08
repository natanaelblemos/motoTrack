import React, { useState } from "react"
import { Abas, Container, Title } from "./Home";
import Menu from "./components/Menu";
import CadastroMotos from "./components/CadastroMotos";
import CadastroCombustiveis from "./components/CadastroCombustiveis";
import CadastroCorridas from "./components/CadastroCorridas";
import { useAuth } from "./components/Contexts";



export default function Cadastros(){
    const abas = ['Motos','Combustíveis','Corridas','Track','Abastecimento','Apps'];
    const [abaAtiva, setAbaAtiva] = useState('Motos')
    const {logado} = useAuth()

    return(
        <Container>
        <Menu />
        <p> Bem Vindo {logado && logado.nome}</p>
        <Title>Bem vindo ao MotoTrack</Title>


            <Abas>
                {abas.length > 0 ? (
                    abas.map((aba, index) => (
                        <li key={index} onClick={()=>setAbaAtiva(aba)}>{aba}</li> // Assumindo que cada moto tem uma propriedade "nome"
                    ))
                ) : (
                    <p>Nenhuma aba Cadastrada</p>
                )}
            </Abas>

                {
                    abaAtiva && abaAtiva === 'Motos'?<CadastroMotos />:
                    abaAtiva && abaAtiva === 'Combustíveis'?<CadastroCombustiveis />:
                    abaAtiva && abaAtiva === 'Corridas'?<CadastroCorridas />:
                    undefined 
                }
            
      </Container>
    )
}