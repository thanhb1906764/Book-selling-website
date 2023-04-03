<template >
    <div class="text-center" id="your-container-element" style="margin: auto; width: 20%;"></div>
</template>

<script>
import { loadScript } from "@paypal/paypal-js";

export default {
    // reder button paypal 
    async mounted() {
        let paypal;

        try {
            paypal = await loadScript({ "client-id": "ASrlSiWXjfgu4XajnAAVyRgMW0MxI7xaZUuyPOcSlUBbgNrPd6_NpSJO-KTmo-0unicA1nGyeEr_hHPZ" });
        } catch (error) {
            console.error("failed to load the PayPal JS SDK script", error);
        }

        if (paypal) {
            try {
                await paypal.Buttons().render("#your-container-element");
            } catch (error) {
                console.error("failed to render the PayPal Buttons", error);
            }
        }
    },
};
</script>
