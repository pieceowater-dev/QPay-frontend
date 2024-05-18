import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  payments: { items: [], totals: { count: 0 } },
  posts: [],
  typeDate: 1,
  selectedDates: { start: undefined, end: undefined },
}

export const DashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setPaymentsState: (state, action) => {
      state.payments = action.payload
    },
    setPaymentsPost: (state, action) => {
      state.posts = action.payload
    },
    setPaymentsTypeDate: (state, action) => {
      state.typeDate = action.payload
    },
    setPaymentsSelectedDates: (state, action) => {
      state.selectedDates = action.payload
    },
  },
})

export const { setPaymentsState, setPaymentsPost, setPaymentsSelectedDates, setPaymentsTypeDate } =
  DashboardSlice.actions

export default DashboardSlice.reducer
