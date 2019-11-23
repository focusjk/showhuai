import React from "react";
import { Button, Card, Image, Icon, Search, Dropdown, Table } from "semantic-ui-react";
import CartItem from "./CartItem";
import Invoice from "./Invoice";
import Modal from './Modal'
import { send } from "q";
import axios from 'axios';
import { url } from '../constant';
import DateTimePicker from 'react-datetime-picker';

class Sending extends React.Component {
  state = {
    selectedInvoice: [],
    selectedMessenger: null,
    selectedCar: null,
    invoices: [],
    messengers: [],
    cars: [],
    sendingRounds: [],
    isLoading: false,
    isInserting: false,
    departTime: new Date(),
    arriveTime: new Date(),
    open: false,
    modalID: null
  };

  onChange = (type, date) => {
    this.setState({ [type]: date })
  }

  toDate = a => {
    const aa = new Date(a)
    const d = aa.getDate()
    const m = aa.getMonth() + 1
    const y = aa.getFullYear()
    const h = aa.getHours()
    const hh = h < 10 ? '0' + h : h
    const mm = aa.getMinutes()
    const mn = mm < 10 ? '0' + mm : mm
    return y + "-" + m + "-" + d + " " + hh + ":" + mn
  }

  toDateTime = a => {
    const aa = new Date(a)
    const d = aa.getDate()
    const m = aa.getMonth() + 1
    const y = aa.getFullYear()
    const h = aa.getHours()
    const hh = h < 10 ? '0' + h : h
    const mm = aa.getMinutes()
    const mn = mm < 10 ? '0' + mm : mm
    const x = aa.getSeconds()
    const xx = x < 10 ? '0' + x : x
    return y + "-" + m + "-" + d + " " + hh + ":" + mn + ":" + xx
  }

  selectHandler = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  createInvoiceHandler = async () => {
    const { selectedInvoice, selectedMessenger, selectedCar, departTime, arriveTime } = this.state
    const result = await axios.post(url + '/sendinground/add', {
      Invoice_ID: selectedInvoice,
      Messenger_SSN: selectedMessenger,
      License_plate: selectedCar,
      Depart_time: this.toDateTime(departTime),
      Arrive_time: this.toDateTime(arriveTime)
    })
    this.setState({ selectedInvoice: [], selectedMessenger: null, selectedCar: null, departTime: new Date(), arriveTime: new Date() })
    this.onUpdate()
  }

  deleteSendingRound = async () => {
    const ID = this.state.modalID
    console.log(ID)
    const result = await axios.delete(url + '/sendinground/del', { data: { ID } })
    console.log(result)
    if (result.data.affectedRows) {
      this.onUpdate()
      this.setState({ open: false })
    }

  }

  async onUpdate() {
    const sendingResult = await axios.get(url + '/sendinground')
    const sendingRounds = sendingResult.data
    console.log(sendingRounds)
    const carResult = await axios.get(url + '/sendinground/car')
    const cars = carResult.data
    const messengerResult = await axios.get(url + '/sendinground/messenger')
    const messengers = messengerResult.data
    const invoiceResult = await axios.get(url + '/sendinground/invoice')
    const invoices = invoiceResult.data
    this.setState({ cars, messengers, invoices, sendingRounds })
  }

  async componentDidMount() {
    this.onUpdate()
  }

  render() {
    const tableHeader = ["ID", "Depart time", "Arrive time", "Messenger SSN", "License plate", "Invoice ID", "Delete"]
    const currentTime = new Date();
    const { open } = this.state
    return (
      <div
        style={{
          display: "flex", flexDirection: "column", width: "60%", margin: "5vh 30vh",
        }}
      >
        <div style={{ backgroundColor: "#DCDDDE", padding: "14px", borderRadius: "0 0 .28571429rem .28571429rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", marginTop: "1vh", width: "50%" }}>
              <span><h5>Invoice</h5></span>
              <Dropdown
                style={{ margin: "1vh 4vh 0 0" }}
                key="Invoice"
                placeholder='select invoice'
                multiple
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
              {tableHeader.map(i => (<Table.HeaderCell>{i}</Table.HeaderCell>))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.sendingRounds.map(({ ID, Depart_time, Arrive_time, Messenger_SSN, License_plate, Invoice_ID }) => (
              <Table.Row key={ID}>
                <Table.Cell>{ID}</Table.Cell>
                <Table.Cell>{this.toDate(Depart_time)}</Table.Cell>
                <Table.Cell>{this.toDate(Arrive_time)}</Table.Cell>
                <Table.Cell>{Messenger_SSN}</Table.Cell>
                <Table.Cell>{License_plate}</Table.Cell>
                <Table.Cell>
                  {Invoice_ID.join(', ')}
                </Table.Cell>
                <Table.Cell>
                  {currentTime.getTime() < new Date(Depart_time).getTime() &&
                    <Icon
                      link
                      name='close'
                      onClick={() => this.setState({ open: true, modalID: ID })}
                    />
                  }
                  <Modal
                    open={open}
                    onCancel={() => this.setState({ open: false, modalID: null })}
                    onConfirm={() => this.deleteSendingRound()}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

    );
  }
}

export default Sending;