import { createSlice } from "@reduxjs/toolkit"

// util
import printLogInDevMode from "../../utils/printLogInDevMode"

const savedUserData = localStorage.getItem('userData')
printLogInDevMode('savedUserData: ', savedUserData)

const parseSavedUserData = () => {
  try {
    const parsedSavedUser = JSON.parse(savedUserData)
    printLogInDevMode('parsedSavedUser: ', parsedSavedUser)

    return parsedSavedUser
  } catch (error) {
    printLogInDevMode('parseSavedUserErr: ', error)
    return null
  }
}

const initialState = {
  userData: parseSavedUserData() || null,
  // accessToken: localStorage.getItem('accessToken') || null
  accessToken: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers : {
    set_user_data: (state, action) => {
      localStorage.setItem('userData', JSON.stringify(action.payload))
      state.userData = action.payload
    },
    use_logout: state => {
      localStorage.removeItem('userData')
      state.userData = null
      state.accessToken = null
    },
    set_access_token: (state, action) => {
      // localStorage.setItem('accessToken', action.payload)
      state.accessToken = action.payload
    }
  }
})

// export action creators for use in components
export const {
  set_user_data,
  use_logout,
  set_access_token
} = authSlice.actions

// export slice reducer for use in the store
export default authSlice.reducer
