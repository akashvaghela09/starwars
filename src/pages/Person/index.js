import React, { useEffect, useState } from 'react';
import './index.css';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios"

function Person() {
  const history = useHistory()
  const { person } = useParams();
  const personName = person.split("_").join(" ")
  const [result, setResult] = useState({})
  const { name, height, mass, hair_color, skin_color, eye_color, birth_year, gender } = result

  const handleBack = (e) => {
    switch(e.keyCode)
    {
      case 8:
        history.push("/")
      break; 
      default:
      break;
    }
  }

  useEffect(() => {
    axios.get(`https://swapi.dev/api/people/?search=${personName}`)
    .then((res) => {
      setResult(res.data.results[0])
    })

    window.addEventListener("keyup", handleBack)
  }, [])

  return (
    <div className="person" style={{marginTop: "100px"}}>
      {
        result && 
        <div className="personCard">
          <h1>Galactic ID Card</h1>
          <p><b>Name:</b> {name}</p>
          <p><b>Gender:</b> {gender}</p>
          <p><b>Birth Year:</b> {birth_year}</p>
          <p><b>Eye Coloe:</b> {eye_color}</p>
          <p><b>Hair Color:</b> {hair_color}</p>
          <p><b>Skin Color:</b> {skin_color}</p>
          <p><b>Height:</b> {height}</p>
          <p><b>Mass:</b> {mass}</p>
        </div>
      }
    </div>
  );
}

export default Person;