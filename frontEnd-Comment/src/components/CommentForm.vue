<template>
    <Form class="container form my-4 py-2 shadow-sm" @submit="submitComment" :validation-schema="commentSchema">

        <!-- Đánh giá  -->
        <div class="form-group fs-6 mb-2 d-flex justify-content-end">
            <star-rating :show-rating="false" :increment="0.5" v-model:rating="value" :star-size="24" />
        </div>

        <!-- Nội dung bình luận  -->
        <div class="form-group form-floating mb-2">
            <Field class="form-control" v-slot="{ field }" v-model="commentSchema.content" name="content" rules="required">
                <textarea v-bind="field" class="form-control" placeholder="Leave a comment here"
                    style="min-height: 60px;"></textarea>
            </Field>
            <label for="content">Nội dung bình luận</label>
        </div>


        <!-- Nút thêm bình luận  -->
        <div class="form-group fs-6 mb-2 d-flex justify-content-end">
            <div class="px-2" @click="clear"><a class="btn btn-outline-primary">Huỷ</a></div>
            <button type="submit" class="btn btn-primary text-white">Bình luận</button>
        </div>
    </Form>
</template>

<script>

import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import StarRating from 'vue-star-rating'
import CommentsService from '@/services/comments.service';
export default {

    components: {
        Form, Field, ErrorMessage,
        StarRating,
    },
    props: {
        idBook: { type: String, required: true }
    },
    data() {
        const commentSchema = yup.object().shape({
            content: yup
                .string(),
            rateStar: yup
                .number()
                .min(1)
                .max(5),
        })
        return {
            commentSchema,
            value: 0
        }
    },

    methods: {
        async submitComment() {
            // this.value = 5
            this.commentSchema.rateStar = this.value
            var comment = {}
            comment.content = this.commentSchema.content
            comment.rateStar = this.value
            comment._idBook = this.idBook
            comment.commentDate = new Date()
            comment._idUser = '123'
            console.log(comment)
            var kq = await CommentsService.create(comment)
            console.log(kq)
            this.$emit('submitComment', 'new')
        },
        clear() {
            this.commentSchema.content = null
            this.value = 0
        }
    }
}

</script>

<style scoped></style>