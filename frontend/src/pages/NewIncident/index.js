import React,{useState} from 'react';
import logoImg from '../../assets/logo.svg'
import {Link,useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'
import './style.css'
import api from '../../services/api'

export default function NewIncident(){
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [value,setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();
        const data ={
            title,description,value
        }
        try {
            await api.post('incidents',data,{
                headers:{
                    authorization: ongId
                }
            });
            history.push('/profile');
        } catch(err){
            alert('erro ao cadastrar')
        }
    }

    return (
        <div className="new-incident">
            <div className="content">
                <section>
                  <img src={logoImg} alt="Be The Hero" />
                  <h1>Cadastrar novo caso</h1>
                  <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso.</p>
                  <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Titulo do Caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        />
                    <textarea 
                        placeholder="Descricao"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        />
                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>

        </div>
    );
}