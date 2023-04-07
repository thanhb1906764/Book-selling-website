<template >
    <div class="text-center" id="your-container-element" style="margin: auto; width: 20%;"></div>
</template>

<script>
import { loadScript } from "@paypal/paypal-js";

export default {
    data() {
        return {
            YOUR_PRODUCT_STOCK_KEEPING_UNIT: 10,
            YOUR_PRODUCT_QUANTITY: 2
        }
    },
    mounted() {

    },
    methods: {
        // reder button paypal
        async paypalHanler() {
            let paypal;
            // Load PayPal JS SDK
            try {
                paypal = await loadScript({
                    "client-id": "AQKDZ7Sr1AS-DGFMAHFDd3m8BLPDuCL8v8zjU9iesZO2H0zk8g2Dh1D-9gO-Uq3wNmIIBuxKfqJ5ADCT",
                    "data-page-type": "checkout",
                    sdkBaseURL: 'https://www.paypal.com/sdk/js'
                });
            } catch (error) {
                console.error("failed to load the PayPal JS SDK script", error);
            }
            // Handler click button
            if (paypal) {
                try {
                    await paypal
                        .Buttons({

                            // style
                            style: {
                                layout: 'horizontal',
                                // color: 'blue',
                                shape: 'rect',
                                label: 'checkout',
                                height: 32,
                                tagline: false
                            },

                            // Sets up the transaction when a payment button is clicked
                            createOrder: async function () {
                                const response = await fetch("http://localhost:3000/create-paypal-order", {
                                    method: "post",
                                    credentials: "include",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    // use the "body" param to optionally pass additional order information
                                    // like product skus and quantities
                                    body: JSON.stringify({
                                        cart: [
                                            {
                                                // sku: this.YOUR_PRODUCT_STOCK_KEEPING_UNIT,
                                                // quantity: this.YOUR_PRODUCT_QUANTITY,

                                                intent: "CAPTURE",
                                                purchase_units: [
                                                    {
                                                        items: [
                                                            {
                                                                name: "T-Shirt",
                                                                description: "Green XL",
                                                                quantity: "1",
                                                                unit_amount: {
                                                                    currency_code: "USD",
                                                                    value: "1.00"
                                                                }
                                                            }
                                                        ],
                                                        amount: {
                                                            currency_code: "USD",
                                                            value: "1.00",
                                                            breakdown: {
                                                                item_total: {
                                                                    currency_code: "USD",
                                                                    value: "1.00"
                                                                }
                                                            }
                                                        },
                                                    },
                                                ],

                                            },
                                        ],
                                    }),
                                });
                                const order = await response.json();
                                // Successful create! For dev/demo purposes:
                                console.log(
                                    "Create result",
                                    order,
                                    JSON.stringify(order, null, 2)
                                );
                                return order.id;
                            },

                            // Finalize the transaction after payer approval
                            onApprove: async function (data) {
                                const response = await fetch("http://localhost:3000/capture-paypal-order", {
                                    method: "post",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        orderID: data.orderID,
                                    }),
                                });
                                const orderData = await response.json();
                                // Successful capture! For dev/demo purposes:
                                console.log(
                                    "Capture result",
                                    orderData,
                                    JSON.stringify(orderData, null, 2)
                                );
                            },

                            // onInit is called when the button first renders
                            onInit(data, actions) {

                                // // Disable the buttons
                                // actions.disable();

                                // // Listen for changes to the checkbox
                                // document.querySelector('#check')
                                //     .addEventListener('change', function (event) {

                                //         // Enable or disable the button when it is checked or unchecked
                                //         if (event.target.checked) {
                                //             actions.enable();
                                //         } else {
                                //             actions.disable();
                                //         }
                                //     });
                            },

                            // onClick is called when the button is clicked
                            onClick() {

                                // // Show a validation error if the checkbox is not checked
                                // if (!document.querySelector('#check').checked) {
                                //     document.querySelector('#error').classList.remove('hidden');
                                // }
                            },

                            // Cancel 
                            onCancel(data) {
                                // Thanh toán lỗi
                                window.location.href = "http://localhost:3001/Test";
                            },

                            // Error
                            onError(err) {
                                // For example, redirect to a specific error page
                                window.location.href = "/your-error-page-here";
                            },
                        })
                        .render("#your-container-element");
                } catch (error) {
                    console.error("failed to render the PayPal Buttons", error);
                }
            }
        }
    },
    created() {
        this.paypalHanler();
    }
};
</script>
