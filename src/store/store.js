import { configureStore } from '@reduxjs/toolkit'

import residentsReducer from './residentSlice'
import programsReducer from './programSlice'

const store = configureStore({
  reducer: {
    residents: residentsReducer,
    programs: programsReducer
  }
})

export default store