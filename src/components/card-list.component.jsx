import React, { Component } from 'react';
import axios from 'axios';

// Bootstrap Imports
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

export default class CardList extends Component {
    constructor(props) {
        super(props);
            this.state = {
                cards: [],
                search: ''
            }
        this.deleteCard = this.deleteCard.bind(this);
    }    

    // Initial GET request to retrieve card data. 
    componentDidMount() {
        axios
            .get('http://localhost:5000/card/')

            .then(response => {
                console.log(response.data)
                this.setState({
                    cards: response.data
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

    // Deletes the selected card using its _id
    deleteCard = (e) => {
        axios
            .delete('http://localhost:5000/card/' + e._id)

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

              // Updates our state and removes the card that was just deleted
              this.setState({
                  cards: this.state.cards.filter(el => el._id !== e._id)
              })
    }

    // Search by name function
    onSearch = e => {
        this.setState({
            search: e.target.value
        })
    }

    // Sort by Ascending/Descending function
    onSort = sortType => {
        this.setState({sortType})
        this.state.cards.sort((a,b) => {
            const isReversed = (this.state.sortType === 'asc') ? -1 : 1;
            return isReversed * a.name.localeCompare(b.name);
        });
    }

    render() {        
        // Performs the search by name filtering
        let filteredCards = this.state.cards.filter( card => {
            return card.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        })

        return(
            <div className='container'>

                {/* Displays the Search bar and Filtering by Ascending and Descending order */}
                <Row>
                    <InputGroup className="mb-3">
                        <FormControl placeholder="Search by name" value={this.state.search} onChange={this.onSearch.bind(this)}/>
                        <DropdownButton id="dropdown-basic-button" title="Sort by">
                            <Dropdown.Item onClick={()=>this.onSort('asc')}>Ascending</Dropdown.Item>
                            <Dropdown.Item onClick={()=>this.onSort('desc')}>Descending</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup>
                </Row>

                {/* Maps the cards */}
                <div className='card-container'>
                    {filteredCards.map( card => {
                        var time = new Date(card.updatedAt).toLocaleString();
                        return(
                            <Container>
                                <Card style={{ width: '20rem', height: '17rem' }}>
                                    <Card.Body>
                                        <Card.Title>{card.name}</Card.Title>
                                        <Card.Text>{card.description}</Card.Text>
                                    </Card.Body>

                                    <Row>
                                        <Card.Body>
                                            <Button className='edit-button' variant="warning" href={'/edit/' + card._id}>Edit</Button>
                                        </Card.Body>
                                        <Card.Body>
                                            <Button className='delete-button' variant="danger" onClick={() => this.deleteCard(card)}>Delete</Button>
                                        </Card.Body>
                                    </Row>
                                    
                                    <Card.Footer>
                                        <small className="text-muted">Created {time}</small>
                                    </Card.Footer>

                                </Card>
                            </Container>
                        ) 
                    })}
                </div>
            </div>
        )
    }
}