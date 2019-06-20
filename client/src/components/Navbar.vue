<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
    <b-navbar-brand>16:9</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/about">About</b-nav-item>
        <b-nav-item to="/login" v-if="!$store.getters.isLoggedIn">Login</b-nav-item>
        <b-nav-item-dropdown v-else right :text="$store.getters.userLogin">
          <b-dropdown-item class="logout-item" to="/logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<style lang="scss">
.logout-item .dropdown-item:active {
  color: white;
  background-color: #4e4e4e;
}
.navbar-dark .navbar-nav a.nav-link {
  &.router-link-exact-active {
    color: white;
  }
  &:focus,
  &:hover {
    color: white;
  }
}
</style>
