import React, { Component } from "react";
import "./Table.scss";
import ReactTable from "react-table";
import "react-table/react-table.css";
import ReactSearchBox from "react-search-box";
import axios from "axios";

class TransactionTable extends Component {
  state = {
    transactionHistory: [],
    pageSize: 10,
    search: ""
  };
  // TODO: TO call api after all the components mounts
  async componentDidMount() {
    try {
      const response = await axios.post(
        "http://178.128.233.31/backend/accounts/transaction_history",
        { posted_data: "account_id=2" }
      );
      //   console.log("👉 Returned data:", response);
      const transactionHistory = response.data["transaction_history"];
      this.setState({ transactionHistory });
      //   console.log("My Data = ", this.state.transactionHistory);
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
    }
  }

  // TODO: To formate timestamp to date
  dateFormater = dateToFormate => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(dateToFormate.Date);
  };

  render() {
    const finalData = [];

    const filteredTransactios = this.state.transactionHistory.filter(
      transaction => {
        return transaction.description.indexOf(this.state.search) !== -1;
      }
    );
    // TODO: To create data from API
    // console.log("Filtered data: ", filteredTransactios);
    filteredTransactios.map(transation => {
      finalData.push({
        date: this.dateFormater(transation.time),
        investment: transation.currency,
        description: transation.description,
        amount: transation.amount,
        amountcad: transation.account_balance_cad
      });
    });

    // TODO: Sample Data
    const data = [
      {
        date: "9/12/18",
        investment: "Investment name",
        description: "Description input",
        amount: 32.223,
        amountcad: 450
      },
      {
        date: "9/12/18",
        investment: "Investment name",
        description: "Description input",
        amount: 32.223,
        amountcad: 450
      },
      {
        date: "9/12/18",
        investment: "Investment name",
        description: "Description input",
        amount: 32.223,
        amountcad: 450
      },
      {
        date: "9/12/18",
        investment: "Investment name",
        description: "Description input",
        amount: 32.223,
        amountcad: 450
      },
      {
        date: "9/12/18",
        investment: "Investment name",
        description: "Description input",
        amount: 32.223,
        amountcad: 450
      },
      {
        date: "9/12/18",
        investment: "Investment name",
        description: "Description input",
        amount: 32.223,
        amountcad: 450
      },
      {
        date: "9/12/18",
        investment: "Investment name",
        description: "Description input",
        amount: 32.223,
        amountcad: 450
      },
      {
        date: "9/12/18",
        investment: "Investment name",
        description: "Description input",
        amount: 32.223,
        amountcad: 450
      },
      {
        date: "9/12/18",
        investment: "Investment name",
        description: "Description input",
        amount: 32.223,
        amountcad: 450
      },
      {
        date: "9/12/18",
        investment: "Investment name",
        description: "Description input",
        amount: 32.223,
        amountcad: 450
      }
    ];

    const columns = [
      {
        Header: "Date",
        accessor: "date" // String-based value accessors!
      },
      {
        Header: "Investment",
        accessor: "investment"
      },
      {
        Header: "Description",
        accessor: "description"
      },
      {
        Header: "Amount",
        accessor: "amount"
      },
      {
        id: "amountcad",
        Header: "Amount in CAD",
        accessor: data => {
          return "$" + data.amountcad;
        }
      }
    ];
    return (
      <div className="transactiontable-container">
        <div className="reacttable-container">
          <div className="transaction-container">
            <div className="table-title">Transaction History</div>
            <div className="table-filters">
              <div>
                {" "}
                <span className="m-1">Show</span>
                <select
                  value={this.state.pageSize}
                  onChange={e => this.setState({ pageSize: e.target.value })}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span className="m-1">entries</span>
              </div>
              <div className="search-container">
                <ReactSearchBox
                  placeholder="search"
                  //   value={this.state.search}
                  //   onChange={e => this.handleRowChange(ReactSearchBox, e)}
                />
              </div>
            </div>
          </div>
          <div>
            <ReactTable
              className="-striped"
              data={finalData}
              columns={columns}
              pageSize={this.state.pageSize}
              showPagination={false}
              showPageSizeOptions
            />
          </div>
        </div>
      </div>
    );
  }
}
export default TransactionTable;
