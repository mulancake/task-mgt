import { useState } from "react";

export default function TaskModal({ task, onClose, onSubmit, onEdit}) {
    const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "Active",
    });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit({ ...form, title: form.title.trim() });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onEdit({ ...form, title: form.title.trim() });
  }

return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <form onSubmit={task ? handleEdit : handleSubmit} className="modal-form">
          <div> 
            <table align="center" width="50%" className="text">
              <thead>
                <tr>
                    <th colSpan="2" align="center">
                        <div className="modal-header">
                            <h3>{task ? "Edit Task" : "New Task"}</h3>
                        </div>
                    </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>
                        <label style={{ fontFamily: "inherit", fontSize: "medium" }}>
                            Title <span className="required">*</span>
                        </label>
                    </td>
                    <td align="center" width="70%">
                        <label>
                            <input
                            style={{ width: "100%" }}
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="What needs to be done?"
                            autoFocus
                            required
                            />
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label style={{ fontFamily: "inherit", fontSize: "medium" }}>
                            Description
                        </label>
                    </td>
                    <td align="center" width="70%">
                        <label>
                            <textarea
                                style={{ width: "100%", height: "60px" }}
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Task details (optional)"
                                rows={2}
                            />
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label style={{ fontFamily: "inherit", fontSize: "medium" }}>
                            Status
                        </label>
                    </td>
                    <td align="left" width="70%">
                        <div className="form-row">
                            <label>
                                <text name="status" value={form.status} onchange={handleChange} style={{ fontFamily: "inherit", fontSize: "medium" }}>
                                    Active
                                </text>
                            </label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colSpan="2" align="center">
                        <div className="modal-actions">
                            <button type="button" className="btn-cancel" onClick={onClose}>
                                Cancel
                            </button>
                            &nbsp;&nbsp;&nbsp;
                            <button type="submit" className="btn-submit">
                                {task ? "Save Changes" : "Create Task"}
                            </button>
                        </div>
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
}