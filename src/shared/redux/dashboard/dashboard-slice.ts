import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  payments: { items: [], totals: { count: 0 } },
}

export const DashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setPaymentsState: (state, action) => {
      state.payments = action.payload
    },
  },
})

export const { setPaymentsState } = DashboardSlice.actions

export default DashboardSlice.reducer
