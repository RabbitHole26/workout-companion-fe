import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  savedAvatarUrl: localStorage.getItem('savedAvatarUrl') || null,
  appError: null,
  appSuccess: '',
  appLoading: false
}

const setHtmlDataTheme = (state) => document.querySelector('html').setAttribute('data-theme', state)

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    set_theme: state => {
      state.theme = state.theme === 'light' 
        ? 'dark' 
        : 'light'
      localStorage.setItem('theme', state.theme)
      setHtmlDataTheme(state.theme)
    },
    set_saved_avatar_url: (state, action) => {
      state.savedAvatarUrl = action.payload
      localStorage.setItem('savedAvatarUrl', state.savedAvatarUrl)
    },
    set_app_error: (state, action) => {
      state.appError = action.payload
    },
    set_app_success: (state, action) => {
      state.appSuccess = action.payload
    },
    set_app_loading: (state, action) => {
      state.appLoading = action.payload
    }
  }
})

// export action creators for use in components
export const {
  set_theme,
  set_saved_avatar_url,
  set_app_error,
  set_app_success,
  set_app_loading
} = appSlice.actions

// export slice reducer for use in the store
export default appSlice.reducer
