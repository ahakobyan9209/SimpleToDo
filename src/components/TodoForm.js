import React from 'react';
import shortid from 'shortid';


export default class TodoForm extends React.Component {
    state = {
        text: ''
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }
    handleSubmit = event => {
        event.preventDefault();
        //submit
        this.props.onSubmit({
            id: shortid.generate(), //3rd party library shortid
            text: this.state.text,
            complete: false

        });
        this.setState({
            text: ''
        })


    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    name="text"
                    value={this.state.text}
                    onChange={this.handleChange}
                    placeholder='What needs to be done...'
                />
                <button onClick={this.handleSubmit}>Add Todo</button>
            </form>
        )
    }
}