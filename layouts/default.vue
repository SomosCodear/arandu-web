<template>
  <div class="container">
    <header>
      <nav>
        <div class="logo">
          <img src="/images/logo.svg" alt="arandu logo">
        </div>
        <div class="breadcrumb">
          <img src="/images/cfp.svg" alt="">
          Convocatorias
        </div>
        <div class="right-nav">
          <img src="/images/community.svg" alt="">
          Comunidad
        </div>
      </nav>
      <div class="separator" />
    </header>
    <Nuxt />
  </div>
</template>

<script>
/* eslint-disable vue-scoped-css/require-scoped */
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

nav {
  display: flex;
  flex-direction: row;
  background-color: var(--header-nav-background);
  align-items: center;
  color: var(--header-text);

  img {
    display: block;
  }

  .logo {
    padding: 0.75rem;
    background-color: var(--header-logo-background);
  }

  .breadcrumb,
  .right-nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 0.75rem;
    }
  }

  .breadcrumb {
    flex: 1;
    padding: 0.75rem;
  }

  .right-nav {
    padding: 0.75rem;
    padding-right: 5rem;
  }
}

.separator {
  min-height: 2rem;
  background-color: var(--header-separator-background);
}
</style>
