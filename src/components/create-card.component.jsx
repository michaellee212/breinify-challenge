import React, { Component } from 'react';
import axios from 'axios';

// Bootstrap Imports
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
 
export default class CreateCard extends Component {
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
    
    // Creates new card
    onSubmit = () => {
        const card = {
            name: this.state.name,
            description: this.state.description,
        }
        console.log(card);
    
        axios
            .post('http://localhost:5000/card/add', card)

            .then(response => {
                console.log(response.data);
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
            <div className='create-container'>
                <Container>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" onChange={this.onChangeName} value={this.state.name} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Description" onChange={this.onChangeDescription} value={this.state.description}/>
                        </Form.Group>
                    
                        <Button variant="primary" type="submit" onClick={this.onSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        )
    }
}