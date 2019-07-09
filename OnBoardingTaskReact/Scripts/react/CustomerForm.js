import React from 'react';
import { Form, Input, FormGroup } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

class CustomerForm extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            Id: '',
            Name: '',
            Address: '',
        }

        if (props.customer) {
            this.state = props.customer;
        } else {
            this.state = this.initialState;
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onFormSubmit(this.state);
        this.setState(this.initialState);
    }

    render() {
        let pageTitle;
        if (this.state.Id) {
            pageTitle = <h2>Edit Customer</h2>
        } else {
            pageTitle = <h2>Add Customer</h2>
        }

        return (
            <div>
                {pageTitle}
                <form onSubmit={this.handleSubmit}>

                    <Form.Group >
                        <label>Name</label>
                        <Form.Field
                            control={Input}
                            name="Name"
                            value={this.state.Name}
                            onChange={this.handleChange}
                            placeholder="Name"
                        />
                    </Form.Group>
                    <Form.Group >
                        <label>Address</label>
                        <Form.Field
                            control={Input}
                            name="Address"
                            value={this.state.Address}
                            onChange={this.handleChange}
                            placeholder="Address"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Field control={Input} name="Id" type="hidden" value={this.state.Id} />
                        <Form.Field control={Button} type="submit">Submit</Form.Field>
                    </Form.Group>
                </form>
            </div>
        )
    }

}

export default CustomerForm;





