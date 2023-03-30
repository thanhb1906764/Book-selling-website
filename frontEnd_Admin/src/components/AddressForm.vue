<template class="col-sm">
    <form>
        <div class="row ms-3">
            <div class="text-uppercase col-sm-6 ">
                Thông tin liên hệ

                <div class="input-group form-group flex-nowrap my-3">
                    <input type="text" class="form-control" placeholder="Họ và Tên" aria-describedby="addon-wrapping"
                        v-model="name">
                </div>
                <div class="input-group form-group flex-nowrap my-3">
                    <input type="text" class="form-control" placeholder="Số điện thoại" aria-describedby="addon-wrapping"
                        v-model="phone">
                </div>
            </div>
            <div class="col-sm ">
                ĐỊA CHỈ
                <div>
                    <div class="input-group form-group flex-nowrap my-3">
                        <input type="text" class="form-control" placeholder="Đường, số nhà"
                            aria-describedby="addon-wrapping" v-model="streetName">
                    </div>
                    <div>

                        <div class="form-group form-floating mb-2 my-3 flex-nowrap">
                            <select v-model="indexCity" class="form-select" aria-label="Default select example">
                                <option value="-1" selected>Chọn Tỉnh/Thành Phố</option>
                                <option v-for="(city, index) in citys" :value="index">{{ city.Name }}</option>
                            </select>
                            <label class="fs-6" for="floatingInput">Tỉnh/Thành Phố</label>
                        </div>

                        <div class="form-group form-floating mb-2 my-3 flex-nowrap">
                            <select v-model="indexDistrict" class="form-select" aria-label="Default select example">
                                <option value="-1" selected>Chọn Quận/Huyện</option>
                                <template v-if="get">
                                    <option v-for="(district, index) in Districts(indexCity)" :value="index">{{
                                        district.Name }}</option>
                                </template>
                            </select>
                            <label class="fs-6" for="floatingInput">Quận/Huyện</label>
                        </div>

                        <div class="form-group form-floating mb-2 my-3 flex-nowrap">
                            <select v-model="indexWard" class="form-select" aria-label="Default select example">
                                <option value="-1" selected>Chọn Phường/Xã</option>
                                <template v-if="get">
                                    <option v-for="(ward, index) in Wards(indexCity, indexDistrict)" :value="index">{{
                                        ward.Name }}</option>
                                </template>
                            </select>
                            <label class="fs-6" for="floatingInput">Phường/Xã</label>
                        </div>

                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckCheck" v-model="checkDefault"
                            :disabled='hidenCheck' :checked="check">
                        <label class="form-check-label" for="flexCheckCheck">
                            Sử dụng làm địa chỉ mặc định
                        </label>
                    </div>
                    <button @click.prevent="submitAddress" type="button" class="btn btn-danger float-end mb-2 my-3">Lưa địa
                        chỉ</button>
                </div>
            </div>
        </div>
    </form>
</template>
<script >
import axios from "axios";
import { object } from "yup";
import { useDataStore } from "@/stores/dataStores";
export default {
    props: {
        id: String,
        showButton: {
            type: Boolean,
            default: true,
        },
        hidenCheck: {
            type: Boolean,
            default: false,
        },
        check: {
            type: Boolean,
            default: false,
        },

    },
    data: () => {
        return {
            citys: [], indexCity: -1,
            indexDistrict: 0,
            indexWard: 0,
            name: "",
            phone: "",
            checkDefault: false,
            streetName: "",
            check: false,
            

        };
    },
    mounted() {
        axios
            .get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
            .then((response) => {
                this.citys = response.data

            })
    },
    computed: {
        get() {
            return this.citys[this.indexCity]
        }
    },
    methods: {
        Districts(index) {
            return this.citys[index].Districts
        },
        Wards(indexCity, indexDistrict) {
            return this.citys[indexCity].Districts[indexDistrict].Wards
        },
        changeSnackbar(){
            
        },
        submitAddress() {
            this.$emit("form-submitted", {
                // _idUser: useDataStore().getUser._id,
                _idUser: localStorage.getItem('_id'),
                name: this.name,
                phone: this.phone,
                city: this.citys[this.indexCity].Name,
                district: this.citys[this.indexCity].Districts[this.indexDistrict].Name,
                ward: this.citys[this.indexCity].Districts[this.indexDistrict].Wards[this.indexWard].Name,
                streetName: this.streetName,
                default: document.getElementById("flexCheckCheck").checked,
                
            })
        },
        setData(id) {
            var temp = useDataStore().getAddress.filter(item => item._id == id)
            this.streetName = temp[0].streetName
            this.phone = temp[0].phone
            this.name = temp[0].name
            this.default = temp[0].default
        }
    }
};



</script>