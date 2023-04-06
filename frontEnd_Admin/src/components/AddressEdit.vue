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
import AddressesService from '../services/addresses.service';
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
    async mounted() {
        if(!this.addressEdit){
            this.AddressAccEdit = await AddressesService.get(this.$route.params.id)
            console.log("axios addressEdit")
        }
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
        async editAddress(formData) {
            //Nêu chọn địa chỉ mặc định
            if (formData.default == true) {
                //Đếm xem có bao nhiêu địa chỉ mặc đinh (đề phòng lỗi)
                let countDefault= Object.keys ( this.idDefault).length
                //Nếu đã c0 địa chỉ mặc định
                if (this.idDefault!="") {
                    //gán địa chỉ mặc định có sẵn thành false
                    for(let i=0;i < countDefault;i++){
                        await AddressesService.update(this.idDefault[i]._id, { default: false })
                    }
                    
                }
            }
            await AddressesService.update(this.$route.params.id,formData)
            console.log(JSON.stringify(formData))
            useDataStore().setSnackbar(true)
            this.$router.push({ name: "AddressAcc" })
        },
    },
}
</script>