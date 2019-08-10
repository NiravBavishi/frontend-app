import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

import "./LineChart.scss";

class LineChart extends Component {
  state = {
    userData: [],
    data1: [],
    pageSize: 30
  };

  async componentDidMount() {
    try {
      const response = await axios.post(
        "http://178.128.233.31/backend/users/balance_history",
        {
          username: "ayesha",
          time_period_days: 90
        }
      );
      //   console.log("👉 Returned data:", response);
      const userData = response.data["balance_history"];
      this.setState({ userData: userData });

      //   console.log("My LineChart Data = ", this.state.userData);
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
    }
  }

  // TODO: To generate randome colors
  generateColor = () => {
    return (
      "#" +
      Math.random()
        .toString(16)
        .substr(-6)
    );
  };
  //   TODO: To formate timestamp into date
  dateFormater = dateToFormate => {
    return new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit"
    }).format(dateToFormate.Date);
  };

  render() {
    const data11 = {
      labels: [],
      datasets: []
    };
    const labels = [];

    let label;
    // TODO: for setting labels

    const userData1 = this.state.userData;

    this.state.userData.forEach(d1 => {
      const data = d1["account_history"];

      data.map(d => {
        if (labels.length < this.state.pageSize) {
          labels.indexOf(d.date) === -1
            ? labels.push(this.dateFormater(d["date"]))
            : console.log();
        }
      });
    });

    //TODO: for setting Data

    this.state.userData.map(ud => {
      const ddd = [];
      label = ud["investment_name"];
      const accoutHistory = ud["account_history"];

      accoutHistory.map(ah => {
        if (this.state.pageSize > ddd.length) {
          ddd.push(ah["account_balance"]);
        }
      });

      const colorr = this.generateColor();

      data11.labels = labels;
      data11.datasets.push({
        label: label,
        fill: false,
        lineTension: 0.1,
        backgroundColor: colorr,
        borderColor: colorr,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: colorr,
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: colorr,
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: ddd
      });
    });

    let data = data11;
    return (
      <div className="line-chart-container">
        <div className="line-chart-wrapper">
          <div className="line-chart-controls">
            <div>Line Chart View</div>
            <div>Mountain Chart View</div>
            <div>
              <select
                value={this.state.pageSize}
                onChange={e => this.setState({ pageSize: e.target.value })}
              >
                <option value="30">Last 30 Days</option>
                <option value="60">Last 60 Days</option>
                <option value="90">Last 90 Days</option>
              </select>
            </div>
          </div>
          <div>
            <Line data={data} height={100} />
          </div>
        </div>
      </div>
    );
  }

  getData() {
    return {
      datasets: [
        {
          data: []
        }
      ]
    };
  }
}

export default LineChart;
