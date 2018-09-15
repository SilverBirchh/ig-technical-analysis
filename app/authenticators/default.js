import Base from "ember-simple-auth/authenticators/base";
import { inject as service } from "@ember/service";
import RSVP from "rsvp";
import { set, get } from "@ember/object";

export default Base.extend({
  session: service(),

  restore(data) {
    console.log(data);
    return data.xst ? RSVP.resolve(data) : RSVP.reject(data);
  },

  async authenticate(identifier, password, apiKey, userEnv) {
    const domain = this.envToDomain(userEnv);
    const url = domain ? `https://${domain}-api.ig.com` : `https://api.ig.com`;

    try {
      const response = await fetch(`${url}/gateway/deal/session`, {
        method: "post",
        headers: {
          Accept: "application/json; charset=UTF-8",
          "Content-Type": "application/json; charset=UTF-8",
          VERSION: 2,
          "X-IG-API-KEY": apiKey
        },
        body: JSON.stringify({
          identifier,
          password
        })
      });

      return this._exportTokens(response);
    } catch (err) {
      return RSVP.reject(new Error(err));
    }
  },

  async _exportTokens(response) {
    if (response.status < 200 || response.status > 400) {
      return RSVP.reject(new Error(response));
    }

    const json = await response.json();
    json.cst = response.headers.get("CST");
    json.xst = response.headers.get("X-SECURITY-TOKEN");

    get(this, "session").set("data", json);
    get(this, "session").set("isAuthenticated", true);
    return RSVP.resolve(json);
  },

  envToDomain(env) {
    switch (env) {
      case "Test":
        return "net";
      case "UAT":
        return "web";
      case "Demo":
        return "demo";
      default:
        "";
    }
  }
});
