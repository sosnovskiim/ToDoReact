import { useState, useRef, useEffect } from 'react';

function TaskItem({ task, onDelete, onDuplicate, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleEditClick = () => {
    setEditText(task.text);
    setEditing(true);
  };

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed) {
      onUpdate(task.id, trimmed);
    } else {
      setEditText(task.text);
    }
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <li className="to-do__item">
      {editing ? (
        <input
          ref={inputRef}
          className="to-do__item-text"
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span className="to-do__item-text">{task.text}</span>
      )}
      <button
        className="to-do__item-button to-do__item-button_type_edit"
        aria-label="Редактировать"
        onClick={handleEditClick}
      ></button>
      <button
        className="to-do__item-button to-do__item-button_type_duplicate"
        aria-label="Копировать"
        onClick={() => onDuplicate(task.id)}
      ></button>
      <button
        className="to-do__item-button to-do__item-button_type_delete"
        aria-label="Удалить"
        onClick={() => onDelete(task.id)}
      ></button>
    </li>
  );
}

export default TaskItem;
