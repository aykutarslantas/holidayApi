import React, { Component } from 'react';
import axios from 'axios';
import { formatDate } from '../helpers';
import Button from 'react-bootstrap/Button';
import HolidayEditModal from './HolidayEditModal';


export default class Holidays extends Component {
  state = {
    holidays: [],
    showModal: false,
    editingHoliday: null,
  };

  updateHolidaysList = () => {
    this.fetchHolidays();
  };

  openModal = (holiday) => {
    this.setState({ editingHoliday: holiday, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  componentDidMount() {
    this.fetchHolidays();
  }

  fetchHolidays = () => {
    axios.get('http://127.0.0.1:8000/api/holidays')
      .then(response => {
        this.setState({ holidays: response.data });
      })
      .catch(error => {
        console.error('Error fetching holidays', error);
      });
  };

  render() {
    const { holidays, showModal, editingHoliday } = this.state;

    return (
      <div>
        {holidays.map((holiday, index) => (
          <div key={index} className="card mt-3 rounded-1 border-0 shadow-sm p-3">
            <div className="card-body">
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <span className='small'>{formatDate(holiday.date)}</span>
                  <h5 className="card-title mt-1 font-weight-bold">{holiday.name}</h5>
                </div>
                <div>
                  <Button variant="outline-secondary" onClick={() => this.openModal(holiday)}>Düzenle</Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {showModal && editingHoliday && (
          <HolidayEditModal
            holiday={editingHoliday}
            show={showModal}
            handleClose={this.closeModal}
            updateHolidaysList={this.updateHolidaysList}
          />
        )}
      </div>
    );
  }
}
