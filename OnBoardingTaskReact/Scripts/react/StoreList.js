import React from 'react';
import { Table } from 'semantic-ui-react';
import { Button, Icon, Label } from 'semantic-ui-react'

class StoreList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            stores: [],
        };
    }

    componentDidMount() {
        const Url = 'http://localhost:49521/Store/GetStoreList';

        fetch(Url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        stores: result,
                    })
                },
                (error) => {
                    this.setState({ error })
                }
            )
    }

    //deleteCustomer(Id) {
    //    const { customers } = this.state;

    //    const Url = 'http://localhost:49521/Customer/DeleteCustomer';

    //    var form = new FormData();
    //    form.append('Id', Id);

    //    const options = {
    //        method: 'POST',
    //        body: form,
    //    };

    //    fetch(Url, options)
    //        .then(res => res.json())
    //        .then(
    //            (result) => {
    //                console.log(result);
    //                this.setState({
    //                    response: result,
    //                    customers: customers.filter(customer => customer.Id !== Id)
    //                })
    //            },
    //            (error) => {
    //                this.setState({ error })
    //            }
    //        )

    //}

    render() {

        const { error, stores } = this.state;

        if (error) {
            return (
                <div>Error: {error.message}</div>
            )
        } else {
            return (
                <div>
                    <h2> Store List </h2>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Address</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {stores.map( stores => (
                                <Table.Row key={stores.Id}>
                                    <Table.Cell>{stores.Id}</Table.Cell>
                                    <Table.Cell>{stores.Name}</Table.Cell>
                                    <Table.Cell>{stores.Address}</Table.Cell>

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
export default StoreList; 