import Component from "@ember/component";

export default Component.extend({
  classNames: ["login"],

  username: null,

  password: null,

  apiKey: null,

  userEnv: "Demo",

  envs: ["Test", "UAT", "Demo", "Live"],

  actions: {
    login() {
      console.log("LOGIN");
    }
  }
});
