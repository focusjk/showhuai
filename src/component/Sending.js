import React from "react";
import { Button, Card, Image, Icon, Search, Modal, Dropdown, Table } from "semantic-ui-react";
import CartItem from "./CartItem";
import Invoice from "./Invoice";
import { send } from "q";
import axios from 'axios';
import { url } from '../constant'

class Sending extends React.Component {
  state = {
    selectedInvoice: null,
    selectedMessenger: null,
    selectedCar: null,
    invoices: [],
    messengers: [],
    cars: [],
    sendingRounds: [],
    isLoading: false,
    isInserting: false,
  };

  selectHandler = (e, { name, value, text }) => {
    this.setState({ [name]: value })
  }

  createInvoiceHandler = () => {
    //TODO Jane : api for inserting to database
    const { selectedInvoice: invoice, selectedMessenger: messenger, selectedCar: car } = this.state
    console.log("need send api to backend function")
    console.log(invoice, messenger, car)
    this.loadSendingRound()
  }

  loadSendingRound = async () => {
    //TODO Jane : api calling to database
    if (this.state.selectedInvoice && this.state.selectedMessenger && this.state.selectedCar) {
      // const sendingRoungResult = await axios.get(url + '/sending')
      // console.log(sendingRoungResult.data)
      // const sendingRoundList = sendingRoundResult.data
      // this.setstate({sendingRounds: sendingRoundList})
      console.log('Sending round is loaded')
    }
  }

  async componentDidMount() {

    this.loadSendingRound()

    //TODO Jane: api call to database

    // const invoiceResult = await axios.get(url + '/invoice')
    // const invoices = invoiceResult.data

    // const messengerResult = await axios.get(url + '/messenger')
    // const messengers = messengerResult.data

    // const carResult = await axios.get(url + '/car')
    // const cars = carResult.data

    // this.setState({
    //   invoices: invoices,
    //   messengers: messengers,
    //   cars: cars
    // })

    this.setState({
      invoices: [
        { ID: 1, recordTime: "2019-11-08 09:30:23", Total_price: 200.564 },
        { ID: 2, recordTime: "2019-11-08 09:30:23", Total_price: 200.5 }
      ],
      messengers: [
        {
          SSN: "1234512345123",
          firstname: "Focus",
          lastname: "Focus",
          phone_number: "0082345635"
        }
      ],
      cars: ["AB1234"],
      sendingRounds: [
        { ID: 1, Depart_time: "2019-11-09 09:30:23", Arrive_time: "2019-11-09 12:30:23", Messenger_SSN: "1234512345123", License_plate: "AB1234" }
      ]
    })
  }

  render() {
    return (
      <div
        style={{
          display: "flex", flexDirection: "column", width: "100%", marginTop: "5vh"
        }}
      >
        creating sending round (choose invoice+ messenger+ car) Showing the
        sending round

        {/* TODOBYJANE */}
        <Dropdown
          style={{ marginTop: "1vh" }}
          key="Invoice"
          placeholder='select invoice'
          clearable
          selection
          name="selectedInvoice"
          options={this.state.invoices.map(invoice => ({ value: invoice.ID, text: invoice.ID }))}
          onChange={this.selectHandler}
          value={this.state.selectedInvoice}
        />
        <Dropdown
          style={{ marginTop: "1vh" }}
          key="Messenger"
          placeholder='select messenger'
          clearable
          selection
          name="selectedMessenger"
          options={this.state.messengers.map(messenger => ({ value: messenger.SSN, text: messenger.firstname + " " + messenger.lastname }))}
          onChange={this.selectHandler}
          value={this.state.selectedMessenger}
        />
        <Dropdown
          style={{ marginTop: "1vh" }}
          key="Car"
          placeholder='select car'
          clearable
          selection
          name="selectedCar"
          options={this.state.cars.map(car => ({ value: car, text: car }))}
          onChange={this.selectHandler}
          value={this.state.selectedCar}
        />
        <Button content='Create sending round'
          color="teal"
          onClick={this.createInvoiceHandler}
          style={{ marginTop: "1vh" }}>
        </Button>

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Depart time</Table.HeaderCell>
              <Table.HeaderCell>Arrive time</Table.HeaderCell>
              <Table.HeaderCell>Messenger SSN</Table.HeaderCell>
              <Table.HeaderCell>License plate</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.sendingRounds.map((sendingRound) => (
              <Table.Row key={sendingRound.ID}>
                <Table.Cell>{sendingRound.ID}</Table.Cell>
                <Table.Cell>{sendingRound.Depart_time}</Table.Cell>
                <Table.Cell>{sendingRound.Arrive_time}</Table.Cell>
                <Table.Cell>{sendingRound.Messenger_SSN}</Table.Cell>
                <Table.Cell>{sendingRound.License_plate}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

    );
  }
}

export default Sending;