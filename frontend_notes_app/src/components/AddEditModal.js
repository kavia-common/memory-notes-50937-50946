import React, { useEffect, useRef, useState } from 'react';

// PUBLIC_INTERFACE
export default function AddEditModal({ open, initial, onCancel, onSave }) {
  /**
   * A11y-friendly modal for adding/editing notes.
   * Props:
   * - open: boolean to control visibility
   * - initial: initial note ({id?, title, body, tags})
   * - onCancel: callback when cancelled
   * - onSave: callback(note) when saved
   */
  const [title, setTitle] = useState(initial?.title || '');
  const [body, setBody] = useState(initial?.body || '');
  const [tags, setTags] = useState((initial?.tags || []).join(', '));
  const [error, setError] = useState('');
  const dialogRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTitle(initial?.title || '');
      setBody(initial?.body || '');
      setTags((initial?.tags || []).join(', '));
      setError('');
      setTimeout(() => titleRef.current && titleRef.current.focus(), 10);
    }
  }, [open, initial]);

  const handleSave = () => {
    if (!title.trim() && !body.trim()) {
      setError('Please add a title or some content.');
      return;
    }
    const cleanedTags = tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    onSave({
      ...(initial?.id ? { id: initial.id } : {}),
      title: title.trim(),
      body: body.trim(),
      tags: cleanedTags,
    });
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') onCancel();
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSave();
    }
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="note-modal-title" ref={dialogRef} onKeyDown={onKeyDown}>
      <div className="modal">
        <header className="modal-header">
          <h2 id="note-modal-title">{initial?.id ? 'Edit note' : 'Add note'}</h2>
        </header>
        <div className="modal-body">
          {error ? <div className="alert alert-error" role="alert">{error}</div> : null}
          <div className="form-group">
            <label htmlFor="note-title">Title</label>
            <input
              id="note-title"
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="note-body">Content</label>
            <textarea
              id="note-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your note..."
              rows={6}
            />
          </div>
          <div className="form-group">
            <label htmlFor="note-tags">Tags (comma-separated)</label>
            <input
              id="note-tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="work, personal"
            />
          </div>
        </div>
        <footer className="modal-footer">
          <button className="btn" onClick={onCancel} aria-label="Cancel">Cancel</button>
          <button className="btn btn-accent" onClick={handleSave} aria-label="Save note">
            {initial?.id ? 'Save changes' : 'Add note'}
          </button>
        </footer>
      </div>
    </div>
  );
}
