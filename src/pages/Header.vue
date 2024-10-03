<template>
  <header id="navheader" class="fixed-header">
    <div class="container-header" data-aos="fade-left" data-aos-duration="1000">
      <a
        href="#home"
        class="text"
        :class="{ 'active-link': activeSection === 'home' }"
      >
        home
      </a>
      <a
        href="#about"
        class="text"
        :class="{ 'active-link': activeSection === 'about' }"
      >
        about me
      </a>
      <a
        href="#projects"
        class="text"
        :class="{ 'active-link': activeSection === 'projects' }"
      >
        projects
      </a>
      <a
        href="#contact"
        class="text"
        :class="{ 'active-link': activeSection === 'contact' }"
      >
        contact
      </a>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    activeSection: {
      type: String,
      required: true,
    },
  },
};
</script>


<style lang="scss"></style>
