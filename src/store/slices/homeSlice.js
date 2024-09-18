import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  homeError: null,
  // homeLoading: false
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    // set_home_error: (state, action) => {
    //   state.homeError = action.payload
    // },
    set_home_loading: (state, action) => {
      state.homeLoading = action.payload 
    }
  }
})

// export action creators for use in components
export const {
  // set_home_error,
  set_home_loading
} = homeSlice.actions

// export slice reducer for use in the store
export default homeSlice.reducer
