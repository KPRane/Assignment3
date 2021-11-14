import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Nav, Card, Row, Col, Container } from 'react-bootstrap';
export default function Product() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3003/Product')
            .then(res => {
                setData(res.data)
            })
    },[])
    return (
        <Container fluid>
           
            <Container fluid className="text-center text-uppercase" >
                <Row md={4}>
                    {data.map((pro,index) =>
                        <Col md={3} key={index}>
                            <Card >
                                <Card.Img variant="top" src={pro.images} height="250px" />
                                <Card.Body >
                                    <Card.Title> Title:{pro.title}</Card.Title>
                                    <Card.Text> ID:{pro.id}</Card.Text>
                                    <Card.Text>Type:{pro.type}</Card.Text>
                                    <Card.Text>Quantity:{pro.Quantity}</Card.Text>
                                    <Card.Text>Price:{pro.price}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
              
                </Row>

            </Container>
        </Container>
    )
}
