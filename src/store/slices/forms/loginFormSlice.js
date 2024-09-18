import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  email: '',
  password: ''
}

const loginFormSlice = createSlice({
  name: 'loginForm',
  initialState,
  reducers: {
    set_login_email: (state, action) => {
      state.email = action.payload
    },
    set_login_password: (state, action) => {
      state.password = action.payload
    }
  }
})

// export action creators for use in components
export const {
  set_login_email,
  set_login_password
} = loginFormSlice.actions

// export slice reducer for use in the store
export default loginFormSlice.reducer
