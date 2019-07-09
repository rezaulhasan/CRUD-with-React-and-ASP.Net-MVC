import React from 'react';
import { Table, Form, Select, FormGroup } from 'semantic-ui-react';
import { Button, Icon, Label } from 'semantic-ui-react'

class SalesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            sales: [],
        };
    }

    componentDidMount() {
        const Url = 'http://localhost:49521/Sales/GetSalesList';

        fetch(Url)
            .then(res => res.json())
            .then(
            (result) => {
                console.log(result); 
                    this.setState({
                        sales: result,
                    })
                },
                (error) => {
                    this.setState({ error })
                }
            )
    }

    render() {

        const { error, sales } = this.state;

        if (error) {
            return (
                <div>Error: {error.message}</div>
            )
        } else {
            return (
                <div>
                    <h2> Sales List </h2>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Customer Name</Table.HeaderCell>
                                <Table.HeaderCell>Product Name</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {sales.map(sales => (
                                <Table.Row >
                                    <Table.Cell>{sales.CustomerName.name}</Table.Cell>
                                    <Table.Cell>{sales.ProductName.name}</Table.Cell>

                                    <Table.Cell>
                                        <Button icon labelPosition='left' color='orange'
                                            onClick={() => this.props.editCustomer(customers.Id)} >
                                            <Icon name='edit outline' />
                                            Edit
                                         </Button>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Button icon labelPosition='left' color='red'
                                            onClick={() => this.deleteCustomer(customers.Id)} >
                                            <Icon name='trash' />
                                            Delete
                                         </Button>
                                    </Table.Cell>

                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            )
        }
    }

}
export default SalesList; 