/* eslint-disable no-undef */
var token = "947a27a5-4ac2-454c-b5fb-fbbb105e1651"

const getPrograms = async () => {
  console.log("Fetching Programs")
  let programs = await fetch(`/programs?token=${token}`, {
      accept: "application/json"
    })
    .then(checkStatus)
    .then(parseJSON)
  console.log(programs)
  return programs
}

const addProgram = async (program) => {
  console.log(`Adding Program ${program.programId}`)
  return await fetch(`/programs?token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(program)
    })
    .then(checkStatus)
    .then(parseJSON)
}

const getResidents = async () => {
  console.log("Fetching Residents")
  let residents = await fetch(`/residents?token=${token}`, {
      accept: "application/json"
    })
    .then(checkStatus)
    .then(parseJSON)
    console.log(residents)
  return residents
}

const addResident = async (resident) => {
  console.log("Adding Resident")
  return await fetch(`/residents?token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resident)
    })
    .then(checkStatus)
    .then(parseJSON)
}

const residentProgram = async (programId, resident) => {
  console.log(`Assinging ${programId}`)
  return await fetch(`/programs/${programId}/attend?token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resident)
    })
    .then(checkStatus)
    .then(parseJSON)
}

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(`HTTP Error ${response.statusText}`)
  error.status = response.statusText
  error.response = response
  console.log(error) // eslint-disable-line no-console
  throw error
}

const parseJSON = (response) => response.json()

const Client = { getPrograms, getResidents, addProgram, addResident, residentProgram }
export default Client
