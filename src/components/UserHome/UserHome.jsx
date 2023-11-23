  import React,{useState,useEffect} from 'react'
  import axiosInstance from '../../axios/axiosInstance'
  import UserHeader from '../UserHeader/UserHeader'
  import UserDepartmentRow from '../UserDepartmentRow/UserDepartmentRow'
  import { Col, Container, Row } from 'react-bootstrap'
  import { Link } from 'react-router-dom'
  import "./UserHome.css"
  import banner from "./../../assets/images/banner.jpg"

  const UserHome = () => {
    const [departmentList, setDepartmentList] = useState([])

    useEffect(() => {
      (
        async function () {
          const { data } = await axiosInstance.get("/user/departments")
          if (data.departments) {
            setDepartmentList(data.departments)
          }
        }
      )()
    }, [])
    return (
      <>
      
        <UserHeader></UserHeader>
        <Row className='row'>
          
              <Container>
              <div className="div ">
          <img
            loading="lazy"
            srcSet={banner}
            className="img"
          />
          <div className="div-2">Your Health, Your Choice, Our App.</div>
          
          <div className="div-4">
            <Link to='/search' className='link'>Take Appointment</Link>
            </div>
        </div>
              
              </Container>
          
          </Row>
          <Row>
          <UserDepartmentRow hospitalWise={false} list={departmentList} />
        </Row>
      
    

      </>
    )
  }

  export default UserHome