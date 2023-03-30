<template class="col-sm">
    <div class="container border rounded ps-5">
        <div class="text-uppercase fw-semibold"> Sửa địa chỉ </div>
        <AddressAccEdit @form-submitted="editAddress" :hidenCheck="this.hidenCheck" :check="checked" ref="myComponentRef" />
        <!-- <button class="btn" @click="submitForm">Submit</button> -->
        <!-- <button class="btn" @click="test()">Submit</button>  -->

    </div>
</template>
<script >
import AddressAccEdit from './AddressForm.vue';
import { useDataStore } from '@/stores/dataStores';
import axios from 'axios';
export default {
    components: {
        AddressAccEdit,
    },
    data() {
        return {
            addressEdit: useDataStore().getAddress.filter(address => address._id == this.$route.params.id),
            default: null,
            idDefault: useDataStore().getAddress.filter(i => i.default == true),
            showButton: true,
            hidenCheck: false,
            checked: false

        }
    },
    mounted() {
        if (this.addressEdit.find(address => address.default == true)) {
            this.hidenCheck = true
            this.checked = true
        }
        else this.check = false
        // Gọi phương thức của component con gán dữ liệu lên form
        this.$refs.myComponentRef.setData(this.$route.params.id);

    },
    methods: {
        test() {
            // Lấy đối tượng component con bằng $refs
            const childComponent = this.$refs.myComponentRef;

            // Gọi phương thức của component con
            childComponent.setData(this.$route.params.id);
        },
        editAddress(formData) {
            if (formData.default == true && this.$route.params.id != this.idDefault[0]._id) {
                console.log(this.idDefault)
                axios
                    .put(`http://localhost:3000/api/addresses/${this.idDefault[0]._id}`, { default: false }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        console.log(response)
                    })
            }
            axios
                .put(`http://localhost:3000/api/addresses/${this.$route.params.id}`, formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    console.log(response)
                    console.log(formData.default)

                }).catch(error => {
                    console.log(error)
                })
            console.log(JSON.stringify(formData))
            useDataStore().setSnackbar(true)
            this.$router.push({ name: "AddressAcc" })
        },
    },
}
</script>