import Base from "ember-simple-auth/authenticators/base";
import RSVP from "rsvp";

export default Base.extend({
  restore(data) {
    return data.xst ? RSPV.resolve(data) : RSPV.reject(data);
  },

  authenticate(identifier, password, apiKey, userEnv) {
    return fetch("https://demo-api.ig.com/gateway/deal/session", {
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
    }).then(this._exportTokens.bind(this));
  },

  _exportTokens(response) {
    return RSVP.reject(new Error("error"));
  }
});