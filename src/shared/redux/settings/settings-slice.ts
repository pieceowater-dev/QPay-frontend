import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
  users: [],
  role: '',
}

export const SettingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setPostsState: (state, action) => {
      state.posts = action.payload
    },
    setUsersState: (state, action) => {
      state.users = action.payload
    },
    setRoleState: (state, action) => {
      state.role = action.payload
    },
  },
})

export const { setPostsState, setUsersState, setRoleState } = SettingsSlice.actions

export default SettingsSlice.reducer
