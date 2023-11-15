import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './userDepartmentRow.css'
import img1 from '../../assets/images/10.jpg'
import { Link } from 'react-router-dom'
import noResultImg from '../../assets/images/no-result.jpg'



function UserDepartmentRow({ list, hospitalWise, hospitalId }) {

    return (
        <Container>

            <Row>
                <div className="department-row-main">
                    <div className="department-row-container">
                        <Container>
                            <Row className='mt-5 d-flex justify-content-center'>
                                <h5 className='text-center'>Departments</h5>
                            </Row>
                        </Container>
                        <Container>

                            <Row className='mt-1 d-flex justify-content-center mt-5'>
                                {
                                    list[0] ?
                                        list.map((item, index) => {
                                            return <Col xs={6} md={2} key={index}>
                                                <Link to={'/department/' + item._id} state={{hospital:hospitalWise ? hospitalId : null}} >
                                                    <div className="department-item mt-3" >
                                                        <div className="department-item-box" >
                                                            <img src={img1} alt="" />
                                                            <b>{item.name}</b>
                                                        </div>

                                                    </div>
                                                </Link>
                                            </Col>
                                        })
                                        :
                                        <div className='no-result-container'>
                                            <img src={noResultImg} alt="" />
                                        </div>
                                }
                            </Row>
                        </Container>
                        <Row className='mt-5'></Row>
                    </div>
                </div>
            </Row>
        </Container>
    )
}

export default UserDepartmentRow