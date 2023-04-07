<template class=" col-sm">
    <div class="container border rounded">
        <div class="row m-2">
            <div class="col-10 d-flex align-items-center">Sổ địa chỉ</div>
            <RouterLink class="col-2 btn btn-danger" to="/acc/address/add"><button>Thêm địa chỉ mới</button></RouterLink>

        </div>
        <div class="row m-2">
            <div class="col">
                <div class="text-uppercase fw-semibold">Địa chỉ mặc định</div>
            </div>
            <div class="col">
                <div class="text-uppercase fw-semibold">Địa chỉ khác</div>
            </div>
        </div>
        <div class="row m-4">
            <div class="col">
                <div v-for="addressDefault in addressDefault">
                    <div>{{ addressDefault.name }}</div>

                    <div>{{ addressDefault.streetName }}</div>
                    <div>
                        {{ addressDefault.ward }},
                        {{ addressDefault.district }},
                        {{ addressDefault.city }}
                    </div>
                    <div>{{ addressDefault.phone }}</div>
                    <div style="color: red; font-weight: bolder;"><router-link
                            :to="{ name: 'AddressEditVue', params: { id: addressDefault._id } }">Sửa địa chỉ </router-link>
                    </div>
                </div>

            </div>
            <div class="col">
                <div v-for="address in addresses" :key="address._id">
                    
                    <div>{{ address.name }}</div>

                    <div>{{ address.streetName }}</div>
                    <div>
                        {{ address.ward }},
                        {{ address.district }},
                        {{ address.city }}
                    </div>
                    <div>{{ address.phone }}</div>
                    <div class="row mb-2 fw-semibold">
                        <div class="col-3 border-end text-danger "><router-link
                                :to="{ name: 'AddressEditVue', params: { id: address._id } }">Sửa địa chỉ </router-link>
                        </div>
                        <div class="col-3 text-secondary" @click="openDialog(address._id)">Xóa địa chỉ</div>
                    </div>  

                            <v-dialog v-model="dialog" persistent max-width="400">
                                <v-card>
                                    <v-card-title class="headline">Are you sure?</v-card-title>
                                    <v-card-text>
                                        This action cannot be undone.
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn color="green darken-1" 
                                            @click="dialog = false; deleteAddress(this.selectedAddressId)">Yes</v-btn>
                                        <v-btn color="red darken-1" text @click="dialog = false">No</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        
                    
                </div>
            </div>

        </div>
    </div>
    <v-snackbar v-model="snackbar" :timeout="timeout">
        cập nhật thành công

        <template v-slot:actions>
            <v-btn color="blue" variant="text" @click="snackbar = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script >
import axios from "axios";
import { useDataStore } from '@/stores/dataStores';
import { RouterLink } from "vue-router";
import addressService from "../services/addresses.service"
export default {
    data: () => {
        return {
            addressDefault: [],
            addresses: [],
            dialog: false,
            snackbar: useDataStore().getSnackbar,
            timeout: 2000,
            selectedAddressId: null, 
        };
    },
    computed: {

    },
    // updated(){
    //     this.address = useDataStore().getAddress.filter(item => item.default == false);
    //    this.addressDefault = useDataStore().getAddress.filter(item => item.default == true);
    // },
    mounted() {
        this.getAddress1()
    },
    methods: {
        async getAddress1() {
            this.addresses = await addressService.getAll()
            // useDataStore().getAPIAddress(this.address.filter(item => item._idUser == useDataStore().getUser._id));
            useDataStore().getAPIAddress(this.addresses.filter(item => item._idUser == localStorage.getItem('_id')));
            this.addresses = useDataStore().getAddress.filter(item => item.default == false);
            this.addressDefault = useDataStore().getAddress.filter(item => item.default == true);
        },
        async deleteAddress(id) {
            await addressService.delete(id);
            
            this.addresses = await addressService.getAll()
            useDataStore().getAPIAddress(this.addresses.filter(item => item._idUser == localStorage.getItem('_id')));
            this.addresses = useDataStore().getAddress.filter(item => item.default == false);
            this.addressDefault = useDataStore().getAddress.filter(item => item.default == true);

        },
        openDialog(addressId) {
            this.selectedAddressId = addressId;
            this.dialog = true;
        },
    },
    components: { RouterLink }
};



</script>