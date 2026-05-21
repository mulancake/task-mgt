export default function FilterDropdown({ onNewTask, value, onChange, tasks = [], onDelete, onComplete, onIncomplete, onEditTask }) {
  const options = [
    { value: "All", label: "All" },
    { value: "Active", label: "Active" },
    { value: "Completed", label: "Completed" }
  ];

  return (
    <header>
      <div className="header-wrapper">
        <h1 className="text">Mini Task Manager</h1>
      </div>
      <div className="table-container">
        <table align="center" width="100%" className="text">
            <thead>
                <tr>
                    <th></th>
                    <th align="center">
                        <div className="header-right">
                            <select value={value} onChange={(e) => onChange(e.target.value)}>
                                {options.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </th>
                    <th>
                        <button className="btn-new" onClick={onNewTask}>
                            New Task
                        </button>
                    </th>
                </tr>
                <tr>
                    <th width="45%" style={{ textAlign: "left", paddingLeft: "20px" }}>Task</th>
                    <th width="15%">Status</th>
                    <th width="60%">Action</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task) => (
                    <tr key={task.id}>
                        <td style={{ textAlign: "left", paddingLeft: "16px" }}>{task.title}</td>
                        <td>{task.status}</td>
                        <td width="60%">
                            {task.status === "Active"
                                ? <button onClick={() => onComplete(task.id)}>Complete</button>
                                : <button onClick={() => onIncomplete(task.id)}>Incomplete</button>
                            }
                            {" "}
                            {task.title && (
                                <>
                                    <button onClick={() => onEditTask(task)}>
                                        Edit
                                    </button>
                                    {" "}
                                    <button onClick={() => onDelete(task.id)}>
                                        Delete
                                    </button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

    </header>
  );
}