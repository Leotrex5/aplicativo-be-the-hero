import React,{useState,useEffect} from 'react';
import logoImg from '../../assets/logo.svg'
import {Link,useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import './style.css';
import api from '../../services/api'

export default function Profile(){
    const [incidents,setIncidents] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const history = useHistory();
    useEffect(() => {
        api.get('profile',{
            headers:{
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    },[ongId]);
    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers: {
                    Authorization: ongId,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch (err){
            alert('erro ao deletar')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem Vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadrastrar novo caso </Link>
                <button onClick={handleLogout}>
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                 <li key={incident.id}>
                    <strong>CASO:</strong>
                <p>{incident.title}</p>
                    <strong>DESCRICAO:</strong>
                <p>{incident.description}</p>
                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-br',{style :'currency', currency: 'BRL'}).format(incident.value)}</p>
                
                    <button onClick={() => handleDeleteIncident(incident.id)}>
                       <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                 </li>
                ))}
            </ul>

        </div>
    );
}