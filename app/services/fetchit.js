import Service from "@ember/service";
import { inject as service } from "@ember/service";
import { get, computed } from "@ember/object";
import { reads } from "@ember/object/computed";

export default Service.extend({
  session: service(),

  domain: reads("session.data.authenticated.domain"),

  cst: reads("session.data.authenticated.cst"),

  xst: reads("session.data.authenticated.xst"),

  api: reads("session.data.authenticated.api"),

  getHeaders(headers) {
    return Object.assign(headers, {
      "Content-Type": "application/json; charset=UTF-8",
      Accept: "application/json; charset=UTF-8",
      CST: this.cst,
      "X-SECURITY-TOKEN": this.xst,
      "X-IG-API-KEY": this.api
    });
  },

  async f(url, method = "GET", body = null, headers = {}) {
    const fullHeaders = this.getHeaders(headers);

    try {
      const response = await fetch(`${this.domain}${url}`, {
        method,
        body,
        headers
      });

      return response.json();
    } catch (err) {
      this.session.invalidate();
      location.reload();
    }
  }
});
