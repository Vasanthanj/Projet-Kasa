import { Carousel } from "../components/Lodging/Carousel";
import { Collapse } from "../components/Collapse";
import { useParams, redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types'

import Tag from "../components/Lodging/Tag";
import ErrorPage from "./Error";
import { Stars } from "../components/Lodging/Stars";




export function Lodging({data}) {

  const {id} = useParams()
  const [lodging, setlodging] = useState(null)


  useEffect(() => {
    const dataFound = data.find((currentData) => currentData.id == id)

    if (dataFound) {
      setlodging(dataFound)
    } else {
      setlodging(null)
      redirect(<ErrorPage/>)
    }
}, [data,id])


if (!id || !lodging){
   return (<ErrorPage/>)
}  

  /* const lodging = data.find((currentData) => currentData.id == id)

  if (!id || !lodging){
    return (<ErrorPage/>)
  } */     


  return <>
    <Carousel pictures={lodging.pictures} title={lodging.title}/>  

      <section className="lodging_info">

        <article className="lodging_titles">
          <h2>{lodging.title}</h2>
          <p>{lodging.location}</p>
          
          <div className="lodging_tags">
            {lodging.tags.map((value) => (
                <Tag key={value} content={value} />
            ))}
          </div>
        </article>

        <article className="lodging_host">

          <figure className="host_info">
            <img src={lodging.host.picture} alt={`Photo de profil de ${lodging.host.name}`} />
            <figcaption className="host_name" dangerouslySetInnerHTML={{__html:lodging.host.name.replace(` `,`<br/>`)}}/>
          </figure>

          <Stars rating={lodging.rating}/>
        </article>
      </section>

    <section className="lodging_desc">       
        <Collapse key={"Description"} id={"Description"} label={"Description"} content={lodging.description}/>
        <Collapse key={"Equipements"} id={"Equipements"} label={"Equipements"} contentList={lodging.equipments}/>
    </section>
  
  </>
}




Lodging.propTypes = {
  data: PropTypes.array
}