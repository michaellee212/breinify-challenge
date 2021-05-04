import React, { Component } from 'react';
import axios from 'axios';

// Bootstrap Imports
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import CardColumns from 'react-bootstrap/CardColumns'
import Button from 'react-bootstrap/Button'


export default class CardComponent extends Component {
    constructor(props) {
        super(props);
            this.state = {
                cards: [],
            }

        this.deleteCard = this.deleteCard.bind(this);
    }


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


    render() {

        return(
            <div className='card-container'>
                {this.props.cardInfo.map( card => {
                    return(
                    <CardDeck >
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{card.name}</Card.Title>
                                <Card.Text>{card.description}</Card.Text>
                            </Card.Body>
                            <Button variant="warning">Edit</Button>
                            <Button variant="danger" onClick={() => this.deleteCard(card)}>Delete</Button>
                            <Card.Footer>
                                <small className="text-muted">Created {card.createdAt}</small>
                            </Card.Footer>
                        </Card>
                    </CardDeck >
                    ) 
                })}
            </div>
        )
    }
}