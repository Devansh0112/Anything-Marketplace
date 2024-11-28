import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Assuming custom styles are in App.css

class Main extends Component {
    render() {
        return (
            <Container className="py-5">
                <h1 className="text-center mb-4" style={{ fontFamily: 'Raleway, sans-serif' }}>Add Product</h1>
                <Form onSubmit={(event) => {
                    event.preventDefault();
                    const name = this.productName.value;
                    const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether');
                    this.props.createProduct(name, price);
                }}>
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    id="productName"
                                    type="text"
                                    ref={(input) => { this.productName = input }}
                                    placeholder="Product Name"
                                    required
                                    style={{ transition: 'border-color 0.3s', borderColor: '#A8D5E3' }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    id="productPrice"
                                    type="text"
                                    ref={(input) => { this.productPrice = input }}
                                    placeholder="Product Price"
                                    required
                                    style={{ transition: 'border-color 0.3s', borderColor: '#A8D5E3' }}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" block style={{ backgroundColor: '#8B0000', borderColor: '#FF78AC' }}>Add Product</Button>
                        </Col>
                    </Row>
                </Form>

                <h2 className="text-center my-4" style={{ fontFamily: 'Roboto Slab, serif' }}>Buy Product</h2>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Owner</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="productList">
                        {this.props.products.map((product, key) => (
                            <tr key={key}>
                                <td>{product.id.toString()}</td>
                                <td>{product.name}</td>
                                <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                                <td>{product.owner}</td>
                                <td>
                                    {!product.purchased ? (
                                        <Button
                                            variant="success"
                                            onClick={() => this.props.purchaseProduct(product.id, product.price)}
                                            // style={{ transition: 'background-color 0.3s', backgroundColor: '#F2F0EA' }}
                                        >
                                            Buy
                                        </Button>
                                    ) : (
                                        <span style={{ color: "red" }}>SOLD</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default Main;