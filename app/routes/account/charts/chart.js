import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default Route.extend({
  fetchit: service(),

  model({ chart_id }) {
    return this.fetchit.f(`/prices/${chart_id}`, "GET", null, { VERSION: 3 });
  }
});
