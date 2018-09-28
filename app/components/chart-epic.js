import Component from "@ember/component";
import { set } from "@ember/object";

export default Component.extend({
  chartData: null,

  chartOptions: null,

  init() {
    this._super(...arguments);
    const cat = this.prices.prices.map(price => price.snapshotTime);
    set(this, "chartOptions", {
      chart: {
        type: "line"
      },
      title: {
        text: "Market Chart"
      },
      subtitle: {
        text: "Source: IG.com"
      },
      xAxis: {
        categories: cat
      },
      yAxis: {
        title: {
          text: "Volume"
        }
      },
      tooltip: {},
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
        borderWidth: 0
      }
    });

    const data = this.prices.prices.map(price => price.lastTradedVolume);
    set(this, "chartData", [
      {
        name: "FTSE",
        data: data
      }
    ]);
  }
});
