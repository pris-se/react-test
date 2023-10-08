import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  result: null,
  usingTools: [],
  activeToolId: null,
}

export const mainSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setResult: (state, { payload }) => {
      state.result = payload
    },
    setUsingTools: (state, { payload }) => {
      state.usingTools = payload
    },
    setActiveToolId: (state, { payload }) => {
      state.activeToolId = payload
    },
  },
})

export const { setResult, setUsingTools, setActiveToolId } = mainSlice.actions

export default mainSlice.reducer