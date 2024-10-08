import React, { useContext, useState } from "react"
import styled from "styled-components"
import { MotosContext, useAuth } from "./Contexts"
import axiosRequest from "./AxiosRequest"

export const Container = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;


    form{
        display: flex;
        flex-direction: column;
        gap: 3vw;
        width: 100%;
        align-items: center;

        span{
            display: flex;
            flex-direction: column;
            gap: 1vw;
            width: 100%;

            input, select{
                height: 30px;
                width: 100%;
                flex-grow: 1;
            }
        }
        button{
            background-color: lightgreen;
            border: none;
            font-size: 5vw;
            color: #333;
            padding: 10px 20px;
            width: fit-content;
            height: fit-content;
        }
    }

    table{
        width: 100%;
        height: fit-content;
        
        td{
            border:solid 1px #333;
            text-align: center;
        }
        button{
            background-color: lightcoral;
            border: none;
            font-size: 5vw;
            color: #333;
            padding: 5px 10px;
            width: fit-content;
            height: fit-content;
        }
    }
`

export default function CadastroMotos(){
    const [moto, setMoto] = useState({modelo:'', fabricante:''})
    const {motos, setMotos} = useContext(MotosContext)
    const {logado} = useAuth()

    function handleCadastroMoto(){
        try{
            let formData = new FormData()
            formData.set('action','cadastroMotos')
            formData.set('modelo',moto.modelo)
            formData.set('fabricante',moto.fabricante)
            formData.set('id_user',logado.id)

            const result = axiosRequest(formData)
            if(result){
                const id = parseInt(result.idNovo) +1
                const novaMoto = {id:id, modelo:moto.modelo, fabricante:moto.fabricante}
                setMotos([...motos, novaMoto])
            }else{
                console.log(result);
            }
        }catch(error){
            console.log(error);
        }
    }

    function handleApagaMoto(id){
        try{
            let formData = new FormData()
            formData.set('action','apagaMotos')
            formData.set('id', id)
            formData.set('id_user', logado.id)

            const result = axiosRequest(formData)
            if(result){
                console.log('Moto deletada com sucesso')
                const motosFiltradas = motos.filter(moto => moto.id !== id)
                setMotos(motosFiltradas)
            }else{
                console.log('Não foi possível apagar os dados')
            }

        }catch(e){
            console.log(e);
            
        }
    }

    return(
        <Container className="CadastroMotos">
            <form>
                <span>
                    <label>Modelo</label>
                    <input 
                        type='text' 
                        name='modelo' 
                        value={moto.modelo} 
                        onChange={e=>setMoto({...moto, modelo:e.target.value})} />
                </span>

                <span>
                    <label>Fabricante</label>
                    <input 
                        type='text' 
                        name='modelo' 
                        value={moto.fabricante} 
                        onChange={e=>setMoto({...moto, fabricante:e.target.value})} />
                </span>
                <button onClick={e=>{
                    e.preventDefault()
                    handleCadastroMoto()
                }}>
                    Cadastrar
                </button>
            </form>

            <div className="Listagem">
                <table>
                    <thead>
                        <tr>
                            <td>Modelo</td>
                            <td>Fabricante</td>
                            <td>Apagar</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            motos && motos.map(m =>(
                                <tr>
                                    <td>{m.modelo}</td>
                                    <td>{m.fabricante}</td>
                                    <td><button onClick={e=>{
                                        e.preventDefault()
                                        handleApagaMoto(m.id)
                                    }}>Apagar</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </Container>
    )
}