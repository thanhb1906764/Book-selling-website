<template>
    <div style="padding: 10px;">
        <h3 class="text-center font-weight-bold" style="padding: 20px;color: #356859;">THÔNG TIN SÁCH</h3>
        <v-form @submit.prevent="Submit" style="border: 1px solid darkgrey; padding: 10px;">
            <div class="row">
                <v-text-field variant="underlined" class="col-sm-6" v-model="book.receiptDate" :rules="rules"
                    label="Ngày nhập"></v-text-field>
                <div class="col-sm-6 " style="display: flex;align-items: stretch;">
                    <div style="width: 100%;">
                        <v-select label="Chọn nhà cung cấp" variant="underlined" auto-grow :rules="rules"
                            v-bind:items="supplierList" v-model="book.supplisherName"></v-select>
                    </div>
                    <v-dialog transition="dialog-top-transition" width="60%">
                        <template v-slot:activator="{ props }">
                            <v-btn color="primary" style="width: 0; height: 70%;;font-size: larger;font-weight: 600;"
                                v-bind="props"><i class="fas fa-solid fa-user-plus"></i></v-btn>
                        </template>
                        <template v-slot:default="{ isActive }">
                            <v-card>
                                <v-toolbar color="primary" title="Thêm nhà cung cấp mới"></v-toolbar>
                                <v-form @submit.prevent>
                                    <v-card-text>
                                        <div style="display: flex;align-items: center;">
                                            <div style="font-size: xx-large; margin-right: 20px;"><i
                                                    class="fa-solid fa-user-tie"></i></div>
                                            <v-text-field ref="nameBook" :rules="rules"
                                                label="Tên nhà cung cấp"></v-text-field>
                                        </div>

                                        <div style="display: flex;align-items: center;">
                                            <div style="font-size: xx-large; margin-right: 20px;"><i
                                                    class="fas fa-solid fa-location-dot"></i></div>
                                            <v-text-field ref="nameBook" :rules="rules"
                                                label="Địa chỉ nhà cung cấp"></v-text-field>
                                        </div>

                                        <div style="display: flex;align-items: center;">
                                            <div style="font-size: xx-large; margin-right: 20px;"><i
                                                    class="fas fa-solid fa-phone"></i></div>
                                            <v-text-field type="number" ref="nameBook" :rules="rules0"
                                                label="Số liên lạc nhà cung cấp"></v-text-field>
                                        </div>
                                    </v-card-text>
                                    <v-card-actions class="justify-end">
                                        <v-btn variant="text" @click="isActive.value = false">Close</v-btn>
                                        <v-btn variant="text" type="submit" @click="">Save</v-btn>
                                    </v-card-actions>
                                </v-form>
                            </v-card>
                        </template>
                    </v-dialog>
                </div>
            </div>
            <div class="row">
                <v-text-field variant="underlined" class="col-sm-6" auto-grow v-model="book.bookName" :rules="rules"
                    label="Tên sách"></v-text-field>
                <v-text-field variant="underlined" class="col-sm-6" v-model="book.author" :rules="rules"
                    label="Tác giả"></v-text-field>
            </div>
            <div class="row">
                <v-text-field class="col-sm-6" variant="underlined" v-model="book.publisher" :rules="rules"
                    label="Nhà xuất bản"></v-text-field>
                <v-autocomplete class="col-sm-6" label="Năm xuất bản" v-model="book.pulicYear" :items="years"
                    variant="underlined" :rules="rules"></v-autocomplete>
            </div>
            <div class="row">
                <v-text-field type="number" variant="underlined" class="col-sm-6" v-model="book.quantityPage" :rules="rules"
                    label="Số lượng trang"></v-text-field>
                <v-text-field variant="underlined" class="col-sm-6" v-model="book.size" :rules="rules" label="Kích cỡ"
                    placeholder="12x15"></v-text-field>
            </div>
            <div class="row">
                <div class="col-sm-4">
                    <v-text-field auto-grow type="number" variant="underlined" v-model="book.receiptPrice" :rules="rules"
                        label="Giá nhập" style="margin-bottom: -23px;"></v-text-field>
                    <span v-if="book.receiptPrice">{{ parseInt(book.receiptPrice).toLocaleString('vi-VN', {
                        style: 'currency', currency:
                            'VND'
                    })
                    }}</span>
                </div>
                <div class="col-sm-4">
                    <v-text-field type="number" variant="underlined" v-model="book.originalPrice" :rules="rules"
                        label="Giá bán" style="margin-bottom: -23px;"></v-text-field>
                    <span v-if="book.originalPrice">{{ parseInt(book.originalPrice).toLocaleString('vi-VN', {
                        style: 'currency', currency:
                            'VND'
                    })
                    }}</span>
                </div>
                <v-select class="col-sm-4" :items="genres" v-model="selectGeneApi" @update:model-value="changeGeneApi"
                    label='Chọn thể loại' variant="underlined"></v-select>
            </div>
            <div>Thể loại đã chọn: {{ selectGenreList }}</div>
            <div style="display: flex;flex-wrap: wrap;">
                <div v-for="i in subGenre" :key="i" style="width: max-content;">
                    <v-checkbox v-model="genreList" @update:model-value="selectGenre" :label="i" :value="i"></v-checkbox>
                </div>
            </div>
            <div>
                <v-textarea v-model="book.bookDes" clearable label="Mô tả" variant="underlined"></v-textarea>
            </div>
            <div class="row">
                <v-file-input class="col-sm-4" @update:model-value="onFileChange" accept="image/png, image/jpeg, image/bmp"
                    ref="fileInput" placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Thêm ảnh"
                    multiple></v-file-input>
                <div class="col-sm-8" style="display: flex;flex-wrap: wrap;">
                    <div v-for="(image, index) in img" :key="index" style="margin-right: 10px; margin-bottom: 10px;">
                        <img :src="image" style="width: 90px;" />
                    </div>
                </div>
            </div>
            <div class="" style="display: flex;flex-wrap: wrap;">
                <div v-for="(image, index) in imgBook" :key="index" style="margin-right: 10px; margin-bottom: 10px;">
                    <img :src="image.linkImage" style="width: 90px;" />
                    <span style="position: absolute;right: 0px;" type="button" @click="removeImg(image)"
                        class="badge bg-danger">X</span>
                </div>
            </div>
            <div class="text-center" style="margin-top: 10px;">
                <v-btn type="submit" color="primary" size="large" block>
                    Lưu
                </v-btn>
            </div>
        </v-form>
    </div>
