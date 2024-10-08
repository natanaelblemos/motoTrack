import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosRequest from './AxiosRequest';

// Cria o contexto
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [logado, setLogado] = useState(() => {
        // Verifica se há dados no localStorage
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
      });
      

        // Função para fazer login
        const handleLogin = (userData) => {
            setLogado(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        };

        // Função para fazer logout
        const handleLogout = () => {
            setLogado(null);
            localStorage.clear();
        };

        // Efeito para verificar a sessão
        useEffect(() => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setLogado(JSON.parse(storedUser));
            } else {
                // Verifique se o path não é a página de login
                if (window.location.pathname !== '/') {
                    window.location.href = '/';
                }
            }
        }, []);

      return (
        <AuthContext.Provider value={{ logado, handleLogin, handleLogout  }}>
          {children}
        </AuthContext.Provider>
      );
}

// Hook para usar o contexto
export const useAuth = () => {
    return useContext(AuthContext);
};

/** -------------------------------------------- Motos -------------------------------------- */

export const MotosContext = createContext();

export const MotosProvider = ({children}) =>{
    const [motos, setMotos] = useState([])
    const {logado} = useContext(AuthContext)
    
    useEffect(() => {
        const fetchMotos = async () => {
            try {
                
                let formData = new FormData();
                formData.set('action', 'motosCadastradas');
                formData.set('id_user', logado.id);
                
                const result = await axiosRequest(formData);
                
                setMotos(result.motos || []); // Verifica se 'motos' existe na resposta
                
            } catch (error) {
                console.error('Erro ao buscar motos:', error);
            }
        };
        
        fetchMotos();
    }, []);
    
    return(
        <MotosContext.Provider value={{ motos, setMotos }}>
            {children}
        </MotosContext.Provider>
    )
}

/** -------------------------------------------- Motos -------------------------------------- */
/** -------------------------------------------- Combustiveis ------------------------------- */

export const CombustiveisContext = createContext();

export const CombustiveisProvider = ({children}) =>{
    const [combustiveis, setCombustiveis] = useState([])
    const {logado} = useContext(AuthContext)
    
    useEffect(() => {
        const fetchCombustivel = async () => {
            try {
                
                let formData = new FormData();
                formData.set('action', 'combustiveisCadastrados');
                formData.set('id_user', logado.id);
                
                const result = await axiosRequest(formData);
                
                setCombustiveis(result.combustiveis || []); // Verifica se 'combustiveis' existe na resposta
                
            } catch (error) {
                console.error('Erro ao buscar combustiveis:', error);
            }
        };
        
        fetchCombustivel();
    }, []);
    
    return(
        <CombustiveisContext.Provider value={{ combustiveis, setCombustiveis }}>
            {children}
        </CombustiveisContext.Provider>
    )
}
/** -------------------------------------------- Combustiveis ------------------------------- */
/** -------------------------------------------- Combustiveis ------------------------------- */

export const AppsContext = createContext();

export const AppsProvider = ({children}) =>{
    const [apps, setApps] = useState([])
    const {logado} = useContext(AuthContext)
    
    useEffect(() => {
        const fetchApp = async () => {
            try {
                
                let formData = new FormData();
                formData.set('action', 'appsCadastrados');
                formData.set('id_user', logado.id);
                
                const result = await axiosRequest(formData);
                
                setApps(result.apps || []); // Verifica se 'Apps' existe na resposta
                
            } catch (error) {
                console.error('Erro ao buscar Apps:', error);
            }
        };
        
        fetchApp();
    }, []);
    
    return(
        <AppsContext.Provider value={{ apps, setApps }}>
            {children}
        </AppsContext.Provider>
    )
}
/** -------------------------------------------- Combustiveis ------------------------------- */
/** -------------------------------------------- Corridas ------------------------------- */

export const CorridasContext = createContext();

export const CorridasProvider = ({children}) =>{
    const [corridas, setCorridas] = useState([])
    const {logado} = useContext(AuthContext)
    
    useEffect(() => {
        const fetchCorrida = async () => {
            try {
                let formData = new FormData();
                formData.set('action', 'corridasCadastradas');
                formData.set('id_user', logado.id);
                
                const result = await axiosRequest(formData);
                
                setCorridas(result.corridas || []); // Verifica se 'Corridas' existe na resposta
                
            } catch (error) {
                console.error('Erro ao buscar Corridas:', error);
            }
        };
        
        fetchCorrida();
    }, []);
    
    return(
        <CorridasContext.Provider value={{ corridas, setCorridas }}>
            {children}
        </CorridasContext.Provider>
    )
}
/** -------------------------------------------- Corridas ------------------------------- */
