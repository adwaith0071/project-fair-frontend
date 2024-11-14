import React from 'react'
import { Link } from 'react-router-dom'
import { Row,Col } from 'react-bootstrap'
function Footer() {
  return (
<>
<div className='container-fluid p-3 bg-primary'>
    <Row>
        <Col>
        <h3>Project Fair 2024</h3>
        <p style={{textAlign:'justify'}}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque eos natus placeat excepturi aliquid eum iure saepe?
             Fugit id molestias doloremque. Rem ab velit rerum consectetur labore sequi quae suscipit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo illo eaque quaerat culpa recusandae, nulla doloremque ex obcaecati sequi quia placeat reiciendis veritatis tenetur quas porro exercitationem sit. Odio, id?</p>
        </Col>

        <Col className='d-flex flex-column'>
        <h3>Links</h3>
        <Link to={'/'} className='text-light'>Landing</Link>
        <Link to={'auth'} className='text-light'>Login</Link>
        
        </Col>

        <Col>
        <h3>Feedback</h3>
        <textarea name="" className='form-control p-4' id=""></textarea>
        <button className='btn btn-secondary mt-3'>Send</button>        
        </Col>




    </Row>

</div>



</>  )
}

export default Footer