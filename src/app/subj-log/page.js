"use client"

import React, { useState } from "react"
import { PlusCircle, X, Trash2, Plus } from "lucide-react"

export default function DynamicSubjectTables() {
  const [subjects, setSubjects] = useState([])
  const [newSubjectName, setNewSubjectName] = useState("")

  const addSubject = () => {
    if (newSubjectName.trim() !== "") {
      setSubjects([
        ...subjects,
        { id: Date.now(), name: newSubjectName, rows: [{ id: Date.now(), columns: [""] }] },
      ])
      setNewSubjectName("")
    }
  }

  const addRow = (subjectId) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              rows: [...subject.rows, { id: Date.now(), columns: [""] }],
            }
          : subject
      )
    )
  }

  const addColumn = (subjectId, rowId) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              rows: subject.rows.map((row) =>
                row.id === rowId
                  ? { ...row, columns: [...row.columns, ""] }
                  : row
              ),
            }
          : subject
      )
    )
  }

  const updateCell = (subjectId, rowId, columnIndex, value) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              rows: subject.rows.map((row) =>
                row.id === rowId
                  ? {
                      ...row,
                      columns: row.columns.map((col, index) =>
                        index === columnIndex ? value : col
                      ),
                    }
                  : row
              ),
            }
          : subject
      )
    )
  }

  const removeSubject = (subjectId) => {
    setSubjects(subjects.filter((subject) => subject.id !== subjectId))
  }

  const removeRow = (subjectId, rowId) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              rows: subject.rows.filter((row) => row.id !== rowId),
            }
          : subject
      )
    )
  }

  const removeColumn = (subjectId, rowId, columnIndex) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              rows: subject.rows.map((row) =>
                row.id === rowId
                  ? {
                      ...row,
                      columns: row.columns.filter((_, index) => index !== columnIndex),
                    }
                  : row
              ),
            }
          : subject
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Dynamic Subject Tables</h1>
        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Enter subject name"
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
            className="mr-4 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 flex-grow text-white"
          />
          <button 
            onClick={addSubject} 
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center transition duration-300"
          >
            <PlusCircle className="mr-2" size={20} />
            Add Subject
          </button>
        </div>
        <div className="space-y-6">
          {subjects.map((subject) => (
            <div key={subject.id} className="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
              <div className="flex justify-between items-center p-4 bg-gray-600">
                <h2 className="text-xl font-semibold text-white">{subject.name}</h2>
                <button
                  className="text-gray-300 hover:text-gray-100 transition duration-300"
                  onClick={() => removeSubject(subject.id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <tbody>
                      {subject.rows.map((row, rowIndex) => (
                        <tr key={row.id} className="border-b border-gray-600">
                          {row.columns.map((cell, columnIndex) => (
                            <td key={`${row.id}-${columnIndex}`} className="p-2">
                              <input
                                type="text"
                                value={cell}
                                onChange={(e) =>
                                  updateCell(subject.id, row.id, columnIndex, e.target.value)
                                }
                                placeholder={rowIndex === 0 ? "Enter name" : "Enter text"}
                                className="w-full bg-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 text-white"
                              />
                            </td>
                          ))}
                          <td className="p-2">
                            <button
                              onClick={() => addColumn(subject.id, row.id)}
                              className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded transition duration-300"
                              title="Add Column"
                            >
                              <Plus size={20} />
                            </button>
                          </td>
                          {row.columns.length > 1 && (
                            <td className="p-2">
                              <button
                                onClick={() => removeColumn(subject.id, row.id, row.columns.length - 1)}
                                className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded transition duration-300"
                                title="Remove Column"
                              >
                                <X size={20} />
                              </button>
                            </td>
                          )}
                          {rowIndex !== 0 && (
                            <td className="p-2">
                              <button
                                onClick={() => removeRow(subject.id, row.id)}
                                className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded transition duration-300"
                                title="Remove Row"
                              >
                                <Trash2 size={20} />
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button 
                  onClick={() => addRow(subject.id)} 
                  className="mt-4 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center transition duration-300"
                >
                  <PlusCircle className="mr-2" size={20} />
                  Add Row
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}