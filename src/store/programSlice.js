import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter
} from '@reduxjs/toolkit'
import Api from '../api/client'
import { linkResidentToProgram } from './residentSlice'
import { useDispatch } from 'react-redux/lib/hooks/useDispatch';
  
const programsAdapter = createEntityAdapter()

const initialState = programsAdapter.getInitialState({
  status: 'idle'
})

export const fetchPrograms = createAsyncThunk('programs/fetchPrograms', async () => await Api.getPrograms())
export const addProgram = createAsyncThunk('programs/addProgram', async program => await Api.addProgram(program))
export const residentProgram = createAsyncThunk('programs/residentProgram', async (connect) => await Api.residentProgram(connect.programId, {status: connect.status, residentId: connect.residentId}))

const programSlice = createSlice({
  name: 'programs',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPrograms.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        programsAdapter.setAll(state, action.payload)
        state.status = 'idle'
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        console.log("FetchPrograms was Rejected")
        console.log(action)
        return action.payload
      })
      .addCase(addProgram.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(addProgram.fulfilled, programsAdapter.addOne)
      .addCase(addProgram.rejected, (state, action) => {
        console.log("AddProgram was Rejected")
        return action.payload
      })
      .addCase(residentProgram.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(residentProgram.fulfilled, (state, action) => {
        const { programId, residentId, status } = action.payload
        state.entities[programId].attendance.push({residentId: residentId, status:status})
        state.status = 'idle'
      })
      .addCase(residentProgram.rejected, (state, action) => {
        console.log("Adding resident to program was Rejected")
        return action.payload
      })
  }
})

export default programSlice.reducer

export const {
  selectAll: selectPrograms,
  selectById: selectProgramById
} = programsAdapter.getSelectors(state => state.programs)

export const selectProgramIds = createSelector(
  selectPrograms,
  programs => programs.map(program => program.id)
)