"use client"

import { use, useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, ChevronUp, Delete, Edit2, Trash2 } from "lucide-react"
import { DeleteVideoModal } from "./ui/DeleteModal"

export function UserTable({ users, onEdit, onDelete }) {
  const [expandedRows, setExpandedRows] = useState(new Set())
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)

  const toggleExpand = (userId) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId)
    } else {
      newExpanded.add(userId)
    }
    setExpandedRows(newExpanded)
  }

  const handleDelete = () => {
    setIsDeleteModalOpen(false)
      onDelete(userToDelete)

  }

  if (users.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">No users found. Click "ADD" to create a new user.</div>
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="w-12"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>LinkedIn URL</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead className="w-24">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <>
              <TableRow key={user.id}>
                <TableCell>
                  <button onClick={() => toggleExpand(user.id)} className="p-1 hover:bg-muted rounded">
                    {expandedRows.has(user.id) ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <a
                    href={user.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate block"
                  >
                    {user.linkedinUrl}
                  </a>
                </TableCell>
                <TableCell className="capitalize">{user.gender}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => onEdit(user)} className="p-2 h-auto">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setUserToDelete(user.id)
                        setIsDeleteModalOpen(true)
                      }}
                      className="p-2 h-auto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>

              {expandedRows.has(user.id) && (
                <TableRow className="bg-muted/50">
                  <TableCell colSpan={6} className="py-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Address Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Line 1</p>
                          <p>{user.address.line1}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Line 2</p>
                          <p>{user.address.line2 || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">State</p>
                          <p>{user.address.state}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">City</p>
                          <p>{user.address.city}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">PIN</p>
                          <p>{user.address.pin}</p>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>

      <DeleteVideoModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDelete} />
    </div>
  )
}
