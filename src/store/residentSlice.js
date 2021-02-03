import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit'
import Api from '../api/client'

const residentsAdapter = createEntityAdapter()

const initialState = residentsAdapter.getInitialState({
  status: 'idle'
})

export const fetchResidents = createAsyncThunk('residents/fetchResidents', async () => await Api.getResidents())
export const addResident = createAsyncThunk('todos/addResident', async resident => await Api.addResident(resident))

const residentSlice = createSlice({
  name: 'residents',
  initialState,
  reducers: {
    linkResidentToProgram: {
      reducer(state, action) {
        const { programId, residentId } = action.payload
        state.entities[residentId].attendance = { status: 'Active', programId: programId}
      },
      prepare(programId, residentId) {
        return {
          payload: { programId, residentId }
        }
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchResidents.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchResidents.fulfilled, (state, action) => {
        residentsAdapter.setAll(state, action.payload)
        state.status = 'idle'
      })
      .addCase(fetchResidents.rejected, (state, action) => {
        console.log("FetchResidents was Rejected")
        return action.payload
      })
      .addCase(addResident.fulfilled, residentsAdapter.addOne)
      .addCase(addResident.rejected, (state, action) => {
        console.log("AddResident was Rejected")
        return action.payload
      })
  }
})

export const { linkResidentToProgram } = residentSlice.actions

export default residentSlice.reducer

export const {
  selectAll: selectResidents,
  // selectById: selectResidentById
} = residentsAdapter.getSelectors(state => {
  console.log('getSelectorResident')
  console.log(state)
  console.log(state.residents)
  return state.residents})

  export const selectResidentById = createSelector(
    selectResidents,
    (residents, id) => residents[id]
  )

export const selectResidentIds = createSelector(
  selectResidents,
  residents => residents.map(resident => resident.id)
)