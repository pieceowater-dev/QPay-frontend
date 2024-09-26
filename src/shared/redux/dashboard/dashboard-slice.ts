import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  payments: { items: [], totals: { count: 0 } },
  posts: undefined,
  typeDate: 1,
  selectedDates: { start: undefined, end: undefined },
  pagination: { current: 1, pageSize: 10 },
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
    setPaginationPayment: (state, action) => {
      state.pagination = action.payload
    },
  },
})

export const {
  setPaymentsState,
  setPaymentsPost,
  setPaginationPayment,
  setPaymentsSelectedDates,
  setPaymentsTypeDate,
} = DashboardSlice.actions

export default DashboardSlice.reducer
