import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onDuplicate, onUpdate }) {
  return (
    <ul className="to-do__list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}

export default TaskList;
