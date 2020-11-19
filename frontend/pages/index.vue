<template>
  <div class="container my-2">
    <h1 class="my-4">{{$config.title}}</h1>

    <b-row>
      <b-col v-if="$config.igUsername" md="6">
        <ig-card/>
      </b-col>

      <b-col v-for="album in albums" :key="album.name" md="3">
        <n-link :to="`/album/${album.name}`" class="album-link">
          <article class="album-card mb-2">
            <div class="square">
              <img :src="getCardCover(album)" :alt="album.name" class="card-img-top">
            </div>
            <div class="card-body">
              <p class="card-text">{{album.name}}</p>
            </div>
          </article>
        </n-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    async asyncData({$axios}) {
      try {
        const res = await $axios.get('album');
        return {albums: res.data};
      } catch (e) {
        console.error("Unable to fetch albums", e.response);
      }
    },
    data: () => ({
      albums: [],
    }),
    methods: {
      getCardCover(album) {
        return `${this.$config.apiUrl}/album/${album.name}/image/250/${album.cover}`
      }
    }
  };
</script>

<style lang="scss">
  .album-link:hover {
    text-decoration: none;
  }

  .album-card {
    border: 0;
    border-radius: 0;

    .square {
      position: relative;
      width: 100%;
      overflow: hidden;
      border-radius: calc(1rem);

      &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
      }

      .card-img-top {
        position: absolute;
        width: 100%;
        /*height: 100%;*/
      }
    }

    .card-body {
      padding: 8px 0 0 0;
      color: black;
      font-weight: bold;
    }
  }
</style>
