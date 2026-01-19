import React, { useState } from "react";
import { Chart } from "react-google-charts";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design UI",
      assignedTo: "Alice",
      status: "To Do",
      comments: ["Wireframe approved", "Add color scheme"],
      start: new Date(2026, 0, 2),
      end: new Date(2026, 0, 5)
    },
    {
      id: 2,
      title: "Develop Backend",
      assignedTo: "Bob",
      status: "In Progress",
      comments: ["Setup DB", "Create API endpoints"],
      start: new Date(2026, 0, 6),
      end: new Date(2026, 0, 12)
    },
    {
      id: 3,
      title: "Testing",
      assignedTo: "Charlie",
      status: "Done",
      comments: ["Unit testing done", "Bug fixes applied"],
      start: new Date(2026, 0, 13),
      end: new Date(2026, 0, 15)
    }
  ]);

  const columns = ["To Do", "In Progress", "Done"];

  // Gantt chart data
  const ganttData = [
    [
      { type: "string", label: "Task ID" },
      { type: "string", label: "Task Name" },
      { type: "string", label: "Resource" },
      { type: "date", label: "Start Date" },
      { type: "date", label: "End Date" },
      { type: "number", label: "Duration" },
      { type: "number", label: "Percent Complete" },
      { type: "string", label: "Dependencies" }
    ],
    ...tasks.map(t => [
      t.id.toString(),
      t.title,
      t.assignedTo,
      t.start,
      t.end,
      null,
      t.status === "Done" ? 100 : t.status === "In Progress" ? 50 : 0,
      null
    ])
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Project Management Tool</h1>

      {/* Project Analytics */}
      <h2>Analytics</h2>
      <p>Total Tasks: {tasks.length}</p>
      <p>Completed Tasks: {tasks.filter(t => t.status === "Done").length}</p>
      <p>In Progress Tasks: {tasks.filter(t => t.status === "In Progress").length}</p>

      {/* Kanban Board */}
      <h2 style={{ marginTop: "20px" }}>Kanban Board</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {columns.map(col => (
          <div
            key={col}
            style={{
              width: "30%",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              background: "#f9f9f9"
            }}
          >
            <h3>{col}</h3>
            {tasks
              .filter(task => task.status === col)
              .map(task => (
                <div
                  key={task.id}
                  style={{
                    border: "1px solid #aaa",
                    borderRadius: "6px",
                    padding: "10px",
                    marginBottom: "10px",
                    background: "white",
                    boxShadow: "0 0 5px rgba(0,0,0,0.1)"
                  }}
                >
                  <h4>{task.title}</h4>
                  <p><b>Assigned to:</b> {task.assignedTo}</p>
                  <p><b>Comments:</b></p>
                  <ul>
                    {task.comments.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Gantt Chart */}
      <h2 style={{ marginTop: "30px" }}>Project Timeline (Gantt Chart)</h2>
      <Chart
        chartType="Gantt"
        width="100%"
        height="300px"
        data={ganttData}
      />
    </div>
  );
}

export default App;
