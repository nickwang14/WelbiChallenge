import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Api from "./apiCalls";
import Program from "./components/program";
import Resident from "./components/resident";
import FormModal from './components/formModal';
import "./styles.css";

/* eslint-disable no-undef */
const App = () => {
  const [residents, setResidents] = useState([]);
  const [programs, setPrograms] = useState([]);
  

  const getPrograms = async () => {
    const response = await Api.getPrograms();
    setPrograms(response);
  };

  useEffect(() => {
    getPrograms();
  }, []);

  const getResidents = async () => {
    const response = await Api.getResidents();
    setResidents(response);
  };

  useEffect(() => {
    getResidents();
  }, []);

  return (
    <div className="App">
      <h2>Welbi Event Calendar</h2>
      <FormModal title='Resident'/>
      <FormModal title='Program'/>
      { programs.map( program => <Program {...program} key={program.id} residents={residents}/> ) }
      { residents.map( resident => <Resident {...resident} key={resident.id} programs={programs}/>) }
    </div>
  );
};

export default App;
