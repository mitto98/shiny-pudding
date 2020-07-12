<template>
  <div class="container my-2">
    <h1 class="my-4">{{galleryTitle}}</h1>

    <b-row>
      <b-col v-for="album in albums" md="3">
        <n-link :to="`/album/${album.name}`" class="album-link">
          <article class="card mb-2">
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
      const res = await $axios.get(`${process.env.apiUrl}/album`);
      return {albums: res.data};
    },
    data: () => ({
      albums: [],
    }),
    computed: {
      galleryTitle: () => process.env.title,
    },
    methods: {
      getCardCover(album) {
        return `${process.env.apiUrl}/album/${album.name}/image/250/${album.cover}`
      }
    }
  };
</script>

<style lang="scss">
  .album-link:hover {
    text-decoration: none;
  }

  .card {
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
