import React from 'react';
import { Container } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import SalesList from './CustomerList';
import SalesForm from './SalesForm';

class SalesDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            response: {},
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(data) {
        console.log(data); 
        const Url = 'http://localhost:49521/Sales/Create';

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
                    })
                },
                (error) => {
                    this.setState({ error })
                }
            )
    }

    render() {
        let salesF;
            salesF = <SalesForm onFormSubmit={this.onFormSubmit} />
        return (
            <div>
                <Container>
                    {salesF}
                    {this.state.error && <div>Error: {this.state.error.message} </div>}
                </Container>
            </div>
        )
    }
}

export default SalesDetails; 