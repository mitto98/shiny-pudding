<template>
  <div>
    <a v-if="!isLoading" :href="`https://www.instagram.com/${$config.igUsername}`" class="album-link">
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

  </div>
</template>

<script>
  export default {
    name: "IgCard",
    data: () => ({
      insta: null,
      isLoading: true,
    }),
    mounted() {
      this.$axios
        .get(`https://www.instagram.com/${this.$config.igUsername}/?__a=1`)
        .then(({data}) => {
          this.insta = data.graphql;
          // console.log(`https://www.instagram.com/${this.$config.igUsername}/?__a=1`, data)
          this.isLoading = false;
        });
    }
  }
</script>

<style scoped>

</style>
