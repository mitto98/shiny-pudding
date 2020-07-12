<template>
  <div id="album-page">
    <h1>
      {{$route.params.album}}
    </h1>

    <div v-if="index"
         class="mb-0"
         style="z-index: 1000000; right: 45px; position: absolute; top: 15px;">
      <b-icon-download role="button"
                       font-scale="2"
                       @click="downloadImage"
                       style="fill:white; padding: 5px; "/>
    </div>

    <v-gallery :images="images.map(i => getFullSizeImageLink(i.name))"
               :index="index"
               @close="index = null"/>

    <div id="pig"/>
  </div>
</template>

<script>
  import fileDownload from 'js-file-download';
  import {BIconDownload} from 'bootstrap-vue';

  export default {
    name: 'album',
    components: {BIconDownload},
    async asyncData({$axios, params}) {
      const res = await $axios.get(`${process.env.apiUrl}/album/${params.album}`);
      return {images: res.data.images};
    },
    data: () => ({
      images: [],
      index: null,
    }),
    mounted() {
      const options = {
        urlForSize: (filename, size) => {
          return `${process.env.apiUrl}/album/${this.$route.params.album}/image/${size}/${filename}`
        },
        onClickHandler: (filename) => {
          this.index = this.images.findIndex(i => i.name === filename);
        },
      };

      this.images.forEach(i => i.filename = i.name)

      new Pig(this.images, options).enable();
    },
    methods: {
      getFullSizeImageLink(name) {
        return `${process.env.apiUrl}/album/${this.$route.params.album}/image/slim/${name}`;
      },
      downloadImage() {
        const name = this.images[this.index]?.name;
        this.$axios.get(`${process.env.apiUrl}/album/${this.$route.params.album}/image/${name}`, {
          responseType: 'blob',
        }).then(response => {
          fileDownload(response.data, name);
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  #album-page {
    padding: 16px;
  }

  section {
    padding: 2px;
    display: flex;
    flex-wrap: wrap;

    &::after {
      content: '';
      flex-grow: 999999999;
    }
  }

  figure {
    margin: 2px;
    position: relative;
    height: 200px;
    flex-grow: 1;
    background-color: violet;

    img {
      max-width: 100%;
      min-width: 100%;
      height: 200px;
      object-fit: cover;
      vertical-align: bottom;
    }
  }
</style>
