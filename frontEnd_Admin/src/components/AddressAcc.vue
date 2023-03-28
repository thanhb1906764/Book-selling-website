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
                <div v-for="address in address">
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
                        <div class="col-3 text-secondary" @click="deleteAddress(address._id)">Xóa địa chỉ</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script >
import axios from "axios";
import { useDataStore } from '@/stores/dataStores';
import { RouterLink } from "vue-router";
export default {
    data: () => {
        return {
            addressDefault: [],
            address: [],
        };
    },
    mounted() {
        axios
            .get("http://localhost:3000/api/addresses/")
            .then((response) => {
                console.log(response.data);
                useDataStore().getAPIAddress(response.data.filter(item => item._idUser == useDataStore().getUser._id));
                this.address = useDataStore().getAddress.filter(item => item.default == false);
                this.addressDefault = useDataStore().getAddress.filter(item => item.default == true);
            });
    },
    methods: {
        deleteAddress(id) {
            axios.delete(`http://localhost:3000/api/addresses/${id}`);
        }
    },
    components: { RouterLink }
};



</script>