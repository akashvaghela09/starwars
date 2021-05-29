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
      />
      {
        data && data.map((el) => 
          <h2>Name: {el.name}</h2>
        )
      }
    </div>
  );
}

export default HomePage;
