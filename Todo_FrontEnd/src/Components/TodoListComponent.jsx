import { useEffect, useState } from "react";
import { deleteItem, reteriveTodoList } from "./api/ApiServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthProvider";

export default function TodosComponent() {
  // const date = new Date();
  const context = useAuth();
  const username = context.username;
  const [todoList, setTodo] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  // const targetDate = new Date(
  //   date.getUTCFullYear() + 2,
  //   date.getUTCMonth(),
  //   date.getDay()
  // );
  useEffect(() => refereshTodo(), []);

  function refereshTodo() {
    reteriveTodoList("mukesh")
      .then((response) => setTodo(response.data))
      .catch((error) => console.log(error));
  }

  // const todoList = [
  //   { id: 1, name: "Complete Java", isDone: false, targetDate: targetDate },
  //   { id: 2, name: "Have Tea", isDone: false, targetDate: targetDate },
  //   { id: 3, name: "Jogging", isDone: false, targetDate: targetDate },
  //   { id: 4, name: "Utensils", isDone: false, targetDate: targetDate },
  // ];

  function deleteById(id) {
    deleteItem("mukesh", id)
      .then(() => {
        setMessage(`Task with id : ${id} deleted successfully`);
        refereshTodo();
      })
      .catch((error) => console.log(error));
  }

  function updateById(id) {
    navigate(`/${username}/todo/${id}`);
  }

  return (
    <div className="container">
      <h1>Here is your To-Do List</h1>
      {message && <div className="alert alert-warning">{message}</div>}
      <div>
        <table className="table">
          <thead>
            <tr>
              <td>Description</td>
              <td>Completed</td>
              <td>TargetDate</td>
              <td>Delete</td>
              <td>Update</td>
            </tr>
          </thead>
          <tbody>
            {todoList.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{todo.targetDate.toString()}</td>
                <td>
                  <button
                    className="btn btn-warning m-2"
                    onClick={() => deleteById(todo.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success m-2 "
                    onClick={() => updateById(todo.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button
          className="btn btn-success m-3"
          type="submit"
          onClick={() => navigate(`/${username}/todo/-1`)}
        >
          Add New Todo
        </button>
      </div>
    </div>
  );
}
