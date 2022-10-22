import { Form, Button } from 'react-bootstrap';

import React, {useState} from 'react'


const ContactScreen = ({ history }) => {
    
    
  return (
   
    <div>
        <h1>Contact</h1><br></br>
        <Form>
          <Form.Group controlId="formBasicName">           
          <Form.Label>Name</Form.Label>
          <Form.Control />
          </Form.Group>

         <Form.Group controlId="formBasicEmail">
         <Form.Label>Email</Form.Label>
         <Form.Control/>
         </Form.Group>
        <Form.Group controlId="formBasicTextField">
        <Form.Label>Message</Form.Label>
        <Form.Control/>
        </Form.Group>
        <Button variant="success" type="submit">Submit
        </Button>
      </Form>
   </div>
  )
}

export default ContactScreen