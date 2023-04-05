<template >
    <div class="text-center" id="your-container-element" style="margin: auto; width: 20%;"></div>
</template>

<script>
import { loadScript } from "@paypal/paypal-js";

export default {
    // reder button paypal 
    async mounted() {
        let paypal;
        // Load PayPal JS SDK
        try {
            paypal = await loadScript({ "client-id": "AQKDZ7Sr1AS-DGFMAHFDd3m8BLPDuCL8v8zjU9iesZO2H0zk8g2Dh1D-9gO-Uq3wNmIIBuxKfqJ5ADCT" });
        } catch (error) {
            console.error("failed to load the PayPal JS SDK script", error);
        }
        // Handler click button
        if (paypal) {
            try {
                await paypal
                    .Buttons({
                        // Sets up the transaction when a payment button is clicked
                        createOrder: async function () {
                            const response = await fetch("http://localhost:3000/create-paypal-order", {
                                method: "post",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                // use the "body" param to optionally pass additional order information
                                // like product skus and quantities
                                body: JSON.stringify({
                                    cart: [
                                        {
                                            sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
                                            quantity: "YOUR_PRODUCT_QUANTITY",
                                        },
                                    ],
                                }),
                            });
                            const order = await response.json();
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
                            const transaction = orderData.purchase_units[0].payments.captures[0];
                            alert(
                                "Transaction " +
                                transaction.status +
                                ": " +
                                transaction.id +
                                "\n\nSee console for all available details"
                            );
                        },
                    })
                    .render("#your-container-element");
            } catch (error) {
                console.error("failed to render the PayPal Buttons", error);
            }
        }
    },
};
</script>
