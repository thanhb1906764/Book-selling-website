<template>
    <Form class="container form shadow-sm p-4 mb-3" @submit="submitLogin" :validation-schema="adminSchema">
        <div class="row text-dark">
            <!-- <div class="col"></div> -->
            <div class="col">

                <!-- Đăng nhập  -->
                <div class="form-group form-floating mb-3 text-center">
                    <div class="fw-bold fs-6 text-danger py-3">Book Store</div>
                    <div class="fw-bold fs-5">Đăng Nhập</div>
                    <small>Sử dụng tài khoản người bán</small>
                </div>

                <!-- name -->
                <hr class="text-danger" />
                <div class="form-group form-floating mb-3">
                    <Field name="name" type="text" class="form-control" placeholder="Tên" v-model="admin.name" />
                    <label for="name">Tên</label>
                    <ErrorMessage name="name" class="error-feedback" />
                </div>

                <!-- password -->
                <div class="form-group mb-3">
                    <div class="input-group">
                        <div class="form-floating">
                            <Field name="password" v-bind:type="showPassword ? 'text' : 'password'" class="form-control"
                                placeholder="Mật khẩu" v-model="admin.password" />
                            <label for="password">Mật khẩu</label>
                        </div>
                        <span @click="showPasswordF" class="input-group-text user-select-none">{{
                            msgShowPassword }}</span>
                    </div>
                    <ErrorMessage name="password" class="error-feedback" />
                </div>

                <!-- login -->
                <div class="form-group text-center">
                    <button type="submit" class="btn btn-primary text-white">Đăng nhập</button>
                </div>

            </div>
        </div>
    </Form>
</template>

<script>
// import here
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import AdminsService from '@/services/admins.service';
import { useDataStore } from '../stores/dataStores';

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const adminSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên bắt buộc phải có")
                .min(3, "Tên phải có ít nhất 3 ký tự")
                .max(30, "Tên chứa nhiều nhất 30 ký tự"),
            password: yup
                .string()
                .required("Mật khẩu bắt buộc phải có")
                .min(3, "Mật khẩu phải có ít nhất 3 ký tự")
                .max(24, "Mật khẩu chứa nhiều nhất 30 ký tự"),
        })
        return {
            showPassword: false,
            msgShowPassword: 'Hiển thị',
            admin: {
                type: Object, required: true
            },
            adminSchema,
            cookies: {},
        }
    },
    methods: {
        // Show or hire password
        showPasswordF() {
            if (this.showPassword === false) {
                this.showPassword = true
                this.msgShowPassword = 'Ẩn'
            } else {
                this.showPassword = false
                this.msgShowPassword = 'Hiển thị'
            }
        },
        async submitLogin() {
            try {
                let temp = await AdminsService.login(this.admin);
                if (temp === false)
                    alert('Password or name not match')
                else {
                    this.cookies = await AdminsService.getCookies();
                    // Lưu vào store
                    useDataStore().setAdmin(this.cookies);
                    console.log(this.cookies);
                    // Lưu vào localStorage 
                    localStorage.setItem('admin', this.cookies.name)
                    console.log("Admin: " + localStorage.getItem('admin'))
                    // Chuyển hướng về trang của Admin
                    this.$router.push('/Products' || '/');
                }
            } catch (error) {
                console.log(error);
            }
        },

        // Đăng xuất
        async logout() {
            try {
                // Xoá thông tin user từ cookies
                await AdminsService.logout();
                // Xoá thông tin user từ store
                useDataStore().setAdmin([]);
                // Xoá thông tin user từ localStorage
                localStorage.removeItem("admin")
                // Chuyển hướng về HomePage
                this.$router.push('/Products');
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
        // nếu admin đã đã đăng nhập thì chuyển hướng đến /Products
        console.log(useDataStore().getAdmin);
        if (useDataStore().getAdmin.name) {
            this.$router.push('/Products');
        }
    }
}

</script>
<style scoped>
.form {
    max-width: 400px;
}
</style>
