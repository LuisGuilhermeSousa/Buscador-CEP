import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';

import api from './services/api'

function App() {

  //input: é o que está no campo
  //setInput: é o que é devolvido 
  const [input, setInput] = useState('')
  const [cep, setCep ] = useState({})

  async function handleSearch(){
    if(input === ''){
      alert("Preencha algum CEP!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");

    }catch{
      alert("Ops, erro ao buscar")
      //setta o valor do campo para vazio novamente
      setInput("")
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <h3 className="subtitle">Um lugar fácil para você consultar CEP's</h3>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={ (e) => setInput(e.target.value)}
        />
        
        
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>
      
      {Object.keys(cep).length > 0 && (
        <main className="main">
        <h2>CEP: {cep.cep}</h2>

        <span>Rua: {cep.logradouro}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>Cidade: {cep.localidade}</span>
        <span>UF: {cep.uf}</span>
      </main>
      )}
      
    </div>
  );
}

export default App;
