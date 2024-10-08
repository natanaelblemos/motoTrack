import axios from 'axios';

const axiosRequest = async (formData) => {
  const url = 'https://woodwolf.com.br/mototrack/api.php';
    try {
        const response = await axios.post(url, formData);
        if (response.data.error === false) {
            return response.data; // Retorna a resposta bem-sucedida
        } else {
            // Lida com erros, incluindo token expirado
            return null; // Retorna null em caso de erro
        }
    } catch (error) {
        console.log(error)
        return null; // Retorna null em caso de erro
    }
};

export default axiosRequest;