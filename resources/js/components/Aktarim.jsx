import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Countries from './Countries'
import axios from 'axios';
import { formatDate } from '../helpers';

function Aktarim() {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [year, setYear] = useState('');
    const [holidays, setHolidays] = useState([]);
    const [selected, setSelectedHolidays] = useState([]);

    const handleSelectHoliday = (date) => {
        setSelectedHolidays(prevSelected => {
            if (prevSelected.includes(date)) {
                return prevSelected.filter(selectedDate => selectedDate !== date);
            } else {
                return [...prevSelected, date];
            }
        });
    };

    const handleSelectCountry = (countryCode) => {
        setSelectedCountry(countryCode);
    };

    const importtHolidays = () => {

        axios.post(`http://127.0.0.1:8000/api/store-holiday`,
            {
                country: selectedCountry,
                selected: selected
            })
            .then(response => {
                console.log('Holidays successfully stored:', response.data.message);
            })
            .catch(error => {
                console.error('Error storing holidays', error.data.message);
            });
    }

    const getHoliday = () => {
        axios.post(`http://127.0.0.1:8000/api/get-holidays?country_code=${selectedCountry}&year=${year}`)
            .then(response => {
                if (!response.data.message) {
                    setHolidays(response.data);
                    fetchStoredHolidays(selectedCountry, year);
                }
            })
            .catch(error => {
                console.error('Error fetching holidays', error)
            })

    }

    const fetchStoredHolidays = (isoCode, year) => {
        axios.get(`http://127.0.0.1:8000/api/stored-holiday-days`, {
            params: { country: isoCode, year: year }
        })
        .then(response => {
            const storedDates = response.data.map(holiday => holiday.date);
            setSelectedHolidays(storedDates);
        })
        .catch(error => {
            console.error('Error fetching stored holidays', error);
        });
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-9">
                <div className="card rounded-1 border-0 shadow-sm p-3">
                    <div className="card-body">
                        <form className="row g-3 align-items-end">
                            <div className="col-md-7">
                                <label htmlFor='country'>Ülke</label>
                                <Countries onSelectCountry={handleSelectCountry} />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="year">Yıl</label>
                                <input
                                    type="number"
                                    className="form-control mt-2"
                                    id="year"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                />
                            </div>
                            <div className="col-md-2">
                                <button type="button" onClick={getHoliday} className="btn btn-primary btn-purple w-100 font-weight-bold mt-2">GETİR</button>
                            </div>
                        </form>
                    </div>
                </div>


                {holidays.map((holiday, index) => (
                    <div key={index} className="card mt-3 rounded-1 border-0 shadow-sm p-3">
                        <div className="card-body">
                            <div className='d-flex justify-content-between align-items-center'>
                                <div>
                                    <span className='small'>{formatDate(holiday.date)}</span>
                                    <h5 className="card-title mt-1 font-weight-bold">{holiday.name}</h5>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        className="form-check-input form-check-input-purple"
                                        checked={selected.includes(holiday.date)}
                                        onChange={() => handleSelectHoliday(holiday.date)}
                                        aria-label={`Select ${holiday.name}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {holidays.length > 0 && (
                    <div className="text-center mt-4 mb-4">
                        <button onClick={importtHolidays} className="btn btn-purple btn-p-lg font-weight-light">
                            İÇERİ AKTAR
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Aktarim;

