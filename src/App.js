import React, { useState } from 'react';
import './App.css';

const Button = ({ children, ...props }) => <button {...props}>{children}</button>;
const Input = (props) => <input {...props} />;
const Card = ({ children }) => <div className="card">{children}</div>;
const CardHeader = ({ children }) => <div className="card-header">{children}</div>;
const CardContent = ({ children }) => <div className="card-content">{children}</div>;

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodoCompletion = (index) => {
    const updatedTodos = [...todos];
    const completedTodo = updatedTodos.splice(index, 1)[0];
    completedTodo.completed = !completedTodo.completed;
    
    if (completedTodo.completed) {
      setCompletedTodos([...completedTodos, completedTodo]);
    } else {
      setTodos([...updatedTodos, completedTodo]);
      const updatedCompletedTodos = completedTodos.filter(todo => todo !== completedTodo);
      setCompletedTodos(updatedCompletedTodos);
    }
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const resetApp = () => {
    setTodos([]);
    setCompletedTodos([]);
  };

  return (
    <div className="App">
      <div className="container">
        <Card>
          <CardHeader>
            <h2>Lista de Tareas</h2>
            <Button onClick={resetApp}>Resetear</Button>
          </CardHeader>
          <CardContent>
            <div className="input-container">
              <Input
                placeholder="Añadir nueva tarea"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addTodo();
                  }
                }}
              />
              <Button onClick={addTodo}>Añadir</Button>
            </div>
            <div className="todos-list">
              {todos.map((todo, index) => (
                <div key={index} className="todo-item">
                  <span>{todo.text}</span>
                  <div className="button-group">
                    <Button onClick={() => toggleTodoCompletion(index)}>✓</Button>
                    <Button onClick={() => deleteTodo(index)}>✗</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {completedTodos.length > 0 && (
          <Card>
            <CardHeader>Tareas Completadas</CardHeader>
            <CardContent>
              <div className="completed-todos-list">
                {completedTodos.map((todo, index) => (
                  <div key={index} className="completed-todo-item">
                    <span>{todo.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default App;