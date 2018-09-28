import Service from "@ember/service";
import { inject as service } from "@ember/service";

export default Service.extend({
  lsClient: null,

  session: service(),

  connectToLs() {
    const { session } = this;

    const lsClient = new Lightstreamer.LightstreamerClient(
      session.data.authenticated.lightstreamerEndpoint
    );
    lsClient.connectionDetails.setUser(
      session.data.authenticated.currentAccountId
    );
    let password = `CST-${session.data.authenticated.cst}|XST-${
      session.data.authenticated.xst
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
