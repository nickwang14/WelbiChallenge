/* eslint-disable no-undef */
import axios from 'axios'

const getPrograms = async () => {
  console.log("Fetching Programs")
  let programs = await axios.get(`/programs`)
    .then(parseJSON)
  console.log(programs)
  return programs
}

const addProgram = async (program) => {
  console.log(`Adding Program ${program.programId}`)
  return await axios.post(`/programs`, program)
    .then(parseJSON)
}

const getResidents = async () => {
  console.log("Fetching Residents")
  let residents = await axios.get(`/residents`)
    .then(parseJSON)
    console.log(residents)
  return residents
}

const addResident = async (resident) => {
  console.log("Adding Resident")
  return await axios.post(`/residents`, resident)
    .then(parseJSON)
}

const residentProgram = async (programId, resident) => {
  console.log(`Assinging ${programId}`)
  console.log(resident)
  return await axios.post(`/programs/${programId}/attend`, resident)
    .then(parseJSON)
}

const parseJSON = (response) => response.data

const Client = { getPrograms, getResidents, addProgram, addResident, residentProgram }
export default Client
