<template>
  <section id="contact" class="dark-bg">
    <div class="container-fluid">
      <h2 data-aos="fade-out" data-aos-duration="1000">Get In Touch</h2>
      <h3 data-aos="fade-out" data-aos-duration="1000">
        Let’s connect and explore the possibilities together!
      </h3>
      <div
        class="centered"
        data-aos="fade-down"
        data-aos-duration="1000"
        data-aos-delay="200s"
      >
        <p>Fill out the form</p>
        <form @submit.prevent="sendEmail" class="ct-form">
          <p class="input-group">
            <span class="form-input"
              ><input
                v-model="name"
                name="name"
                type="text"
                size="30"
                maxlength="245"
                required="required"
                placeholder="Name *"
            /></span>
            <span class="form-input"
              ><input
                v-model="email"
                name="email"
                type="email"
                size="30"
                maxlength="100"
                required="required"
                placeholder="Email Address*"
            /></span>
          </p>
          <p>
            <textarea
              v-model="message"
              name="message"
              required="required"
              placeholder="Message *"
            ></textarea>
          </p>
          <button type="submit" class="btn">Send</button>
        </form>
        <p class="note" v-show="showMessage">Thanks for sending me message!</p>
        <div class="eml">
          <h3><span class="line">OR</span></h3>
          <a
            href="mailto:anhthu.ntr@gmail.com"
            style="font-size: 16px"
          >
            <span style="margin-right: 10px" class="fa fa-paper-plane"></span>
            Email me at anhthu.ntr@gmail.com
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
  <script>
export default {
  data() {
    return {
      name: "",
      email: "",
      message: "",
      showMessage: false
    };
  },
  methods: {
    async sendEmail() {
      try {
        const response = await fetch(`${process.env.SERVER_URL}/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            message: this.message,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        this.showMessage = true;
        this.name = "";
        this.email = "";
        this.message = "";
      } catch (error) {
        alert("Failed to send email. Please try again later.");
        console.error(error);
      }
    },
  },
};
</script>
  <style lang="scss">
</style>