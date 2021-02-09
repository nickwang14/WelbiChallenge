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
export const addResident = createAsyncThunk('residents/addResident', async resident => {
  console.log('Create new resident')
  console.log(resident)
  return await Api.addResident(resident)
})

const residentSlice = createSlice({
  name: 'residents',
  initialState,
  reducers: {
    linkResidentToProgram: {
      reducer(state, action) {
        const { programId, residentId, status } = action.payload
        state.entities[residentId].attendance = { status: status, programId: programId}
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
      .addCase(addResident.pending, (state, action) => {
        state.status = 'loading'
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
  selectById: selectResidentById
} = residentsAdapter.getSelectors(state => state.residents)

export const selectResidentIds = createSelector(
  selectResidents,
  residents => residents.map(resident => resident.id)
)