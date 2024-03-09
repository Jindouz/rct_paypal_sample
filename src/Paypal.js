
import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';


const Paypal = () => {
    const [num, setnum] = useState("1")

    const paypalOptions = {
        'client-id': "test", // Replace with your actual PayPal client ID
        currency: 'USD',
    };


    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: num, // Replace with the amount you want to charge
                    },
                },
            ],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            // Handle successful payment
            console.log(details);
            console.log('transaction ID: ' + details.id);
            // You can add more logic here, like updating the UI or notifying the user
        });
    };


    const onError = (err) => {
        // Handle errors
        console.error(err);
    };


    return (
        <div>
            <div>
                Input Price: <input type="number" value={num} onChange={(e) => setnum(e.target.value)} />
            </div>
            <br/>
            <PayPalScriptProvider options={paypalOptions}>
                <PayPalButtons
                    key={num}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                />
            </PayPalScriptProvider>
        </div>
    );
};


export default Paypal;