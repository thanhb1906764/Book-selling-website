<template>
    <!-- Button trigger modal -->
    <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#RegisterUserModal">
        Login
    </button> -->

    <!-- Modal -->
    <div class="modal fade" id="RegisterUserModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <!-- position-absolute top-50 start-50 translate-middle -->
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Đăng Ký Tài khoản người dùng</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <Form class="container form" @submit="submitRegister" :validation-schema="userSchema">
                        <div class="row">
                            <div class="col">
                                <!-- phone -->
                                <div class="form-group form-floating mb-2">
                                    <Field name="phone" type="text" class="form-control" placeholder="Số điện thoại"
                                        v-model="user.phone" />
                                    <label for="phone">Số điện thoại</label>
                                    <ErrorMessage name="phone" class="error-feedback" />
                                </div>

                                <!-- name -->
                                <div class="form-group form-floating mb-2">
                                    <Field name="name" type="text" class="form-control" placeholder="Tên"
                                        v-model="user.name" />
                                    <label class="fs-6" for="name">Tên</label>
                                    <ErrorMessage name="name" class="error-feedback" />
                                </div>

                                <!-- password -->
                                <div class="form-group mb-2">
                                    <div class="input-group">
                                        <div class="form-floating">
                                            <Field name="password" v-bind:type="showPassword ? 'text' : 'password'"
                                                class="form-control" placeholder="Mật khẩu" v-model="user.password" />
                                            <label class="fs-6" for="password">Mật khẩu</label>
                                        </div>
                                        <!-- Sau khi xử lý summit sẽ đổi thành button  -->
                                        <span @click="showPasswordF" class="input-group-text user-select-none">{{
                                            msgShowPassword }}</span>
                                    </div>
                                    <!-- <p class="fw-lighter">Sử dụng 4 ký tự trở lên</p> -->
                                    <ErrorMessage name="password" class="error-feedback" />
                                </div>

                                <!-- password confirm -->
                                <div class="form-group mb-2">
                                    <div class="input-group">
                                        <div class="form-floating">
                                            <Field name="comfirmpassword" v-bind:type="showPassword ? 'text' : 'password'"
                                                class=" form-control" placeholder="Xác nhận mật khẩu" />
                                            <label class="fs-6" for="comfirmpassword">Xác nhận mật khẩu</label>
                                        </div>
                                        <span @click="showPasswordF" class="input-group-text user-select-none">{{
                                            msgShowPassword }}</span>
                                    </div>
                                    <ErrorMessage name="comfirmpassword" class="error-feedback" />
                                </div>

                                <!-- sex -->
                                <div v-show="true" class="form-group form-floating mb-2">
                                    <select required class="form-select" aria-label="" v-model="user.sex">
                                        <option selected>Chọn giới tính</option>
                                        <option :value='true'>Nam</option>
                                        <option :value='false'>Nữ</option>
                                    </select>
                                    <label class="fs-6" for="sex">Giới tính</label>
                                </div>

                                <!-- birthday -->
                                <div class="form-group form-floating mb-2">
                                    <Field name="birthday" type="date" class="form-control" placeholder="Tên"
                                        v-model="user.dateOfBirth" />
                                    <label class="fs-6" for="birthday">Ngày Sinh</label>
                                    <ErrorMessage name="birthday" class="error-feedback" />
                                </div>

                                <!-- register -->
                                <hr />
                                <div class="form-group fs-6 mb-2 d-flex justify-content-between">
                                    <router-link class="btn btn-outline-primary" to="/UserLogin">Đăng nhập</router-link>
                                    <button @click="submitRegister" type="submit" class="btn btn-primary text-white">Tạo tài
                                        khoản</button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
// import
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
            dateOfBirth: yup
                .date(),
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
            comfirmpassword: yup
                .string()
                .required('Hãy nhập mật khẩu lần nữa')
                .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp.'),
            registerDate: yup
                .date(),
            sex: yup
                .boolean(),
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
        async submitRegister() {
            try {
                let temp = await UsersService.create(this.user);
                if (temp === false)
                    alert('Password or name not match')
                else {
                    this.cookies = await UsersService.getCookies();
                    // Lưu vào localStorage 
                    localStorage.setItem('name', this.cookies.name)
                    console.log("User: " + localStorage.getItem('name'))
                    localStorage.setItem('_id', this.cookies._id)
                    console.log("id_ " + localStorage.getItem('_id'))
                    // Lưu vào store
                    useDataStore().setUser(this.cookies);
                    console.log(this.cookies);
                    // Chuyển hướng về HomePage 
                    this.$router.push('/' || '/');
                }
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