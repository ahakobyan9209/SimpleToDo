import React from 'react';
import TodoForm from './TodoForm';
import TodoElement from './TodoElement';


export default class TodoList extends React.Component {
    state = {
        todos: [],
        todoToShow: 'all'
    };

    addTodo = (todo) => {
        // const newTodos = [todo,...this.state.todos]
        this.setState({
            todos: [todo, ...this.state.todos]
            // todos:newTodos
        })
    };

    toggleComplete = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    return {
                        // id:todo.id,
                        // text:todo.text,
                        ...todo,
                        complete: !todo.complete
                    }
                } else {
                    return todo;
                }
            })
        })

    }

    updateTodoToShow = (status) => {
        this.setState({
            todoToShow: status
        })
    }

    handleDeleteTodo = (id) => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        });
    }
    removeCompleteTodos = (id) => {
        this.setState({
            todos: this.state.todos.filter(todo => !todo.complete)
        });
    }

    render() {


        let newTodos = [];
        if (this.state.todoToShow === "all") {
            newTodos = this.state.todos;

        } else if (this.state.todoToShow === "active") {
            newTodos = this.state.todos.filter(todo => !todo.complete);
            console.log(newTodos);


        } else if (this.state.todoToShow === "complete") {
            newTodos = this.state.todos.filter(todo => todo.complete);

        }

        return (
            <div>
                <TodoForm onSubmit={this.addTodo} />
                {
                    newTodos.map(todo => (
                        // <div key={todo.id}>{todo.text}</div>
                        <TodoElement
                            key={todo.id}
                            // text={todo.text}
                            todo={todo}
                            toggleComplete={() => this.toggleComplete(todo.id)}
                            onDelete={() => this.handleDeleteTodo(todo.id)}
                        />
                    ))
                }
                <div>
                    Todos left:{this.state.todos.filter(todo => !todo.complete).length}
                </div>
                <div>
                    <button onClick={() => this.updateTodoToShow("all")}>All</button>
                    <button onClick={() => this.updateTodoToShow("active")}>Active</button>
                    <button onClick={() => this.updateTodoToShow("complete")}>Complete</button>
                </div>
                {this.state.todos.some(todo => todo.complete) ?(

                    <div>
                        <button onClick={this.removeCompleteTodos}>Remove all complete todos</button>
                    </div>
                 ):null}
            </div >
        )
    }
}