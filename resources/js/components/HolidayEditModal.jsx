import React, { Component } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

export default class HolidayEditModal extends Component {
    state = {
        date: '',
        title: '',
        note: '',
    };

    componentDidMount() {
        const { holiday } = this.props;
        this.setState({
            date: holiday.date,
            title: holiday.name,
            note: holiday.note || '',
        });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };



    handleSave = () => {
        const { date, title, note } = this.state;
        const { holiday, handleClose, updateHolidaysList } = this.props;

        axios.put(`http://127.0.0.1:8000/api/holidays/${holiday.id}`, {
            date: date,
            name: title,
            note: note,
        })
            .then(response => {
                console.log('Holiday updated successfully:', response.data);
                handleClose();
                updateHolidaysList();
            })
            .catch(error => {
                console.error('Error updating holiday', error.response.data);
            });
    };


    render() {
        const { show, handleClose } = this.props;
        const { date, title, note } = this.state;

        return (
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Düzenle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formHolidayDate">
                                    <Form.Label>Tarih</Form.Label>
                                    <Form.Control
                                        type="date" // Tarih için HTML5 date picker kullan
                                        name="date"
                                        value={date}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formHolidayTitle">
                                    <Form.Label>Ad</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={title}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="formHolidayNote">
                            <Form.Label>Not Ekle</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="note"
                                value={note}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="justify-content-between">
                    <Button variant="outline" onClick={handleClose}>
                        İptal
                    </Button>
                    <Button className='btn-purple' onClick={this.handleSave}>
                        Kaydet
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}