<template>
    <h3 class="text-center font-weight-bold" style="padding: 30px; color: #356859;">CHỈNH SỬA KHUYẾN MÃI</h3>
    <hr />
    <PromotionFormVue :info="id" :flag="1" />
</template>

<script>
import PromotionFormVue from '../components/PromotionForm.vue';
import { useDataStore } from '../stores/dataStores';
export default {
    components: {
        PromotionFormVue
    },
    data() {
        return {
            promotion: Object
        }
    },
    props: {
        id: { type: String, require: true }
    },
    methods: {
        async getPromotion() {
            this.promotion = await useDataStore().getPromotionList.filter(item => item._id === this.id)
            this.promotion = this.promotion[0]

            return this.promotion


        }
    },
    mounted() {
        this.getPromotion()
        // console.log(this.getPromotion())
    }
}
</script>