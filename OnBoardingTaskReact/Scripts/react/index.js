import React from 'react';
import ReactDOM from 'react-dom';
import CustomerDetails from './CustomerDetails';
import StoreDetails from './StoreDetails';
import SalesDetails from './SalesDetails';
import SalesList from './SalesList';


ReactDOM.render(
    <div>  
        <CustomerDetails />,
        <StoreDetails />,
        <SalesDetails />
    </div>,
   document.getElementById('root')
);


