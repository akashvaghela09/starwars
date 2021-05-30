import React, { useEffect, useState } from 'react';
import logo from './star-wars-logo.png';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { getRequest, getSuccess } from '../../Redux/app/action';
import axios from "axios"
import { useHistory } from 'react-router';
import { Loader } from '../../components/Loader';
import { ResultCard } from '../../components/ResultCard';

function HomePage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [query, setQuery] = useState("")
  const loading = useSelector(state => state.app.isLoading)
  const data = useSelector(state => state.app.data)
  const [active, setActive] = useState(0);

  // handle search query
  const handleQuery = (event) => {
    dispatch(getRequest())
    let string = event.target.value
    setQuery(string)
    
    debouncedReq()
  }

  // get data from API
  const getData = () => {
    axios.get(`https://swapi.dev/api/people/?search=${query}`)
      .then((res) => {
        let personList = [...res.data.results]
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

  // for handling Key Navigation
  const handleResult = (e) => {
    switch (e.keyCode) {
      case 40: {
        // on down arrow
        if (active >= data.length - 1) {
          setActive(0);
        } else if (active < data.length - 1) {
          setActive((prev) => prev + 1);
        }
        break;
      }
      case 38: {
        // on up arrow
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
        // on Enter
        if(data.length > 0){
          return history.push(`/person/${data[active].name.split(" ").join("_")}`) 
        }
        break;
      }
      default: {
        return;
      }
    }
  }

  // reset search bar
  const resetField = () => {
    setQuery("")
    dispatch(getSuccess([]))
  }

  useEffect(() => {
    resetField()
  }, []);
  
  return (
    <div>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      <div className="inputDiv">
        <input 
          value={query} 
          onChange={handleQuery} 
          className="search-input" 
          placeholder="Search by name" 
          onKeyUp={handleResult}
          />
        <div className="inputRightDiv">
          {loading && <Loader />}
          {
            loading === false &&
            <div className="searchIconDiv">
              <img className="searchIcon" src="/search.png" alt="search icon"/>
            </div>
          }
          { query.length > 1 && loading === false && 
            <div className="closeIconDiv">
              <img onClick={resetField} className="closeIcon" src="/close.webp" alt="close"/>
            </div>}
        </div>
        {
          data && data.map((el, index) => 
            active === index ? <ResultCard key={el.name} data={el} active={true} />
            : <ResultCard key={el.name} data={el} active={false}/>
          )
        }
      </div>
     
    </div>
  );
}

export default HomePage;