import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  exerciseArray: [],
  exerciseId: '',
  // exerciseLoading: false
}

export const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    set_exercise_array: (state, action) => {
      const arr = action.payload

      if (arr.length > 0) {
        const insertLoading = arr.map(e => e = {...e, loading: false}) // add loading prop to each item in the array
        state.exerciseArray = insertLoading
      } else {
        state.exerciseArray = arr
      }
    },
    set_exercise_id: (state, action) => {
      state.exerciseId = action.payload
    },
    set_exercise_loading: (state, action) => {
      // state.exerciseLoading = action.payload
      const index = state.exerciseArray.findIndex(e => e._id === action.payload._id)
      
      if (index !== -1) state.exerciseArray[index].loading = action.payload.loading
    },
    add_exercise: (state, action) => {
      state.exerciseArray = [action.payload, ...state.exerciseArray]
    },
    delete_exercise: (state, action) => {
      state.exerciseArray = state.exerciseArray.filter(e => e._id !== action.payload)
    },
    update_exercises: (state, action) => {
      const index = state.exerciseArray.findIndex(e => e._id === action.payload._id)
      
      if (index !== -1) state.exerciseArray[index] = action.payload
    }    
  }
})

// export action creators for use in components
export const {
  set_exercise_array,
  set_exercise_id,
  set_exercise_loading,
  add_exercise,
  delete_exercise,
  update_exercises
} = exerciseSlice.actions

// export slice reducer for use in the store
export default exerciseSlice.reducer
