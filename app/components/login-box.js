import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { getProperties, set, get } from "@ember/object";

export default Component.extend({
  session: service(),

  error: false,

  classNames: ["login"],

  username: null,

  password: null,

  apiKey: null,

  userEnv: "Demo",

  envs: ["Test", "UAT", "Demo", "Live"],

  actions: {
    login() {
      set(this, "error", false);
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
        .then(() => get(this, "transition")())
        .catch(err => set(this, "error", true));
    }
  }
});
