import React, { Component } from "react";
import TransactionDataService from "../services/transaction.service_3000";
import { Link } from "react-router-dom";
import CsvDownload from 'react-json-to-csv'

export default class PrimoTransactions extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.retrieveTransactions = this.retrieveTransactions.bind(this);

    this.state = {
      transactions: [],
    };
  }

  componentDidMount() {
    this.retrieveTransactions();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTransactions() {
    //this.setState({transactions: primo_transactions});
    TransactionDataService.getAllPrimoFailed()
      .then(response => {
        this.setState({
          transactions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  
  }


  searchTitle() {
    TransactionDataService.findByTitle(this.state.searchTitle)
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
    const { searchTitle, transactions } = this.state;

    return (
      <div className="list row">
        
        <h1>PRIMO Transactions</h1>
        <table class="table table text-center table-image">
            <thead>
                <tr>
                <th class="col">ID</th>
                <th class="col">Status</th>
                <th class="col">Recon ID</th>
                <th class="col">Quantity</th>
                <th class="col">Execution Date</th>
                <th class="col">REUT</th>
                <th class="col">Buy / Sell</th>
                <th class="col">Account</th>
                <th class="col">Counter Party</th>
                <th class="col">Settlement Date</th>
                <th class="col">Alpha status</th>
                <th class="col">Trade_ID</th>
                <th class="col">Settlement Price</th>
                <th class="col">Principal</th>
                <th class="col">Price Currency</th>
                </tr>
            </thead>
            <tbody>
                {transactions && 
                    transactions.map((transaction) => (
                        <tr class="transaction-row ">
                          <td class="col">{transaction.Record.ID}</td>
                            <div>
                            {transaction.Record.Status == 'pending' ? <button type="button" class="btn btn-warning btn-sm" id="status">{transaction.Record.Status}</button> : null}
                            {transaction.Record.Status == 'fail' ?  <button type="button" class="btn btn-danger btn-sm" id="status">{transaction.Record.Status}</button> : null}
                            {transaction.Record.Status == 'success' ? <button type="button" class="btn btn-success btn-sm" id="status">{transaction.Record.Status}</button> : null}
                            </div>
                            <td class="col">
                              <Link to={"/transaction/" + transaction.Record.Block_ID} className="link">
                              {transaction.Record.Block_ID}
                              </Link>
                            </td>
                            <td class="col">{transaction.Record.Quantity}</td>
                            <td class="col">{transaction.Record.Execution_Date}</td>
                            <td class="col">{transaction.Record.ISIN}</td>
                            <td class="col">{transaction.Record.RT}</td>
                            <td class="col">{transaction.Record.CLINO.substring(0,8) + "..."}</td>
                            <td class="col">{transaction.Record.COUNTERPARTY}</td>
                            <td class="col">{transaction.Record.SETTLEMENT_DATE}</td>
                            <td class="col">{transaction.Record.Alpha_status}</td>
                            <td class="col">{transaction.Record.TRADE_ID}</td>
                            <td class="col">{transaction.Record.Settlement_price}</td>
                            <td class="col">{transaction.Record.PRINCIPAL}</td>
                            <td class="col">{transaction.Record.PRICING_CURRENCY}</td>
                        </tr> 
                    ))} 
            </tbody>
        </table>

        <CsvDownload data={transactions} filename = 'failed_primo.csv' />

      </div>
    );
  }
}