import React from 'react';

// PUBLIC_INTERFACE
export default function Header({ onAdd, searchQuery, onSearchChange, onClearSearch }) {
  /**
   * Header for the notes app with title, search input, and Add Note button.
   * Props:
   * - onAdd: () => void
   * - searchQuery: string (controlled)
   * - onSearchChange: (value: string) => void
   * - onClearSearch: () => void
   */
  return (
    <header className="header">
      <div className="header-inner container" style={{ gap: 12 }}>
        <h1 className="app-title" aria-label="Notes app title">Memory Notes</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, maxWidth: 540 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              aria-label="Search notes"
              placeholder="Search notes by title or content…"
              value={searchQuery || ''}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                paddingLeft: 12,
                border: '1px solid var(--border)',
                borderRadius: 10,
                background: 'var(--surface)',
                color: 'var(--text)',
                outline: 'none',
                transition: 'border-color .2s ease, box-shadow .2s ease',
              }}
            />
          </div>
          {searchQuery ? (
            <button className="btn" onClick={onClearSearch} aria-label="Clear search">
              Clear
            </button>
          ) : null}
        </div>

        <button className="btn btn-primary" onClick={onAdd} aria-label="Add a new note">
          + Add Note
        </button>
      </div>
    </header>
  );
}
