"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { addUser, updateUser, deleteUser, setEditingId, setUsers } from "@/lib/redux/slices/userSlice"
import { Button } from "@/components/ui/button"
import { UserForm } from "./user-form"
import { UserTable } from "./user-table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function UserManagement() {
  const dispatch = useAppDispatch()
  const users = useAppSelector((state) => state.users.users)
  const editingId = useAppSelector((state) => state.users.editingId)

  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(undefined)

  // Load users from API on mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch("/api/users")
        const data = await response.json()
        dispatch(setUsers(data))
      } catch (error) {
        console.error("Failed to load users:", error)
      }
    }
    loadUsers()
  }, [dispatch])

  const handleAddClick = () => {
    setEditingUser(undefined)
    setShowForm(true)
    dispatch(setEditingId(null))
  }

  const handleEditClick = (user) => {
    setEditingUser(user)
    setShowForm(true)
    dispatch(setEditingId(user.id))
  }

  const handleFormSubmit = async (user) => {
    try {
      if (editingUser) {
        // Update existing user
        await fetch("/api/users", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        })
        dispatch(updateUser(user))
      } else {
        // Add new user
        await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        })
        dispatch(addUser(user))
      }
      setShowForm(false)
      setEditingUser(undefined)
      dispatch(setEditingId(null))
    } catch (error) {
      console.error("Failed to save user:", error)
    }
  }

  const handleDeleteUser = async (userId) => {
    try {
      await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      })
      dispatch(deleteUser(userId))
    } catch (error) {
      console.error("Failed to delete user:", error)
    }
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingUser(undefined)
    dispatch(setEditingId(null))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button onClick={handleAddClick} className="bg-blue-600 hover:bg-blue-700">
          ADD
        </Button>
      </div>

      <UserTable users={users} onEdit={handleEditClick} onDelete={handleDeleteUser} />

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
          </DialogHeader>
          <UserForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} initialUser={editingUser} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
