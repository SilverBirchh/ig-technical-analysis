import Component from "@ember/component";
import { task, timeout } from "ember-concurrency";
import { set } from "@ember/object";
import { inject as service } from "@ember/service";

const DEBOUNCE_MS = 250;

export default Component.extend({
  fetchit: service(),

  results: null,

  market: "",

  searchMarkets: task(function*() {
    if (this.market == false || this.market.lengh < 4) {
      set(this, "results", []);
    }
    yield timeout(DEBOUNCE_MS);

    const results = yield this.fetchit.f(`/markets?searchTerm=${this.market}`);

    set(this, "results", results);

    console.log(results);
  }).restartable()
});
