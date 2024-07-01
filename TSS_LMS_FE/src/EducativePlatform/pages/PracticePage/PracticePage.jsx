import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useFetch } from '../../../hooks';
import { PracticeCard } from '../../components';

export const PracticePage = ({ practiceId }) => {
    const {id_practica}=useParams();
    const {content}=useFetch(`https://tss2024lms-production.up.railway.app/api/chapters/${id_practica}/practice`,"GET");
    const {isLoading}=content;
    const {id_capitulo,practicas}=content.data;
    console.log(content.data)
useEffect(()=>{window.scrollTo(0, 0);},[])
  return(
  <div className="mt-3">
    <h2>practica del tema: {id_capitulo}</h2>
    <hr />
    {isLoading}
    {
    isLoading?(<p>No se encontraron prácticas</p>):
    (<>{practicas.map((practica)=>(<PracticeCard key={practica.id_practica} practiceData={practica}/>))}</>)
    }

  </div>);
};

PracticePage.defaultProps={
    practiceId:5
}