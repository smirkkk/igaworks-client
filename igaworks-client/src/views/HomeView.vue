<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>유저아이디</p>
    <b>{{userId}}</b>
    <button @click="generateUserId">갱신</button>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      userId: undefined
    }
  },
  methods: {
    generateUserId() {
      this.userId = window.guid()
      window.sessionStorage.setItem('user_id', this.userId);
    }
  },
  mounted() {
    this.userId = window.sessionStorage.getItem('user_id');
  }
}
</script>
