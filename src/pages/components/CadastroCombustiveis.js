import React, { useContext, useState } from "react"
import { CombustiveisContext } from "./Contexts"
import axiosRequest from "./AxiosRequest"
import { Container } from "./CadastroMotos"

export default function CadastroCombustiveis(){
    const [combustivel, setCombustivel] = useState({nome:''})
    const {combustiveis, setCombustiveis} = useContext(CombustiveisContext)

    function handleCadastroCombustiveis(){
        try{
            let formData = new FormData()
            formData.set('action','cadastroCombustiveis')
            formData.set('nome',combustivel.nome)

            const result = axiosRequest(formData)
            if(result){
                const id = parseInt(result.idNovo) +1
                const novoCombustivel = {id:id, nome:combustivel.nome}
                setCombustiveis({...combustiveis, novoCombustivel})
            }else{
                console.log(result);
            }
        }catch(error){
            console.log(error);
            
        }
    }

    function handleApagaCombustivel(id){
        console.log(id)
    }

    return(
        <Container className="CadastroCombustiveis">
            <form>
                <span>
                    <label>Modelo</label>
                    <input 
                        type='text' 
                        name='nome' 
                        value={combustivel.nome} 
                        onChange={e=>setCombustivel({...combustivel, nome:e.target.value})} />
                </span>
                <button onClick={e=>{
                    e.preventDefault()
                    handleCadastroCombustiveis()
                }}>
                    Cadastrar
                </button>
            </form>

            <div className="Listagem">
                <table>
                    <thead>
                        <tr>
                            <td>Nome</td>
                            <td>Apagar</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            combustiveis && combustiveis.map(m =>(
                                <tr>
                                    <td>{m.nome}</td>
                                    <td><button onClick={e=>{
                                        e.preventDefault()
                                        handleApagaCombustivel(m.id)
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