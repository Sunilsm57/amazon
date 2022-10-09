import React, { useEffect } from "react";
import {Helmet} from 'react-helmet-async'
import axios from "axios";
import { useReducer } from "react";
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";


const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.playload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.playload };
    default:
      return state;
  }
};
function Homescreen() {
  const [{loading,error,products},dispatch]=useReducer(logger(reducer),{
    products:[],
    loading:true,
    error:'',
  })
  // const [products,setProducts] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      dispatch({type:"FETCH_REQUEST"});
      try{
        const result = await axios.get("/api/products");
         dispatch({type:"FETCH_SUCCESS",playload:result.data});
      }catch(err){
          dispatch({type:"FETCH_FAIL",playload:err.message}); 
      }
      
      // setProducts(result.data);
    };
    fetchdata();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Amazona</title>
      </Helmet>
      <h1>Featured products</h1>
      <div className="products">
        
        {
          loading?(<LoadingBox/>):
          error?(<MessageBox variant="danger">{error}</MessageBox>):(
        <Row>
        {products.map((product) => (
          <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
            <Product product={product}></Product>
            
            </Col>
        ))}
        </Row>)}
      </div>
    </div>
  );
}

export default Homescreen;
