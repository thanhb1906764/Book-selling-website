<template>
    <!-- Người đánh giá  -->
    <div class="align-middle px-3">
        <strong>Thanh</strong>
    </div>

    <!-- Đánh giá sao  -->
    <div v-if="show" class="align-middle px-3" style="display: flex; align-items: flex-start;">
        <star-rating :show-rating="false" :read-only="true" :increment="0.5" :rating="comment.rateStar" :star-size="24" />
        <span class="m-1 text-muted fs-6">{{ timeComment }} - {{ formatDate().format("LL") }}</span>
    </div>

    <!-- Bình luận  -->
    <div class="align-middle px-3">
        <p>{{ comment.content }}
        </p>
    </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import moment from 'moment';
import 'moment/dist/locale/vi';

export default {
    components: {
        StarRating
    },
    props: {
        // id: { type: String, required: true },
        comment: Object
    },
    data() {
        moment.locale("vi");
        return {
            timeComment: null,
            // dateComment: null,
            show: false
        }
    },
    methods: {
        formatDate() {

            // this.comment.commentDate = moment()
            this.timeComment = moment(this.comment.commentDate).fromNow()
            return this.comment.commentDate
        }
    },
    mounted() {
        this.formatDate()
        console.log(this.comment)
        this.show = true
    }
}
</script>