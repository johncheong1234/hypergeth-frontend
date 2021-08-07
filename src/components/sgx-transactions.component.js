import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

const sgx_transactions = [
    {
        recon_id:1,
        reconcile_status: "success",
        quantity: 100,
        execution_date: "210719",
        isin: "SG2F48989824",
        rt: "B",
        clino:"765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
        settlement_price:0.265,
    },
    {
      recon_id:3,
        reconcile_status: "fail",
        quantity: 80,
        execution_date: "210719",
        isin: "SG2F48989824",
        rt: "B",
        clino:"765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
        settlement_price:0.265,
    },
    {
      recon_id:4,
      reconcile_status: "success",
      quantity: 100,
      execution_date: "210719",
      isin: "SG2F48989824",
      rt: "B",
      clino:"765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
      settlement_price:0.265,
  }
]


export default class SgxTransactions extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      transactions: [],
    };
  }

  componentDidMount() {
    this.retrieveRecords();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveRecords() {
    this.setState({transactions: sgx_transactions});
  }


  searchTitle() {
    TutorialDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, transactions} = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <h1>SGX Transactions</h1>
        <table class="table table text-center table-image">
            <thead>
                <tr>
                <th class="col">Status</th>
                <th class="col">Recon ID</th>
                <th class="col">Quantity</th>
                <th class="col">Execution Date</th>
                <th class="col">ISIN</th>
                <th class="col">RT</th>
                <th class="col">ClINO</th>
                <th class="col">Settlement Price</th>
                </tr>
            </thead>
            <tbody>
                {sgx_transactions && 
                    sgx_transactions.map((transaction) => (
                        <tr class="transaction-row ">
                            <div>
                            {transaction.reconcile_status == 'fail' ? null : <button type="button" class="btn btn-success btn-sm" id="status">{transaction.reconcile_status}</button>}
                            {transaction.reconcile_status == 'success' ? null : <button type="button" class="btn btn-danger btn-sm" id="status">{transaction.reconcile_status}</button>}
                            </div>
                            <td class="col">
                              <Link to={"/transaction/" + transaction.recon_id} className="link">
                              {transaction.recon_id}
                              </Link>
                            </td>
                            <td class="col">{transaction.quantity}</td>
                            <td class="col">{transaction.execution_date}</td>
                            <td class="col">{transaction.isin}</td>
                            <td class="col">{transaction.rt}</td>
                            <td class="col">{transaction.clino.substring(0,8) + "..."}</td>
                            <td class="col">{transaction.settlement_price}</td>
                        </tr> 
                    ))} 
            </tbody>
        </table>
      </div>
    );
  }
}