import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { getProperties } from "@ember/object";

export default Component.extend({
  session: service(),

  classNames: ["login"],

  username: null,

  password: null,

  apiKey: null,

  userEnv: "Demo",

  envs: ["Test", "UAT", "Demo", "Live"],

  actions: {
    login() {
      const { username, password, apiKey, userEnv } = getProperties(
        this,
        "username",
        "password",
        "apiKey",
        "userEnv"
      );

      this.session
        .authenticate(
          "authenticator:default",
          username,
          password,
          apiKey,
          userEnv
        )
        .catch(err => console.log("ERR =>", err));
    }
  }
});
