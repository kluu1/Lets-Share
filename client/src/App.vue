<template>
  <v-app>
    <!-- horizontal navbar -->
    <v-toolbar
      fixed
      color="primary"
      dark
    >
      <!-- app title -->
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link
          to="/"
          tag="span"
          style="cursor: pointer"
        >
          Lets Share
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- search input -->
      <v-text-field
        flex
        prepend-icon="search"
        placeholder="search posts"
        color="accent"
        single-line
        hide-details
      ></v-text-field>

      <v-spacer></v-spacer>

      <!-- horizontal navbar links -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in horizontalNavItems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon
            class="hidden-sm-only"
            left
          >{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>

    <!-- app content -->
    <main>
      <v-conatiner class="mt-4">
        <router-view />
      </v-conatiner>
    </main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {
    horizontalNavItems() {
      return [
        { icon: "chat", title: "Posts", link: "/posts" },
        { icon: "lock_open", title: "Sign In", link: "/signin" },
        { icon: "create", title: "Sign Up", link: "/signup" }
      ];
    }
  }
};
</script>