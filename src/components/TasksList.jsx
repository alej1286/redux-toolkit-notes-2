import {
  useGetTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../api/apiSlice";

function TasksList() {
  const { data, isError, isLoading, error } = useGetTasksQuery();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error : {error.message}</div>;

  return (
    <ul>
      {data.map((task) => {
        return (
          <li key={task.id}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <input
              type="checkbox"
              onChange={(e) => {
                updateTask({
                  ...task,
                  completed: e.target.checked,
                });
              }}
              name=""
              id={task.id}
              checked={task.completed}
            />
            <label htmlFor={task.id}>completed</label>
          </li>
        );
      })}
    </ul>
  );
}

export default TasksList;
