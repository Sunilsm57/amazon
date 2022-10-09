import React from "react";
import  Card  from "react-bootstrap/card";
import Button  from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product } ) {
   
  return (
    <Card >
      <Link to={`/products/${product.slug}`}>
        <img src={product.image} className='card-img-top' alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/products/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.reviews}></Rating>
        <Card.Text><strong>₹{product.price}</strong></Card.Text>
        <Button variant="warning">Add to cart</Button>
        </Card.Body>
    </Card>
  );
}

export default Product;
