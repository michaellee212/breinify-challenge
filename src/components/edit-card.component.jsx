import React, { Component } from 'react';
import axios from 'axios';

// Bootstrap Imports
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
 
export default class EditCard extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

            this.state = {
                name: '',
                description: '',
            }
    }

    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onChangeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    // Retrieves card data for specific card _id
    componentDidMount() {
        axios
            .get('http://localhost:5000/card/' + this.props.match.params.id)

            .then(response => {
                console.log(response.data);
                this.setState({
                    name: response.data.name,
                    description: response.data.description
                })
            })

            .catch((error) => {
                if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
                }
            });
 
    }

    // Performs card edit function
    onSubmit = () => {
        const card = {
            name: this.state.name,
            description: this.state.description,
        }
        console.log(card);
    
        axios
            .put('http://localhost:5000/card/update/' + this.props.match.params.id, card)

            .then(response => {
                console.log(response.data);
                window.location = '/';
            })

            .catch((error) => {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log("Error", error.message);
                }
              });
    }

 
    render() {
        return(
            <div className='container'>
                <h1 className='edit-title'>Edit Card</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={this.state.name} onChange={this.onChangeName} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Description" value={this.state.description} onChange={this.onChangeDescription} />
                    </Form.Group>
                 
                    <Button variant="primary" onClick={this.onSubmit}>
                        Edit
                    </Button>
                </Form>
            </div>
        )
    }
}