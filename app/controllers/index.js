import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    transition() {
      this.transitionToRoute("account");
    }
  }
});
