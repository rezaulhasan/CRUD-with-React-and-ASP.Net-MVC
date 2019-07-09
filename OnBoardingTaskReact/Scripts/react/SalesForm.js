import React from 'react';
import { Form, Input } from 'semantic-ui-react';
import { Button, Icon, Label } from 'semantic-ui-react'

class SalesForm extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            error: null,
            customers: [],
            stores: [],
            products: [],
            CustomerId: "",
            ProductId: "", 
            StoreId: ""
        }

        this.state = this.initialState;

        this.handleChange = this.handleChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    componentDidMount() {
        const Url = 'http://localhost:49521/Customer/GetCustomerList';
        fetch(Url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        customers: result,
                    })
                },
                (error) => {
                    this.setState({ error })
                }
        )
        const Url1 = 'http://localhost:49521/Store/GetStoreList';
        fetch(Url1)
            .then(res => res.json())
            .then(
                (result1) => {
                    this.setState({
                        stores: result1,
                    })
                },
                (error) => {
                    this.setState({ error })
                }
        )
        const Url2 = 'http://localhost:49521/Product/GetProductList';
        fetch(Url2)
            .then(res => res.json())
            .then(
                (result2) => {
                    this.setState({
                        products: result2,
                    })
                },
                (error) => {
                    this.setState({ error })
                }
            )


    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value; 
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
    //const {customers, stores, products } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <select label="Customer Name" name="CustomerId" onChange={this.handleChange}>
                        {this.state.customers.map(function (customer, Id) {
                            return (
                                <option key={Id} value={customer.Id}>{customer.Name}</option>)
                        })}
                    </select>
                    <br /> 
                    <select label="Product Name" name="ProductId"  onChange={this.handleChange}>
                        {this.state.products.map(function (product, Id) {
                            return (
                                <option key={Id} value={product.Id} >{product.Name}</option>)
                        })}
                    </select>
                    <br /> 
                    <select label="Store Name" name="StoreId" onChange={this.handleChange} >
                        {this.state.stores.map(function (store, Id) {
                            return (
                                <option key={Id} value={store.Id} >{store.Name}</option>)
                        })}
                    </select>
                    <br/>
                    <Form.Group>
                        <Form.Field control={Button} type="submit">Submit</Form.Field>
                    </Form.Group>
                    </form>
            </div> 
            )
    }    
}
export default SalesForm; 