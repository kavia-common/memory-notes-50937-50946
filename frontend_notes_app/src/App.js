import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Header from './components/Header';
import NotesList from './components/NotesList';
import AddEditModal from './components/AddEditModal';

const STORAGE_KEY = 'memory-notes.v1';

// Utility to generate simple unique ids without external deps
const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

// PUBLIC_INTERFACE
function App() {
  /**
   * Single page notes app.
   * - Stores notes in localStorage for persistence.
   * - Fully client-side CRUD.
   * - No dependency on any env vars for core functionality.
   */
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // lifted search state
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setNotes(parsed);
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // storage may be blocked; operate in-memory only
    }
  }, [notes]);

  // PUBLIC_INTERFACE
  const handleAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  // PUBLIC_INTERFACE
  const handleEdit = (note) => {
    setEditing(note);
    setModalOpen(true);
  };

  // PUBLIC_INTERFACE
  const handleDelete = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // PUBLIC_INTERFACE
  const handleSave = (note) => {
    if (note.id) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === note.id
            ? { ...n, ...note, updatedAt: Date.now() }
            : n
        )
      );
    } else {
      setNotes((prev) => [
        {
          id: uid(),
          title: note.title,
          body: note.body,
          tags: note.tags || [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        ...prev,
      ]);
    }
    setModalOpen(false);
    setEditing(null);
  };

  // Filter notes by title or body (case-insensitive); live as user types
  const filteredNotes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter((n) => {
      const inTitle = (n.title || '').toLowerCase().includes(q);
      const inBody = (n.body || '').toLowerCase().includes(q);
      return inTitle || inBody;
    });
  }, [searchQuery, notes]);

  return (
    <div className="App">
      <Header
        onAdd={handleAdd}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={() => setSearchQuery('')}
      />
      <main className="main container">
        <NotesList notes={filteredNotes} onEdit={handleEdit} onDelete={handleDelete} />
      </main>

      <AddEditModal
        open={modalOpen}
        initial={editing}
        onCancel={() => { setModalOpen(false); setEditing(null); }}
        onSave={handleSave}
      />
    </div>
  );
}

export default App;
