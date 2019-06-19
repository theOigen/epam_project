<template>
  <div class="mb-5">
    <b-navbar toggleable="lg" type="dark" variant="info" height="200" fixed="top">
      <b-navbar-brand>16:9</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
          <b-nav-item-dropdown right text="User">
            <b-dropdown-item>Profile</b-dropdown-item>
            <b-dropdown-item>Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<style scoped lang="scss">
a.nav-link {
  text-decoration: none;
  color: white;
  &.router-link-exact-active {
    color: white;
  }
  :focus {
    color: white;
  }
}
</style>
