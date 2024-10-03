<template>
  <section id="home" class="homepage">
    <div class="title fade-target">
      <h2>&lt;Thu A. <span class="line">Nguyen /&gt;</span></h2>
    </div>
    <div class="container">
      <div class="icn fade-target">
        <font-awesome-icon icon="fa-solid fa-arrow-down" />
        <a href="https://github.com/anhthuntr" target="_blank">
          <i class="fab fa-github"></i>
        </a>
        <a href="https://linkedin.com/in/anhthuntr" target="_blank">
          <i class="fab fa-linkedin"></i>
        </a>
      </div>

      <div class="masthead-content">
        <h1 class="fade-target">Hello,</h1>
        <h2 class="fade-target">
          I am a <span class="line">Software Developer.</span>
        </h2>
        <h2 class="fade-target">Welcome to my portfolio!</h2>
        <div class="res-wrapper">
          <a
            href="https://drive.google.com/file/d/1Trt3PJwJX8E1PmrUt5noxoXuJfjWBmoP/view?usp=sharing"
            target="_blank"
            class="fade-target text"
            >RESUME</a
          >
          <a href="#contact" class="fade-target text">SAY HELLO</a>
        </div>
      </div>
      <div class="scroll">
        <span class="vertical-text"
          ><span>S</span> <span>C</span> <span>R</span> <span>O</span>
          <span> L</span> <span>L</span>
        </span>
        <span class="arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="10"
              width="8.75"
              viewBox="0 0 448 512"
            >
              <path
                fill="#ffffff"
                d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
              />
            </svg>
          </span>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
  name: "Home",
  setup() {
    const observer = ref(null); // Ref for IntersectionObserver

    const observeSections = (entries) => {
      entries.forEach((entry) => {
        const fadeTargets = entry.target.querySelectorAll(".fade-target");
        if (entry.isIntersecting) {
          fadeTargets.forEach((target) => {
            target.classList.add("fade-in"); // Add animation class
          });
        } else {
          fadeTargets.forEach((target) => {
            target.classList.remove("fade-in"); // Remove animation class
          });
        }
      });
    };

    const setupObserver = () => {
      observer.value = new IntersectionObserver(observeSections, {
        root: null,
        threshold: 0.5,
      });

      const section = document.getElementById("home");
      if (section) {
        observer.value.observe(section);
      }
    };

    onMounted(() => {
      setupObserver();
    });

    onBeforeUnmount(() => {
      if (observer.value) {
        observer.value.disconnect();
      }
    });

    return {};
  },
};
</script>

<style lang="scss">
</style>
