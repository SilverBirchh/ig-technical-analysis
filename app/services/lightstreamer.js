import Service from "@ember/service";
import { inject as service } from "@ember/service";

export default Service.extend({
  lsClient: null,

  session: service(),

  connectToLs() {
    const { session } = this;

    const lsClient = new Lightstreamer.LightstreamerClient(
      session.session.content.authenticated.lsEndPoint
    );
    lsClient.connectionDetails.setUser(
      session.session.content.authenticated.currentAccountId
    );
    let password = `CST-${session.session.content.authenticated.cstToken}|XST-${
      session.session.content.authenticated.ssoToken
    }`;
    lsClient.connectionDetails.setPassword(password);

    lsClient.addListener({
      onListenStart: this.get("onListenStart").bind(this),
      onStatusChange: this.get("onStatusChange").bind(this),
      onListenEnd: this.get("restart").bind(this),
      onServerError: this.get("serverError").bind(this)
    });

    lsClient.connect();
    this.set("lsClient", lsClient);
  },

  restart() {
    console.log("Restarting..");
    this.get("lsClient").disconnect();
    this.connectToLs();
  },

  onListenStart() {
    return console.log("ListenStart");
  },

  serverError(errorCode, errorMessage) {
    console.log("Lightstreamer connection status:" + errorMessage);
    this.restart();
  },

  onStatusChange(status) {
    console.log("Lightstreamer connection status:" + status);
  },

  getLsClient() {
    return this.get("lsClient");
  }
});
