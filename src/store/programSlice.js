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
export const addProgram = createAsyncThunk('todos/addProgram', async program => await Api.addProgram(program))
export const residentProgram = createAsyncThunk('programs/residentProgram', async (programId, residentId) => await Api.residentProgram(programId, { status: 'Active', residentId: residentId }))

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
        return action.payload
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
        const { programId, resident } = action.payload
        state.entities[resident.id].attendance.push(programId)
        useDispatch(linkResidentToProgram(programId, resident.id))
        state.status = 'idle'
      })
      .addCase(residentProgram.rejected, (state, action) => {
        console.log("Adding resident to program was Rejected")
        return action.payload
      })
  }
})

export const {} = programSlice.actions
export default programSlice.reducer

export const {
  selectAll: selectPrograms,
  selectById: selectProgramById
} = programsAdapter.getSelectors(state => state.programs)

export const selectProgramIds = createSelector(
  selectPrograms,
  programs => programs.map(program => program.id)
)