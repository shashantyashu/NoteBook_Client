import React, { useEffect, useState } from 'react'
import api from '../api' // adjust import path if different

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  // Fetch notes on mount
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true)
      try {
        const res = await api.get('/notes')
        setNotes(res.data)
      } catch (err: any) {
        alert(err?.response?.data?.message || 'Failed to load notes')
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  const createNote = async () => {
    if (!title && !content) return
    try {
      const res = await api.post('/notes', { title, content })
      setNotes(prev => [res.data, ...prev])
      setTitle('')
      setContent('')
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to create note')
    }
  }

  const deleteNote = async (id: string) => {
    if (!confirm('Delete this note?')) return
    try {
      await api.delete(`/notes/${id}`)
      setNotes(prev => prev.filter(n => n._id !== id))
    } catch (err: any) {
      alert('Delete failed')
    }
  }

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p>Manage your notes</p>

      <div className="note-form">
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button onClick={createNote}>Create Note</button>
      </div>

      <h3>Your notes</h3>
      {loading ? <p>Loading...</p> : null}
      <ul className="notes-list">
        {notes.map(n => (
          <li key={n._id} className="note">
            <strong>{n.title || '(no title)'}</strong>
            <p>{n.content}</p>
            <div className="note-actions">
              <button onClick={() => deleteNote(n._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard
