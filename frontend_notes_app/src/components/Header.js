import React from 'react';

// PUBLIC_INTERFACE
export default function Header({ onAdd }) {
  /** Header for the notes app with title and Add Note button */
  return (
    <header className="header">
      <div className="header-inner container">
        <h1 className="app-title" aria-label="Notes app title">Memory Notes</h1>
        <button className="btn btn-primary" onClick={onAdd} aria-label="Add a new note">
          + Add Note
        </button>
      </div>
    </header>
  );
}
