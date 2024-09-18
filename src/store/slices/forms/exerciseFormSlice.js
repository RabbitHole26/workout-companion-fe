import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  displayForm: false,
  editExerciseForm: false,
  title: '',
  reps: '',
  weight: ''
}

const exerciseFormSlice = createSlice({
  name: 'exerciseForm',
  initialState,
  reducers : {
    // eslint-disable-next-line no-unused-vars
    set_display_form: (state, action) => {
      state.displayForm = action.payload !== undefined 
        ? action.payload
        : !state.displayForm
    },
    set_edit_exercise_form: (state, action) => {
      state.editExerciseForm = action.payload
    },
    set_title: (state, action) => {
      state.title = action.payload
    },
    set_reps: (state, action) => {
      state.reps = action.payload
    },
    set_weight: (state, action) => {
      state.weight = action.payload
    }
  }
})

// export action creators for use in components
export const {
  set_display_form,
  set_edit_exercise_form,
  set_title,
  set_reps,
  set_weight
} = exerciseFormSlice.actions

// export slice reducer for use in the store
export default exerciseFormSlice.reducer
