<template>
    <Form class="container form shadow-sm round-4 pb-5" @submit="submitLogin" :validation-schema="userSchema">
        <div class="row">
            <div class="col">
                <!-- Đăng nhập  -->
                <div class="form-group form-floating mb-3 text-center">
                    <div class="fw-bold fs-6 text-danger py-3">Book Store</div>
                    <div class="fw-bold fs-5">Đăng Nhập</div>
                    <small>Sử dụng tài khoản người mua</small>
                </div>

                <!-- phone -->
                <div class="form-group form-floating mb-2">
                    <Field name="phone" type="text" class="form-control" placeholder="Số điện thoại" v-model="user.phone" />
                    <label for="phone">Số điện thoại</label>
                    <ErrorMessage name="phone" class="error-feedback" />
                </div>

                <!-- name -->
                <div class="form-group form-floating mb-2">
                    <Field name="name" type="text" class="form-control" placeholder="Tên" v-model="user.name" />
                    <label class="fs-6" for="name">Tên</label>
                    <ErrorMessage name="name" class="error-feedback" />
                </div>

                <!-- password -->
                <div class="form-group mb-2">
                    <div class="input-group">
                        <div class="form-floating">
                            <Field name="password" v-bind:type="showPassword ? 'text' : 'password'" class="form-control"
                                placeholder="Mật khẩu" v-model="user.password" />
                            <label class="fs-6" for="password">Mật khẩu</label>
                        </div>
                        <!-- Sau khi xử lý summit sẽ đổi thành button  -->
                        <span @click="showPasswordF" class="input-group-text user-select-none">{{
                            msgShowPassword }}</span>
                    </div>
                    <!-- <p class="fw-lighter">Sử dụng 4 ký tự trở lên</p> -->
                    <ErrorMessage name="password" class="error-feedback" />
                </div>

                <!-- login -->
                <hr />
                <div class="form-group fs-6 mb-2 d-flex justify-content-between">
                    <router-link class="btn btn-outline-primary" to="/UserRegister">Tạo tài khoản</router-link>
                    <button type="submit" class="btn btn-primary text-white">Đăng nhập</button>
                </div>

            </div>
        </div>
    </Form>
    <button @click="logout">Logout</button>
</template>
<script>
// import here
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import UsersService from '@/services/users.service';
import { useDataStore } from '../stores/dataStores';
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const userSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải bắt buộc phải có")
                .min(3, "Tên phải có ít nhất 3 ký tự")
                .max(30, "Tên chứa nhiều nhất 30 ký tự"),
            password: yup
                .string()
                .required("Mật khẩu bắt buộc phải có")
                .min(3, "Mật khẩu phải có ít nhất 3 ký tự")
                .max(24, "Mật khẩu chứa nhiều nhất 30 ký tự"),
            phone: yup
                .string()
                .required("Số điện thoại bắt buộc phải có")
                .matches(
                    // /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    /((0)+([0-9])+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
        })
        return {
            showPassword: false,
            msgShowPassword: 'Hiển thị',
            user: {
                type: Object, required: true
            },
            userSchema,
            cookies: {},
        }
    },
    methods: {
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
                let temp = await UsersService.login(this.user);
                if (temp === false)
                    alert('Password or name not match')
                else {
                    this.cookies = await UsersService.getCookies();
                    // Kiểm tài khoản - có bị khoá hay không 
                    if (this.cookies.statusUser === false) {
                        alert('Tài khoản đã bị khoá');
                        this.user.phone = '';
                        this.user.name = '';
                        this.user.password = '';
                        return 0;
                    }
                    // Lưu vào store
                    useDataStore().setUser(this.cookies);
                    console.log(this.cookies);
                    // Lưu vào localStorage 
                    localStorage.setItem('name', this.cookies.name)
                    console.log("User: " + localStorage.getItem('name'))
                    localStorage.setItem('_id', this.cookies._id)
                    console.log("id_ " + localStorage.getItem('_id'))
                    console.log(useDataStore().getUser);
                    // Chuyển hướng về HomePage 
                    this.$router.push('/');
                }
            } catch (error) {
                console.log(error);
            }
        },

        // Đăng xuất 
        async logout() {
            try {
                // Xoá thông tin user từ cookies
                await UsersService.logout();
                // Xoá thông tin user từ store
                useDataStore().setUser([]);
                // Xoá thông tin user từ localStorage
                localStorage.removeItem("name");
                localStorage.removeItem("_id");
                // Chuyển hướng về HomePage
                this.$router.push('/');
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
<style scoped>
.form {
    max-width: 350px;
}
</style>
