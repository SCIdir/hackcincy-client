import React, { Component } from 'react'
import classNames from 'classnames';
import ReactModal from 'react-modal';

import './Events.scss'

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selectedEvent: null,
      events: []
    };
    this.renderListItem = this.renderListItem.bind(this);
    this.buyTicket = this.buyTicket.bind(this);
  }

  componentDidMount() {
    this.props.getContractInfo()
      .then((data) => {
        this.props.getEvents();
      });
  }

  buyTicket() {
    this.setState({isLoading: true});
    console.log('clicked: ', this.state);
    // TODO: Some stuff
    //.then(() => this.setState({ isLoading: false }))
  }

  renderListItem(item, index) {
    console.log(index%2);
    return (
      <tr key={item.id} className={classNames('eventRow', {'odd': (index%2 == 0)})}>
        <td style={{flex: 2}}>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.qty}</td>
        <td><button onClick={() => {
          this.setState({'buyModalOpen': true, selectedEvent: item })
        }}>Buy Ticket</button></td>
      </tr>
    )
  }

  render() {
    return (
      <div className='events-container' >
        <table>
          <th>
            <td style={{flex: 2}}>Name</td>
            <td>Price</td>
            <td>Qty Remaining</td>
            <td>Buy</td>
          </th>
          <tbody>
            {this.props.events.map((event, index) => {
              return this.renderListItem(event, index);
            })}
          </tbody>
        </table>
        <ReactModal
          isOpen={this.state.buyModalOpen}
          contentLabel="Payment Modal"
          onRequestClose={() => {
            if(!this.state.isLoading) {
              this.setState({buyModalOpen: false})
            }
          }}
          style={require('./modal-styles.js').default}
        >
          <h2 className="checkout-header">Payment Information</h2>
          <span className='event-name'>Name: {this.state.selectedEvent && this.state.selectedEvent.name}</span>
          <span className='event-price'>Price: {this.state.selectedEvent && this.state.selectedEvent.price}</span>
          <button
            className={classNames({isLoading: this.state.isLoading, notLoading: !this.state.isLoading })}
            onClick={() => this.buyTicket()}>{(this.state.isLoading) ? <img src={require('../../../layouts/assets/img/spinner.svg')} />
            : 'Confirm Purchase'}</button>
        </ReactModal>
      </div>
    )
  }
}

export default Events
