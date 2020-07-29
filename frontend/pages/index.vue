<template>
  <div class="container my-2">
    <h1 class="my-4">{{galleryTitle}}</h1>

    <b-row>
      <b-col v-if="insta" md="6">
        <a :href="`https://www.instagram.com${igUsername}`" class="album-link">
          <b-card no-body>
            <b-row no-gutters>
              <b-col md="6">
                <b-card-img :src="insta.user.profile_pic_url_hd" alt="IG profile pic" class="rounded-circle p-3"/>
              </b-col>
              <b-col md="6">
                <b-card-body :title="insta.user.full_name" class="pt-5">
                  <b-card-text>
                    <pre>{{insta.user.biography}}</pre>
                  </b-card-text>

                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </a>
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
      const res = await $axios.get(`${process.env.apiUrl}/album`);
      let insta = null;
      if (process.env.IG_USERNAME)
        insta = await $axios.get(`https://www.instagram.com/${process.env.IG_USERNAME}/?__a=1`);
      return {albums: res.data, insta: insta?.data?.graphql};
    },
    data: () => ({
      albums: [],
      insta: null,
    }),
    computed: {
      galleryTitle: () => process.env.title,
      igUsername: () => process.env.IG_USERNAME,
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
