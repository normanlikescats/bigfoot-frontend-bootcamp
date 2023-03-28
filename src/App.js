import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.png";
import "./App.css";

const URL = "http://localhost:8080"

function App () {
  const [sightings, setSightings] = useState([]);
  const [detailMode, setDetailMode] = useState(false);
  const [sightingDeets, setSightingDeets] = useState(false);
  
  useEffect(()=>{
    axios.get(`${URL}/sightings`).then((data)=>{
      console.log(data)
      setSightings(data.data);
    })
  }, [])

  function handleClick(e){
    axios(`${URL}/sightings/${e}`).then((data)=>{
      setSightingDeets(data.data)
      setDetailMode(true)
    })
  }

  let sightingsItems = sightings.map((item, counter)=>{
    return(<p onClick={()=>{handleClick(counter)}}>{item.YEAR} - {item.SEASON} - {item.STATE}</p>)
  })

  let sightingDeetsItems = (
    <div>
      <button onClick={()=>setDetailMode(!detailMode)}>Back</button>
      <p>
        Year: {sightingDeets.YEAR} <br/>
        Season: {sightingDeets.SEASON} <br/>
        Time and Conditions: {sightingDeets.TIME_AND_CONDITIONS} <br/>
        State: {sightingDeets.STATE} <br/>
        County: {sightingDeets.COUNTY} <br/>
        Location Details: {sightingDeets.LOCATION_DETAILS} <br/>
        Observed: {sightingDeets.OBSERVED} <br/>
        Other Witnesses: {sightingDeets.OTHER_WITNESSES} <br/>
        Report Class: {sightingDeets.REPORT_CLASS} <br/>
        Report Number: {sightingDeets.REPORT_NUMBER} <br/>
      </p>
    </div> 
  )


  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {detailMode
            ? sightingDeetsItems
            : sightingsItems}
          </p>
        </header>
      </div>
  );
}


export default App;
