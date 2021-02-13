/* eslint-disable no-undef */
import axios from 'axios'

const getPrograms = async () => {
  console.log("Fetching Programs")
  return await axios.get(`/programs?token=${process.env.TOKEN}`)
    .then(parseJSON)
}

const addProgram = async (program) => {
  console.log(`Adding Program ${program.programId}`)
  return await axios.post(`/programs?token=${process.env.TOKEN}`, program)
    .then(parseJSON)
}

const getResidents = async () => {
  console.log("Fetching Residents")
  return await axios.get(`/residents?token=${process.env.TOKEN}`)
    .then(parseJSON)
}

const addResident = async (resident) => {
  console.log("Adding Resident")
  return await axios.post(`/residents?token=${process.env.TOKEN}`, resident)
    .then(parseJSON)
}

const residentProgram = async (programId, resident) => {
  console.log(`Assinging ${programId}`)
  console.log(resident)
  return await axios.post(`/programs/${programId}/attend?token=${process.env.TOKEN}`, resident)
    .then(parseJSON)
}

const parseJSON = (response) => response.data

const Client = { getPrograms, getResidents, addProgram, addResident, residentProgram }
export default Client
