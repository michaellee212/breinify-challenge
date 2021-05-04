import React, { Component } from 'react';

// Component Imports
import CardList from './card-list.component';
import CreateCard from './create-card.component';

// Bootstrap Imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

 
export default class Dashboard extends Component {

    // Show/Hide add new card form
    toggleAddCard = () => {
		var x = document.getElementById('add-card');
		if (x.style.display === 'inline-block') {
			x.style.display = 'none';
		} else {
			x.style.display = 'inline-block';
		}
	}

    render() {
        return(
            <div>
                <Container fluid="sm">
                    <Row>
                        <h1 className="dashboard-title">Breinify Coding Challenge</h1>
                    </Row>

                    <Row>
                        <Button className='add-card-button' onClick={this.toggleAddCard} variant="success">Add new card</Button>
                    </Row>

                    <Row id='add-card'>
                        <CreateCard />
                    </Row>    

                    <Row>
                        <CardList />
                    </Row>
                </Container>            
            </div>
        )
    }
}