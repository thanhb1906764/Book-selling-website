<template class="col-sm">
    <div class="container border rounded ps-5">
        <div class="text-uppercase fw-semibold"> Thêm địa chỉ mới</div>
        <AddressAccEdit @form-submitted="addAddress" :show-button="true" />
        <!-- <button class="btn" @click="submitForm">Submit</button> -->
    </div>
</template>
<script >
import AddressAccEdit from './AddressForm.vue';
import axios from 'axios';
import { useDataStore } from '../stores/dataStores';
export default {
    components: {
        AddressAccEdit,
    },
    data() {
        return {
            address: {}
        }
    },
    methods: {
        addAddress(formData) {

            axios
                .post("http://localhost:3000/api/addresses", formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })
            console.log(JSON.stringify(formData))
            useDataStore().setSnackbar(true)
            this.$router.push({name:"AddressAcc"})
        },
        submitForm() {
            this.$refs.AddressAccEdit.submitAddress()
        }
    }
}
</script>
