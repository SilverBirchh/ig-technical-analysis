import Route from "@ember/routing/route";
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import { inject as service } from "@ember/service";
import { set, get } from "@ember/object";

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  model() {
    return get(this, "session.data");
  }
});
