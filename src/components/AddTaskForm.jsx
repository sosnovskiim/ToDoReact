import { useState } from 'react';

function AddTaskForm({ onAdd }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value.trim());
      setValue('');
    }
  };

  return (
    <form className="to-do__form" onSubmit={handleSubmit}>
      <input
        className="to-do__input"
        type="text"
        name="task"
        placeholder="Следующее дело..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="to-do__submit"
        type="submit"
        disabled={!value.trim()}
      >
        Добавить
      </button>
    </form>
  );
}

export default AddTaskForm;
