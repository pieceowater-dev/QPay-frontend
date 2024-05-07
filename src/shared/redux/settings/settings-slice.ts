import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
  users: [],
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
  },
})

export const { setPostsState, setUsersState } = SettingsSlice.actions

export default SettingsSlice.reducer
