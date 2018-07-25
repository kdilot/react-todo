import React, { Component } from 'react';
import TodoListTemplete from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Palette from './components/Palette';

const colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6'];

class App extends Component {

    id = 3;
    state = {
        input: '',
        todos: [
            { id: 0, text: 'Introduce React', checked: false },
            { id: 1, text: 'Introduce React', checked: true },
            { id: 2, text: 'Introduce React', checked: false },
        ],
        color: '#f03e3e'
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value
        });
    }

    handleCreate = () => {
        const { input, todos, color } = this.state;
        if (!input) {
            this.setState({
                input: 'No data'
            })
        } else {
            this.setState({
                input: '',
                todos: todos.concat({
                    id: this.id++,
                    text: input,
                    color,
                    checked: false
                })
            });
        }

    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleCreate();
        }
    }

    handleToggle = (id) => {
        const { todos } = this.state;
        const index = todos.findIndex(todo => todo.id === id);
        const selected = todos[index];
        const nextTodos = [...todos];

        nextTodos[index] = {
            ...selected,
            checked: !selected.checked
        };

        this.setState({
            todos: nextTodos
        });
    }
    /* another option 
    handleToggle = (id) => {
        const { todos } = this.state;
        const index = todos.findIndex(todo => todo.id === id);
        const selected = todos[index];

        this.setState({
            todos: [
                ...todos.slice(0, index),
                {
                    ...selected,
                    checked: !selected.checked
                },
                ...todos.slice(index + 1, todos.length)
            ]
        });
    }
    */

    handleRemove = (id) => {
        const { todos } = this.state;

        this.setState({
            todos: todos.filter(todo => todo.id !== id)
        });
    }

    handleSelectColor = (color) => {
        this.setState({
            color
        })
    }

    render() {
        const { input, todos, color } = this.state;
        const {
            handleChange,
            handleCreate,
            handleKeyPress,
            handleToggle,
            handleRemove,
            handleSelectColor
        } = this;
        return (
            <TodoListTemplete form={(
                <Form
                    value={input}
                    onKeyPress={handleKeyPress}
                    onChange={handleChange}
                    onCreate={handleCreate}
                    color={color}
                />
            )}
                palette={(
                    <Palette colors={colors} selected={color} onSelect={handleSelectColor} />
                )}>
                <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
            </TodoListTemplete>
        );
    }
}

export default App;