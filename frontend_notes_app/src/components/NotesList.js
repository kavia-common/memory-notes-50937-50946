import React from 'react';

function NoteCard({ note, onEdit, onDelete }) {
  return (
    <article className="note-card" role="article" aria-label={`Note titled ${note.title || 'Untitled'}`}>
      <div className="note-card-header">
        <h3 className="note-title">{note.title || 'Untitled'}</h3>
        <div className="note-actions">
          <button className="icon-btn" onClick={() => onEdit(note)} aria-label={`Edit note ${note.title || ''}`}>✏️</button>
          <button className="icon-btn danger" onClick={() => onDelete(note.id)} aria-label={`Delete note ${note.title || ''}`}>🗑️</button>
        </div>
      </div>
      <p className="note-body">
        {note.body || <span className="muted">No content</span>}
      </p>
      {note.tags && note.tags.length > 0 ? (
        <div className="note-tags">
          {note.tags.map((t) => (
            <span className="tag" key={t}>#{t}</span>
          ))}
        </div>
      ) : null}
      <div className="note-footer">
        <time className="note-date" dateTime={new Date(note.updatedAt).toISOString()}>
          {new Date(note.updatedAt).toLocaleString()}
        </time>
      </div>
    </article>
  );
}

// PUBLIC_INTERFACE
export default function NotesList({ notes, onEdit, onDelete }) {
  /** Renders a responsive grid of note cards. */
  if (!notes || notes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-card">
          <h3>No notes yet</h3>
          <p>Click “Add Note” to create your first note.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="notes-grid" aria-live="polite">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </section>
  );
}
