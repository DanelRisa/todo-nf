'use client'

import { useState, useEffect } from 'react';
import TaskService from '@/app/services/TaskService';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const allTasks = await TaskService.getAllTasks();
      setTodos(allTasks);
    };
    fetchTasks();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() === '') return;
    const created = await TaskService.createNewTask({ content: newTodo });
    if (created) {
      setTodos((prev) => [...prev, created]);
      setNewTodo('');
    }
  };

  const deleteTodo = async (id) => {
    await TaskService.deleteTask(id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditText(todos[index].content);
  };

  const cancelEditing = () => {
    setEditIndex(null);
    setEditText('');
  };

  const saveTodo = async (index) => {
    const task = todos[index];
    if (!task || editText.trim() === '') return;

    await TaskService.updateTask(task.id, { content: editText });
    const updated = [...todos];
    updated[index].content = editText;
    setTodos(updated);
    cancelEditing();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>

      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow rounded-l-md border border-gray-300 p-2 focus:outline-none"
          placeholder="Enter a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-md px-4 py-2"
          onClick={addTodo}
        >
          Add
        </button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id} className="flex items-center justify-between border-b py-2">
            {editIndex === index ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-grow mr-2 border rounded p-1"
              />
            ) : (
              <span>{todo.content}</span>
            )}

            <div className="flex space-x-2">
              {editIndex === index ? (
                <>
                  <button
                    className="text-green-500 hover:text-green-600"
                    onClick={() => saveTodo(index)}
                  >
                    Save
                  </button>
                  <button
                    className="text-gray-500 hover:text-gray-600"
                    onClick={cancelEditing}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="text-yellow-500 hover:text-yellow-600"
                    onClick={() => startEditing(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;
