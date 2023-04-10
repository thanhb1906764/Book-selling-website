<template>
    <!-- Người đánh giá  -->
    <div class="align-middle px-3">
        <strong>{{ username }}</strong>
    </div>

    <!-- Đánh giá sao  -->
    <div class="align-middle px-3" style="display: flex; align-items: flex-start;">
        <star-rating :show-rating="false" :read-only="true" :increment="0.5" :rating="comment.rateStar" :star-size="24" />
        <span class="m-1 text-muted fs-6">{{ timeComment.fromNow() }} - {{ timeComment.format("LL") }}</span>
    </div>

    <!-- Bình luận  -->
    <div class="align-middle px-3">
        <p>{{ comment.content }}</p>
    </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import moment from 'moment';
import 'moment/dist/locale/vi';
import UsersService from '@/services/users.service';
export default {
    components: {
        StarRating
    },
    props: {
        comment: { type: Object, required: true },
    },
    data() {
        moment.locale("vi");
        const timeComment = moment(this.comment.commentDate)
        return {
            timeComment,
            username: '',
        }
    },
    methods: {
        // Phương thức không an toàn 
        async getUser(id) {
            let doc = await UsersService.get(id);
            console.log(doc);
            this.username = doc.name
        }
    },
    created() {
        this.getUser(this.comment._idUser);
    },
    mounted() {
    }
}
</script>