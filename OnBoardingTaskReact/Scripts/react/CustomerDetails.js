import React from 'react';
import { Container } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';

class CustomerDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAddCustomer: false,
            error: null,
            response: {},
            customer: {},
            isEditCustomer: false,
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.editCustomer = this.editCustomer.bind(this);
    }


    onCreate() {
        this.setState({ isAddCustomer: true });
    }

    onFormSubmit(data) {
        const Url = 'http://localhost:49521/Customer/Create';

        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        };

        fetch(Url, options)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        response: result,
                        isAddCustomer: false,
                        isEditCustomer: false
                    })
                },
                (error) => {
                    this.setState({ error })
                }
            )
    }

    editCustomer(Id) {
        const Url = 'http://localhost:49521/Customer/GetCustomer';

        var form = new FormData();
        form.append('Id', Id);

        const options = {
            method: 'POST',
            body: form,
        };

        fetch(Url, options)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        customer: result,
                        isAddCustomer: true,
                        isEditCustomer: true,
                    })
                },
                (error) => {
                    this.setState({ error })
                }
            )
    }

    render() {
        let customerF;
        if (this.state.isAddCustomer || this.state.isEditCustomer) {
            customerF = <CustomerForm onFormSubmit={this.onFormSubmit} customer={this.state.customer} />
        }
        return (
            <div>
                <Container>
                    {!this.state.isAddCustomer && <Button primary onClick={() => this.onCreate()}>Add Customer</Button>}
                    {!this.state.isAddCustomer && <CustomerList editCustomer={this.editCustomer} />}
                    {customerF}
                    {this.state.error && <div>Error: {this.state.error.message} </div>}
                </Container>
            </div>
        )
    }
}

export default CustomerDetails; 