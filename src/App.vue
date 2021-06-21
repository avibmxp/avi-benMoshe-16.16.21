<template>
  <div>
    <div id="header" v-bind:class="{ 'header-dark-theme': isNightTheme }">
      <div class="app-name">Find Your Weather</div>
      <div class="nav">
        <router-link to="/">Home</router-link>|
        <router-link to="/favorites">Favorites</router-link>|
        <div class="theme-mode" @click="changeTheme" v-text="themeToggleText"></div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  props: {},
  data() {
    return {
      isNightTheme: false,
      themeToggleText: "Dark Mode"
    };
  },
  computed: {
    themeType: {
      get() {
        return this.$store.state.isNightTheme;
      },
      set(newVal) {
        this.$store.commit("setThemeType", newVal);
      }
    }
  },
  methods: {
    changeTheme() {
      this.isNightTheme = !this.isNightTheme;
      if (this.isNightTheme) {
        this.themeToggleText = "Light Mode";
      } else {
        this.themeToggleText = "Dark Mode";
      }
      this.$store.commit("setThemeType", this.isNightTheme);
    }
  }
};
</script>

<style>
body {
  background: url(../src/assets/new_york.jpg);
  background-size: 100%;
  margin: 0;
}

#header {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  background: #ffffff;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  align-items: baseline;
  justify-content: space-around;
}

.nav {
  padding: 15px;
  text-align: center;
}

.nav a {
  font-weight: bold;
  color: #2c3e50;
  margin-right: 5px;
  margin-left: 5px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.app-name {
  color: orangered;
  font-weight: bold;
  font-size: 1.4rem;
}

.theme-mode {
  margin-left: 10px;
  cursor: pointer;
}

.header-dark-theme {
  background: rgba(0, 0, 0, 0.7) !important;
}

.header-dark-theme .nav a {
  color: #ffffff !important;
}
</style>
