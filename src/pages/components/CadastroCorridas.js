import React, { useContext, useState } from "react"
import { AppsContext, CorridasContext, MotosContext, useAuth } from "./Contexts"
import axiosRequest from "./AxiosRequest"
import { Container } from "./CadastroMotos"

export default function CadastroCorridas(){
    const [corrida, setCorrida] = useState({data:'',valor:0,id_app:'', id_moto:'',ttl_corridas:0})
    const {corridas, setCorridas} = useContext(CorridasContext)
    const {motos} = useContext(MotosContext)
    const {apps} = useContext(AppsContext)
    const {logado} = useAuth()

    async function handleCadastroCorridas() {
        try {
            let formData = new FormData();
            formData.set('action', 'cadastroCorrida');
            formData.set('data', corrida.data);
            formData.set('valor', corrida.valor);
            formData.set('id_app', corrida.id_app);
            formData.set('id_moto', corrida.id_moto);
            formData.set('ttl_corridas', corrida.ttl_corridas);
            formData.set('id_user', logado.id);
    
            // Espera pelo resultado da requisição
            const result = await axiosRequest(formData);
            if (result) {    
                // Pega o ID retornado
                const id = parseInt(result.idNovo);
                const novaCorrida = {
                    id: id,
                    data: corrida.data,
                    valor: corrida.valor,
                    id_app: corrida.id_app,
                    id_moto: corrida.id_moto,
                    ttl_corridas: corrida.ttl_corridas
                };
                setCorridas([...corridas, novaCorrida]);
            } else {
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    }
    

    async function handleApagaCorrida(id){
        try{
            let formData = new FormData()
            formData.set('action','apagaCorrida')
            formData.set('id',id)
            formData.set('id_user',logado.id)

            const result = await axiosRequest(formData)
            if(result){
                let corridasFiltradas = corridas.filter(cor => cor.id !== id)
                setCorridas(corridasFiltradas)
            }else{
                console.log('não foi possível apagar a corrida');
                
            }

        }catch(e){
            console.log(e);
            
        }
    }

    return(
        <Container className="CadastroCorridas">
            <form>
                <span>
                    <label>Data</label>
                    <input 
                        type='date' 
                        name='data' 
                        value={corrida.data} 
                        onChange={e=>setCorrida({...corrida, data:e.target.value})} />
                </span>
                <span>
                    <label>Valor</label>
                    <input 
                        type='number' 
                        name='valor' 
                        value={corrida.valor} 
                        onChange={e=>setCorrida({...corrida, valor:e.target.value})} />
                </span>
                <span>
                    <label>App</label>
                    <select value={corrida.id_app} onChange={e=>setCorrida({...corrida, id_app:e.target.value})}>
                        <option value='nulo'>Selecione</option>
                        {
                            apps && apps.map(app =>(
                                <option key={'ListadeApps-'+app.id} value={app.id}>{app.nome}</option>
                            ))
                        }
                    </select>
                </span>
                <span>
                    <label>Moto</label>
                    <select value={corrida.id_moto} onChange={e=>setCorrida({...corrida, id_moto:e.target.value})}>
                        <option value='nulo'>Selecione</option>
                        {
                            motos && motos.map(moto=>(
                                <option key={'ListaMotos-'+moto.id} value={moto.id}>{moto.modelo}</option>
                            ))
                        }
                    </select>
                </span>
                <span>
                    <label>Total Corridas</label>
                    <input 
                        type='number' 
                        name='ttl_corridas' 
                        value={corrida.ttl_corridas} 
                        onChange={e=>setCorrida({...corrida, ttl_corridas:e.target.value})} />
                </span>
                <button onClick={e=>{
                    e.preventDefault()
                    handleCadastroCorridas()
                }}>
                    Cadastrar
                </button>
            </form>

            <div className="Listagem">
                <table>
                    <thead>
                        <tr>
                            <td>Data</td>
                            <td>Valor</td>
                            <td>Moto</td>
                            <td>App</td>
                            <td>Total de Corridas</td>
                            <td>Apagar</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            corridas && corridas.map(m =>{
                                let moto = motos.filter(mot => mot.id === m.Id_moto)[0]                              
                                let ap = apps.filter(a => a.id === m.id_app)[0]
                                return(
                                    <tr>
                                        <td>{new Date(m.data).toLocaleDateString('pt-BR')}</td>
                                        <td>{m.valor}</td>
                                        <td>{moto && moto.modelo}</td>
                                        <td>{ap && ap.nome}</td>
                                        <td>{m.ttl_corridas}</td>
                                        <td><button onClick={e=>{
                                            e.preventDefault()
                                            handleApagaCorrida(m.id)
                                        }}>Apagar</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </Container>
    )
}