<script >
import Home from './views/Home.vue';
import BooksService from './services/books.service';
import SuppliersService from './services/suppliers.service';
import GenresService from './services/genres.service';
import { useDataStore } from './stores/dataStores';
import ImagesService from './services/images.service'
import ReceiptsService from './services/receipts.service';
import PromotionsService from './services/promotions.service';
import OrdersService from './services/orders.service'
import UsersService from './services/users.service'
import AdminsService from './services/admins.service';
export default {
  components: {
    Home
  },
  data() {
    return {
      drawer: null,
      flag: false,
      sales: useDataStore().getSales
    }
  },
  methods: {
    async getAll() {
      var data1 = await BooksService.getAll()
      useDataStore().updateBooks(data1)
      var data2 = await SuppliersService.getAll()
      useDataStore().updateSuppliers(data2)
      var data3 = await GenresService.getAll()
      useDataStore().updateGenres(data3)
      var img = await ImagesService.getAll()
      useDataStore().updateImgBook(img)
      var data4 = await ReceiptsService.getAll()
      useDataStore().updateReceipt(data4)
      var data5 = await PromotionsService.getAll()
      useDataStore().updatePromotions(data5)
      var data6 = await OrdersService.getAll()
      useDataStore().updateOrders(data6)
      var data7 = await UsersService.getAll()
      useDataStore().updateClients(data7)
    },
    async logout() {
      try {
        // Xoá thông tin user từ cookies
        await AdminsService.logout();
        // Xoá thông tin user từ store
        useDataStore().setAdmin([]);
        // Xoá thông tin user từ localStorage
        localStorage.removeItem("admin")
        // Chuyển hướng về HomePage
        this.$router.push('/AdminLogin');
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.getAll()
    this.flag = true
  },
  computed: {
    getSales() {
      return this.sales = useDataStore().getSales
    }
  }
}
</script>


<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg bg-body-tertiary" style="background-color:  #6200ee; ">
      <div class="container-fluid " style="flex-wrap: nowrap;">
        <v-btn color="primary" @click.stop="drawer = !drawer">
          <i style="font-size: x-large;" class="fas fa-solid fa-bars"></i>
        </v-btn>
        <div style="width: 100%;">
          <marquee behavior="scroll" direction="left" style="color: aliceblue; font-size: large;">Doanh thu hôm nay là {{
            getSales.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}
          </marquee>
        </div>
      </div>
    </nav>
    <v-card v-if="flag">
      <v-layout>
        <v-navigation-drawer v-model="drawer" temporary style="width: max-content;">
          <v-list-item
            prepend-avatar='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAilBMVEX///8cHBwAAAASEhIaGhpNTU1XV1fKyspJSUn8/Pz39/cYGBg5OTkQEBCoqKjz8/MlJSUgICDf398ICAg6OjozMzNxcXE0NDQrKyvq6upoaGhfX18pKSnPz8/u7u50dHSfn5+9vb18fHybm5vBwcGvr6/X19eSkpKEhIRkZGRbW1tBQUGkpKSKioqhoWFVAAAJp0lEQVR4nO2dDVuyOhiAx7OhjoGAgOBHZpaaWf//751nw0xLg5nKeM/uLhQQvXazsW+IEIvFYrFYLBaLxWKxWCwWi8VisVgsFsu/BFd/ZLBcP3flyj/IysOlA8j63zRcFIS8Q8AcB0a4OXpajpoO0nVZwJCswZHAA3lxZVz+U4pLEL2nUtBhWQ8ovievTYfqanAyAuaIxNkhaPkOm8fN5mPWdPD+zoqT8d7uCJrQALZNh++PcOJB3IeTgruYfGo6jH+DYwbq/CbYfkUSiV/9MOeBtwEh7S0jn36PwPJ6hPGqpYb8gfhVUagI4KPpsF4CJy70aB1BmVS7TQf3EjCF1opBlVLzpkN7CWnNCFS0MUt9qJHJHERiC4v+xemazNlIfGk6wNokTMuQ9poOsC56idRRzap28axrGDw2HWRNOjo5qYS6TQdZD071LsP2XYgj3UTaOkPtjMYRftNh1uNF25Al7Wpf6MehA6umA62F/nXYtlqN988bkrR2y2lv2K5USsaBtmHLesG1a21MtCsv1S8u2lZrw8w01jNs3UBGqFvzhn7TQdajC7o177Y1EN8vKA/fmw60FssLDJdNB1qLOt353w3b1aF4Sc27Xdfh4ALDdtVpPM3OxPa1D0ndQZk9bevFIB96Xd5Yp/lo2SBiV7tHuGUDbJzEeheiiJsOsja/TsE4EYUtq5ZKtjpt4KCFo2tkRutnNglr5eSocFNXMRiHTQf2Qob1EmobB4B31OzKaF3z/ouwniG2KtpV2B+wqZNMWeI1Hc7LqdUQThZNB/MP1EqmMGg6mJfDyWN1gRGM23sVIrPKPjfWspbvDyo7bFrWAXWCj4o5wotWp1HF5td53m9NB+8KcPd8bpNsvfZHISqm58r9IG9xWf8FJ+GZAWGRz4yPQV4DlJifvhTlSEWdX1BnoYFTwftujMVZFeCdHRCGedmxWvELDovdJvo4Rj5QUelXbQg1foNR8O9eL/Dimt0wlYb1fiaI750pvdbtSruSoQN3biZ7Sc35MkmER6/PGK7xs6hmZ464cytyVYaZVgEdWSC4pwcxqIufzTpQ+Svl+bjvjKKy0566nQreD07HiUhUgX6v+pXyBN25218ZijpTYDgZnO3gZ/GgVjnnioYMg7eK8Kmyug/nL1mhOvN5xa+Qt6AhQ9qpPnAw+bUNzGBSow9DTYs307A7gapiM4BJZdBNNRw9F5V+pWPx/HuNxUhDvuxA7XlRFKCz/OViNMxQhvThEaD2QD6L0q2Pko8P5EwTwjBDMlpnoDEVg2VuNvV7DksgW59OreYYysbgE6ZOvRnQbpz20iJ1ZOEBnSf+s/Qwx5B479NamcthFBbbzKd+ti1PSwDT9x8VUFMMOVkmmtEnmfaKPJ2m+54OAcn3sShTDLH2kvmFVvwpq15RFL7vH+z+Pm3BDENOXkCkcaYj6OcyQ4p6214aH02a/mZjhiEJgUlDtouZfWYqHKbWmeqQ+dyvul+ylKmentgp38sjVEqdHaZTQwyHWZ75aMiyNI0dkWPCi5gs7HI/FzJHSX3MMXGnUsCP8ziTqTPFuMSMlMk9cpGyUTbk3pejGYYrJqa+NCwKx49EGsWR48dO5Atc8xmusIgVuMhiwckyVMckHUVRHjl5FrM8iuMIlziXxwpYeV9ZqhmGi2RbMAw0ptQ0wkgo8h7zY+EzP8ujLGK+kKVCqqLZQc20QJkUM5mpIw0dH89PMfXzwsdPRZotyNcMFCMMPWmBSpnwMbgsjzER5gXuwd0Yobh7Wojc8YUvI4mhDHPwOhR4LliMhlGWM+EXEZaMGPeYfIEbFocDB1MaBj+jpaGDV1QmpGGsMiDhR6UhigtHSEOZ0wghjdAwznK5N5ILbhdZdNBuNMJwRZMswQuJQhEFAA6bxlh0A2S4G4pgCoWIAV+hSAqslRcxVrUBE6qI8PBplATRVG5TtWSQxbAi3Au5OYY8DEPPwwXfQ75fUy9hOFMrPJx5uJR7PXWQXPV2B31uh7zc5t5sFppjiCdcwtU7bnreblu+YuDle7mE5Sdf35FvfLeUx5TfNs1QhZcot8+tvStXpnIfJ+U633+F775Smn5+3duJGpRKq+DH6/zUZ2db+UYZhptOZ7gL6scYGb72R7uG/3g4fi3nkXLSHeKG/KGOGjmbj8cL1fr1xp2fI2lGGfaB0l1YPEgCUJTTRzcQBDAh+88CORnqHT9F4wQPVbcjjNT2NwwylEMUwknKx5R4iSM6b64DLIll1Klbg6Ec2F7KXipp2IdgiN+TVW9149NIbX/DIEMMoHAdQVUy9RI1PMqX4CQy6sYBHdNd068TZG/00FDEQuSkBYZzgK5Ly1vrpaFKnk+gomscwAuUt8YMIFmPjwxpJ2VyepTxhj0K8mGzQ5kU94YkFfCsDFcdpUXWAIPJsaG7BBFx4w0xbsbyeaWgCsK94WsiL01puAQ1LMpoTo5TKU0JYzA33vAZZALFiJSZxpfhHIJNaRiCmMpvY5x2vhv28cxw0w1zSj0VapmzfBk+QzBWhg/kTb4ME5T7YUgKBs+h2YYroJ3BaiVzltmh4SKRM52V4RKSBVf5zbdU6ssciYmByYZczrQUsoQvZ41+GWZqJFQZhlgQ4sXYP2Uoc6SPxGBDQiJGy0qMegaENFSVNCwQ5URgZSin7wdq/wnDcmTZYMMHoO5ogLwopc8Svw8xyFpOaSgnDavL9IShmrRhsuFr8tlZjcnyXRqKnrsFzCJTWXqUhnKKkMpqTxnKWRsGG3KafM5KX0OylbXrpEy0C9Xm24C6IX0MgSouO3BY84aMlMcEBte8w8nk82m5g8kEm1Dr4ePj42L9tOsW7L9t5AlYbSZzuTl/2+DV+DCZyKnsi7e1OsZ7HY5/3pdviiEnR43YiokyvM5BO0wxPNL7pvsDfnCceudH28cYY3gzrOEtsIbXxRreAmt4XazhLbCG18Ua3gJreF2s4S2whtfFGt6C/4khi1669+AlYvc3LG9HY3Af1JzTO9+dx+v/L6crIZw738195rbQ2wHr+woSvtV9nPWfiGF75yjkxJtAElTe33odggQmTTxAo7twe/fBXbTswZiWJun2qm7ePnkv9s8RwZJh5b3gp+jdMsm+wEWZy5mHIPOLsqrgpv/MRPvZuSVBr3+KnvZ/+VDctPo2u7CcpycrY7qPi/40vOmzTieXnfZrEkxuKchnl574q0GPb/q6PoP4sszmSgTg3Pwpi9584jbHZH7zZ7iY/mwui8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBbL3/gPNE6w4dPODz4AAAAASUVORK5CYII='
            title="Admin"></v-list-item>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item prepend-icon="fa:fas fa-solid fa-house" class="font">
              <router-link :to="{ name: 'Home' }" class="nav-link">Trang Chủ</router-link>
            </v-list-item>
            <v-list-item prepend-icon="fa:fas fa-solid fa-book" class="font">
              <router-link :to="{ name: 'Products' }" class="nav-link">Quản lý Sản Phẩm</router-link>
            </v-list-item>
            <v-list-item prepend-icon="fa:fas fa-solid fa-file-invoice-dollar" class="font">
              <router-link :to="{ name: 'Orders' }" class="nav-link">Quản lý Đơn Hàng</router-link>
            </v-list-item>
            <v-list-item prepend-icon="fa:fas fa-solid fa-users" class="font">
              <router-link :to="{ name: 'Clients' }" class="nav-link">Quản lý Khách Hàng</router-link>
            </v-list-item>
            <v-list-item prepend-icon="mdi-view-dashboard" class="font">
              <router-link :to="{ name: 'Catalog' }" class="nav-link">Quản lý Danh Mục</router-link>
            </v-list-item>
            <v-list-item prepend-icon="fa:fas fa-solid fa-receipt" class="font">
              <router-link :to="{ name: 'Receipts' }" class="nav-link">Quản lý Nhập Hàng</router-link>
            </v-list-item>
            <v-list-item prepend-icon="fa:fas fa-solid fa-bolt" class="font">
              <router-link :to="{ name: 'Promotion' }" class="nav-link">Chương trình Khuyến Mãi</router-link>
            </v-list-item>
            <v-list-item prepend-icon="fa:fas fa-solid fa-chart-column" class="font">
              <router-link :to="{ name: 'Statistical_Sales' }" class="nav-link">Thống kê Doanh Thu</router-link>
            </v-list-item>
            <v-list-item prepend-icon="fa:fas fa-solid fa-right-from-bracket" class="font" @click="logout">
              <router-link :to="{ name: 'LoginAdmin' }" class="nav-link">Đăng xuất</router-link>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main>
          <div class="container-sm" style="margin-top: 20px; background-color: #FFFBE6 ;">
            <router-view />
            <!-- <Home /> -->
          </div>
        </v-main>
      </v-layout>
    </v-card>


  </div>
</template>

<style >
::-webkit-scrollbar {
  display: none;
}

.font {
  font-size: medium;
}

/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
} */

/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