</template>

<script>
import axios from "axios";
import { toast } from 'vue3-toastify';
import { useDataStore } from "../stores/dataStores";
import BooksService from "@/services/books.service";
import ImagesService from "@/services/images.service"
// import Loading from "./Loading.vue";
export default {
    components: {

    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            files: [],
            years: [],
            isLoading: true,
            selectGenreList: [],
            img: [],
            imgBook: [],
            book: { type: Object, required: true },
            genreList: [],
            gene_Api: useDataStore().getGenes,
            genres: [],
            supplierList: [],
            imageDataUrl: null,
            dialog: false,
            selectGeneApi: '',
            subGenre: [],
            rules: [
                value => {
                    if (value) return true
                    return 'Bạn chưa nhập giá trị.'
                },
            ],
            rules1: [
                value => {
                    if (value.length != 0) {
                        return true
                    }
                    return 'Bạn chưa nhập giá trị.'
                },
            ],
        }

    },
    methods: {
        async Submit() {
            if (this.selectGenreList === undefined || this.selectGenreList.length === 0) {
                toast.error("Thể loại chưa được chọn!", {
                    transition: toast.TRANSITIONS.SLIDE,
                });
            }
            else {
                this.book.genreName = this.selectGenreList
                this.book.receiptPrice = Number(this.book.receiptPrice)
                this.book.originalPrice = Number(this.book.originalPrice)
                this.book.bookPrice = Number(this.book.originalPrice)
                delete this.book._id
                console.log(this.book)
                var result = await BooksService.update(this.id, this.book)
                if (result) {
                    if (this.$refs.fileInput.files.length > 0) {
                        let config = {
                            'Content-Type': 'multipart/form-data'
                        }
                        var updateImg = null
                        await axios.post('http://127.0.0.1:3000/api/uploads', this.files, config).then(
                            response => {
                                updateImg = response.data
                                console.log(this.img[0]);
                            }
                        )
                        for (var i of updateImg) {
                            i._idBook = this.id
                            var kq = await ImagesService.create(i)
                            console.log(kq);

                        }
                    }
                    this.getImgs()
                    toast.success("Cập nhật thành công!", {
                        transition: toast.TRANSITIONS.SLIDE,
                    });
                    var data = await BooksService.getAll()

                    useDataStore().updateBooks(data)
                }
                else {
                    toast.error("Cập nhật thất bại!", {
                        transition: toast.TRANSITIONS.SLIDE,
                    });
                }
            }
        },
        inittahun() {
            let years = [];
            for (var i = 1900; i <= new Date().getFullYear(); i++) {
                years.push(i);
            }

            this.years = years;
        },
        changeGeneApi() {
            this.genreList = []
            var arr = this.gene_Api;
            arr = arr.filter(item => item.genreName === this.selectGeneApi)
            this.subGenre = arr.flatMap(gene => gene.subGenre.map(sub => sub));
            console.log(this.subGenre)
            // this.gene = arr.map(i => i.name)
        },
        selectGenre() {
            this.selectGenreList = this.genreList
            console.log(this.genreList)
        },
        async onFileChange() {
            this.img = []
            let filesImg = new FormData();
            let fileList = this.$refs.fileInput.files
            for (var i = 0; i < fileList.length; i++) {
                let file = fileList[i];
                var imageUrl = URL.createObjectURL(file);
                this.img.push(imageUrl);
                filesImg.append('uploadsImg', file)
            }
            this.files = filesImg
            console.log(this.img)
        },
        async removeImg(e) {
            let config = {
                'Content-Type': 'multipart/form-data'
            }
            let nameImg = new FormData();
            nameImg.append('name', e._id)
            for (let field of nameImg.entries()) {
                console.log(field[0] + ': ' + field[1]);
            }
            var kq = await ImagesService.delete(e._id)
            this.getImgs()
            console.log(kq)
            await axios.post('http://127.0.0.1:3000/api/removeImg', { name: e.nameImage }).then(
                response => {

                    console.log(response.data);

                }
            )
        },
        async setGenre() {
            this.genres = await this.gene_Api.map(item => item.genreName)
            console.log(this.genres);
        },
        async getImgs() {
            this.imgBook = await ImagesService.getAll()
            useDataStore().updateImgBook(this.imgBook)
            this.imgBook = this.imgBook.filter(img => img._idBook === this.id)
        },
        async getBook() {
            this.book = await BooksService.get(this.id)
            this.selectGenreList = this.book.genreName
        }
    },
    mounted() {
        this.setGenre()
        this.inittahun();
        this.getBook()
        // this.book = this.book[0]
        console.log(this.book.generName);
        this.supplierList = useDataStore().getSupllierList.map(supplier => supplier.name)
        // this.imgBook = useDataStore().getImgBook.filter(img => img._idBook === this.id)
        this.getImgs()



    },
    watch: {

    },

}
</script>

<style>
.bg-basil {
    background-color: #FFFBE6 !important;
}

.text-basil {
    color: #356859 !important;
}
</style>