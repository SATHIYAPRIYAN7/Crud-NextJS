import { createSlice } from "@reduxjs/toolkit"
import { toast } from "sonner"

const initialState = {
  users: [],
  editingId: null,
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload)
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id)
      if (index !== -1) {
        state.users[index] = action.payload
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((u) => u.id !== action.payload)
      toast.success("User deleted successfully")
    },
    setEditingId: (state, action) => {
      state.editingId = action.payload
    },
    setUsers: (state, action) => {
      state.users = action.payload
    },
  },
})

export const { addUser, updateUser, deleteUser, setEditingId, setUsers } = userSlice.actions
export default userSlice.reducer
