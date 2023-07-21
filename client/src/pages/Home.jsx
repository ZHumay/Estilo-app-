import React from 'react';
import './Home.css';
import Navbar from '../components/Navbar/Navbar';
import { Button } from '@mui/material';


function Home() {
 
  return (
    <>
    <Navbar/>
      <div className="slider">
        <figure>
          <div className="slide">
        <div className='slide-text'>
          <h1> Women collection</h1>
          <Button style={{backgroundColor:"#A569BD"}} className='slidebtn' variant="contained">Shop now</Button>
        </div>
            <img src="https://themewagon.github.io/cozastore/images/slide-01.jpg" alt="" />
          </div>
          <div className="slide">
          <div className='slide-text'>
          <h1> Men collection</h1>
          <Button style={{backgroundColor:"#A569BD"}} className='slidebtn' variant="contained">Shop now</Button>
        </div>
            <img src="https://themewagon.github.io/cozastore/images/slide-03.jpg" alt="" />
          </div>
        </figure>
      </div>

      <div className='about'>
        <div className='about-section'>
          <div className='delivery'>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
