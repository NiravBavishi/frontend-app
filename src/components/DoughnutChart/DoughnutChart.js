import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

import "./DoughnutChart.scss";

class DoughnutChart extends Component {
  state = {
    colors: [],
    userData: [],
    chartData: {}
  };

  generateColor = () => {
    return (
      "#" +
      Math.random()
        .toString(16)
        .substr(-6)
    );
  };

  // TODO: TO call api after all the components mounts
  async componentDidMount() {
    try {
      const response = await axios.post(
        "http://178.128.233.31/backend/users/balance",
        {
          key: "username",
          value: "ayesha"
        }
      );
      console.log("👉 Returned data:", response);
      const userData = response.data["user_balance"];
      this.setState({ userData: userData });

      const chartData = { labels: ["name", "User"] };
      this.setState({ chartData: chartData });
      console.log("Chart Data", this.state.chartData);

      // console.log("My doughnut Data = ", this.state.userData);
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
    }
  }

  render() {
    let finalData = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: []
        }
      ]
    };
    const userData = this.state.userData;

    console.log("User Data. . .", userData);
    // TODO: To create from API
    userData.map(ud => {
      finalData.labels.push(ud.currency);
      finalData.datasets[0].data.push(ud.balance_cad);
      const bgcolor = this.generateColor();
      finalData.datasets[0].backgroundColor.push(bgcolor);
    });

    let data = finalData;
    return (
      <div className="doughnut-container">
        <div className="doughnut-wrapper">
          <Doughnut
            data={finalData}
            width={300}
            height={300}
            options={this.getOptions()}
            legend={this.getLegend()}
          />
        </div>
      </div>
    );
  }

  getData() {
    return {
      datasets: [
        {
          data: [10, 20, 30],
          backgroundColor: Object.values(this.getLabelsAndColors())
        }
      ],
      labels: Object.keys(this.getLabelsAndColors())
    };
  }

  getOptions() {
    return {
      responsive: true,
      maintainAspectRatio: true
    };
  }

  getLegend() {
    return {
      position: "bottom"
    };
  }

  getLabelsAndColors() {
    return {
      Red: "#FF6384",
      Blue: "#36A2EB",
      Yellow: "#FFCE56"
    };
  }
}

export default DoughnutChart;
