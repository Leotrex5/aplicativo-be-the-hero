import React,{useState} from 'react';
import './style.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import {FiLogIn} from 'react-icons/fi'
import { Link,useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {       
            const response = await api.post('session',{id});
            console.log(response.data.name);

            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName',response.data.name);
            history.push('/profile')
        } catch (err){
            alert('falha no login');
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faca seu logon</h1>
                    <input type='text' placeholder="sua id" value={id} onChange={e => setId(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Nao tenho cadastro
                        </Link>
                </form>

            </section>

            <img src={heroesImg} alt="heroes" />
        </div>
    );
};