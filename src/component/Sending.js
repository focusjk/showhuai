import React from "react";
import { Button, Card, Image, Icon, Search, Modal, Dropdown, Table } from "semantic-ui-react";
import CartItem from "./CartItem";
import Invoice from "./Invoice";
import { send } from "q";
import axios from 'axios';
import { url } from '../constant';
import DateTimePicker from 'react-datetime-picker';

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
    departTime: new Date(),
    arriveTime: new Date()
  };

  onChange = (type, date) => {
    this.setState({ [type]: date })
  }

  selectHandler = (e, { name, value, text }) => {
    this.setState({ [name]: value })
  }

  createInvoiceHandler = () => {
    //TODO Jane : api for inserting to database
    const { selectedInvoice: invoice, selectedMessenger: messenger, selectedCar: car } = this.state
    console.log("need send api to backend function")
    // console.log(invoice, messenger, car)
    console.log(this.state)
    this.loadSendingRound()
  }

  loadSendingRound = async () => {
    const sendingResult = await axios.get(url + '/sendinground')
    const sendingRounds = sendingResult.data
    this.setState({ sendingRounds })
  }

  deleteSendingRound = async (sendingRound) => {
    // console.log(sendingRound)
    // const result = await axios.delete(url + '/sendinground/del', { data: sendingRound })
    // console.log(result)
    // this.loadSendingRound()

  }

  async componentDidMount() {
    this.loadSendingRound()
    const carResult = await axios.get(url + '/sendinground/car')
    const cars = carResult.data
    const messengerResult = await axios.get(url + '/sendinground/messenger')
    const messengers = messengerResult.data
    const invoiceResult = await axios.get(url + '/sendinground/invoice')
    const invoices = invoiceResult.data
    this.setState({ cars, messengers, invoices })
  }

  render() {
    return (
      <div
        style={{
          display: "flex", flexDirection: "column", width: "60%", margin: "5vh 30vh",
        }}
      >
        {/* //   creating sending round (choose invoice+ messenger+ car) Showing the
        //   sending round */}

        {/* TODOBYJANE */}
        <div style={{ backgroundColor: "#DCDDDE", padding: "14px", borderRadius: "0 0 .28571429rem .28571429rem" }}>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", marginTop: "1vh", width: "50%" }}>
              <span><h5>Invoice</h5></span>
              <Dropdown
                style={{ margin: "1vh 4vh 0 0" }}
                key="Invoice"
                placeholder='select invoice'
                clearable
                selection
                name="selectedInvoice"
                options={this.state.invoices.map(invoice => ({ value: invoice.ID, text: invoice.ID }))}
                onChange={this.selectHandler}
                value={this.state.selectedInvoice}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: "1vh", width: "50%" }}>
              <span><h5>Messenger</h5></span>
              <Dropdown
                style={{ margin: "1vh 4vh 0 0" }}
                key="Messenger"
                placeholder='select messenger'
                clearable
                selection
                name="selectedMessenger"
                options={this.state.messengers.map(messenger => ({ value: messenger.SSN, text: messenger.Firstname + " " + messenger.Lastname }))}
                onChange={this.selectHandler}
                value={this.state.selectedMessenger}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: "1vh", width: "50%" }}>
              <span><h5>Car</h5></span>
              <Dropdown
                style={{ margin: "1vh 4vh 0 0" }}
                key="Car"
                placeholder='select car'
                clearable
                selection
                name="selectedCar"
                options={this.state.cars.map(car => ({ value: car, text: car }))}
                onChange={this.selectHandler}
                value={this.state.selectedCar}
              />
            </div>
          </div>
          <div style={{ display: "flex", FlexDirection: "row" }}>
            <div style={{ display: "flex", flexDirection: "column", marginTop: "1vh", width: "50%" }}>
              <span><h5>Depart time</h5></span>
              <div style={{ margin: "1vh 4vh 0 0" }}>
                <DateTimePicker
                  style={{ margin: "1vh 4vh 0 0", width: "100%" }}
                  onChange={(date) => this.onChange("departTime", date)}
                  value={this.state.departTime}
                  format="y-MM-d hh:mm:ss"
                ></DateTimePicker>
              </div>
            </div>
            <div style={{ margin: "1vh 4vh 0 0" }}>
              <div style={{ display: "flex", flexDirection: "column", marginTop: "1vh", width: "50%" }}>
                <span><h5>Arrive time</h5></span>
                <DateTimePicker
                  style={{ margin: "1vh 4vh 0 0", width: "100%" }}
                  onChange={(date) => this.onChange("arriveTime", date)}
                  value={this.state.arriveTime}
                  format="y-MM-d hh:mm:ss"
                ></DateTimePicker>
              </div>
            </div>
          </div>
          <Button content='Create sending round'
            color="teal"
            onClick={this.createInvoiceHandler}
            style={{ marginTop: "2vh", width: "100%" }}>
          </Button>
        </div>


        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Depart time</Table.HeaderCell>
              <Table.HeaderCell>Arrive time</Table.HeaderCell>
              <Table.HeaderCell>Messenger SSN</Table.HeaderCell>
              <Table.HeaderCell>License plate</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
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
                <Table.Cell><Icon link name='close' onClick={() => this.deleteSendingRound(sendingRound)} /></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div >

    );
  }
}

export default Sending;