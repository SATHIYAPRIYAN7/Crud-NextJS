
import { Loader2 } from "lucide-react"

/* eslint-disable react/prop-types */
export function DeleteVideoModal({ isOpen, onClose, onConfirm,isLoading } ) {
  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
        {/* Delete Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 text-center mb-2">Delete video</h2>

        {/* Description */}
        <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
          Are you sure you want to delete this video?
          <br />
          It will be permanently removed.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 flex justify-center bg-red-600 text-white rounded-md hover:bg-red-700 font-medium"
          >
            { isLoading? <Loader2 className=" animate-spin"/>  : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}
