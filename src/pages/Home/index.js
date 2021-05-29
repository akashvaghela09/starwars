import React, { useState } from 'react';
import logo from './star-wars-logo.png';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { getRequest, getSuccess } from '../../Redux/app/action';
import axios from "axios"

function HomePage() {
  const dispatch = useDispatch()
  const [query, setQuery] = useState("")
  const loading = useSelector(state => state.app.isLoading)
  const data = useSelector(state => state.app.data)
  const [active, setActive] = useState(0);

  const handleQuery = (event) => {
    dispatch(getRequest())
    let string = event.target.value
    setQuery(string)
    
    debouncedReq()
  }

  const getData = () => {
    axios.get(`https://swapi.dev/api/people/?search=${query}`)
      .then((res) => {
        let personList = [...res.data.results]
        console.log(personList);
        console.log(personList[active]);
        if(query.length === 1){
          dispatch(getSuccess([]))
        } else {
          dispatch(getSuccess(personList))
        }
      })
  }

  const debounce = (fn, delay) => {
    let timeOut;
    if(timeOut){
      clearTimeout(timeOut)
    }

    return function (){
      timeOut = setTimeout(() => {
        fn()
      }, delay);
    }
  }

  const debouncedReq = debounce(getData, 2000)

  const handleResult = (e) => {

    switch (e.keyCode) {
      case 40: {
        if (active >= data.length - 1) {
          setActive(0);
        } else if (active < data.length - 1) {
          setActive((prev) => prev + 1);
        }
        break;
      }
      case 38: {
        if (active === 1) {
          setActive(0);
        } else if (active <= 0) {
          setActive(data.length - 1);
        } else {
          setActive((prev) => prev - 1);
        }
        break;
      }
      case 13: {
        // onEnter
        alert(data[active].name);
        break;
      }
      default: {
        return;
      }
    }
  }
  return (
    <div>
      {loading && <h2>Loading</h2>}
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      <input 
        value={query} 
        onChange={handleQuery} 
        className="search-input" 
        placeholder="Search by name" 
        onKeyUp={handleResult}
      />
      {
        data && data.map((el, index) => 
          active === index ? <h2 style={{background: "green", padding: "10px", margin: "10px"}}>Name: {el.name}</h2>
          : <h2 style={{background: "white", padding: "10px", margin: "10px"}}>Name: {el.name}</h2>
        )
      }
     
    </div>
  );
}

export default HomePage;
