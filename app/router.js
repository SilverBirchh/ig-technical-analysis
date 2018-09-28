import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route("account", function() {
    this.route("charts", function() {
      this.route("chart", { path: "account/charts/:chart_id" });
    });
  });
});

export default Router;
