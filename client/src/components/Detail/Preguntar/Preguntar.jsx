import React,{useState} from 'react';
import s from './Preguntar.module.css';
import { postPregunta, sendNoti } from '../../Redux/actions';
import Swal from "sweetalert2";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Preguntar({user,profesional,publicacion}){
    const dispatch = useDispatch();
    const history = useHistory();
    const [input, setInput]= useState({
        user:user,
        pregunta:'',
        PublicacionId:parseInt(publicacion),
        profesional: profesional
    })
    var email = profesional[0]
    const handleChange = (e)=>{
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (input,e)=>{
        e.preventDefault();
        dispatch(postPregunta(input));
        console.log(input);
        dispatch(sendNoti(email,input));
        Swal.fire({ text:'Tu pregunta fue enviada con exito', icon:'success' } )
        setTimeout(history.push(`./${publicacion}`), 1000)
    }
    return(
        <form className={s.form} onSubmit={(e)=>handleSubmit(input,e)}>
        <div className={s.title} >Consulta antes de contratar!</div>
        <textarea name='pregunta'
         className={s.input}
        rows='6'
        type='text'
        onChange={(e)=>handleChange(e)}
        value={input.pregunta} required/>
        <input type='submit' className={s.btn}/>
        </form>
    )
}