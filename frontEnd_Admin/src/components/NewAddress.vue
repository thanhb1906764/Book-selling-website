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
import addressesService from '../services/addresses.service';
export default {
    components: {
        AddressAccEdit,
    },
    data() {
        return {
            address: {},
            addressEdit: useDataStore().getAddress.filter(address => address._id == this.$route.params.id),
            idDefault: useDataStore().getAddress.filter(i => i.default == true),
        }
    },
    methods: {
        addAddress(formData) {
            if (formData.default == true) {
                console.log(this.idDefault)
                if (this.idDefault != "") {
                    addressesService.update(this.idDefault[0]._id, { default: false })
                }
            }
            addressesService.create(formData)
            console.log(JSON.stringify(formData))
            useDataStore().setSnackbar(true)
            this.$router.push({ name: "AddressAcc" })
        },
        submitForm() {
            this.$refs.AddressAccEdit.submitAddress()
        }
    }
}
</script>