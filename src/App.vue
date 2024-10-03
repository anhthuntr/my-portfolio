<template>
  <div id="app">
    <Header :activeSection="activeSection" />
    <Home />
    <About />
    <Project />
    <Contact />
    <Footer />
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import Header from './pages/Header.vue';
import Home from './pages/Home.vue';
import About from './pages/About.vue';
import Project from './pages/Project.vue';
import Contact from './pages/Contact.vue';
import Footer from './pages/Footer.vue';
export default {
  name: "App",
  components: {
    Header,
    Home,
    About,
    Project,
    Contact,
    Footer
  },
  setup() {
    const activeSection = ref('home'); // Track the active section
    const observer = ref(null); // Ref for IntersectionObserver

    const observeSections = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      });
    };

    const setupObserver = () => {
      // Create the IntersectionObserver
      observer.value = new IntersectionObserver(observeSections, {
        root: null, // Use the viewport as the root
        threshold: 0.7 // Trigger when 50% of the element is visible
      });

      // Observe each section
      const sections = ['home', 'about', 'projects', 'contact'];
      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          observer.value.observe(section);
        }
      });
    };

    onMounted(() => {
      nextTick(() => {
        setupObserver(); // Set up the observer after the DOM has rendered
      });
    });

    onBeforeUnmount(() => {
      // Clean up the observer when the component is destroyed
      if (observer.value) {
        const sections = ['home', 'about', 'projects', 'contact'];
        sections.forEach(sectionId => {
          const section = document.getElementById(sectionId);
          if (section) {
            observer.value.unobserve(section);
          }
        });
        observer.value.disconnect();
      }
    });

    return { activeSection };
  }
};
</script>

<style lang="scss">
 @import "./styles/sass/style.scss";
</style>
