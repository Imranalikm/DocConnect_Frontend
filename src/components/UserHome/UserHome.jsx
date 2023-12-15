  import React,{useState,useEffect} from 'react'
  import axiosInstance from '../../axios/axiosInstance'
  import UserHeader from '../UserHeader/UserHeader'
  import UserDepartmentRow from '../UserDepartmentRow/UserDepartmentRow'
  import { Col, Container, Row,Card } from 'react-bootstrap'
   import { Chip } from '@mui/material' 
  import { Link } from 'react-router-dom'
  import "./UserHome.css"
  import banner from "./../../assets/images/banner.jpg"
  import homeChatImg from "./../../assets/images/chatdctr1.jpg"
  import homeChatBotImg from "./../../assets/images/drbothome_50.jpg"
  import { getTop3Doctors, getTop3Hospitals } from '../../api/userApi'

  const UserHome = () => {
    const [departmentList, setDepartmentList] = useState([])
    const [doctorList, setDoctorList] = useState([])
  const [doctorRating, setDoctorRating] = useState({})
  const [hospitalRating, setHospitalRating] = useState({})
  const [hospitalList, setHospitalList] = useState([])
     
    useEffect(() => {
      (
        async function () {
          const { data } = await axiosInstance.get("/user/departments")
          if (data.departments) {
            setDepartmentList(data.departments)
          }
          const doctorsData = await getTop3Doctors();
          console.log(doctorsData)
        if (!doctorsData.err) {
          setDoctorList(doctorsData.doctors)
          setDoctorRating(doctorsData.rating)
        }
        const hospitalData = await getTop3Hospitals();
        if (!hospitalData.err) {
          setHospitalList(hospitalData.hospitals)
          setHospitalRating(hospitalData.rating)
        }
        }
      )()
    }, [])
    return (
      <>
      
        <UserHeader></UserHeader>
        <Row className='row'>
          
              <Container >
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

        <Container>
          <Row className="mt-5" style={{marginTop:'20px'}}>
            <Col md={6}>
              <div className="user-home-chat-img"  >
                <img src={homeChatImg} alt=""  style={{borderRadius:'15px'}} loading='lazy'/>
              </div>
            </Col>
            <Col md={6}>

              <div className="user-home-chat-desc">
               
                <h4>Chat with a Doctor</h4>
                <p className='text-center'>Chat with your favourite doctor and clarify your doubts</p>
                <Link to={"/chat"}>
                 <button>Go to Chat</button>
                </Link>
                {/* </div> */}
              </div>

            </Col>
          </Row>
          
        </Container>
        <Container>
        <Row className="mt-5 mb-5" styel={{marginTop:'20px'}}>
            
            <Col md={6}>

              <div className="user-home-chat-desc">
               
                <h4>Chat with a Dr.BOT</h4>
                <p className='text-center'>Empower Your Health: Seamless Chat with our Virtual Health Assistant </p>
                <Link to={"/docbot"}>
                 <button>Dr.BOT</button>
                </Link>
                {/* </div> */}
              </div>

            </Col>
            <Col md={6}>
              <div className="user-home-chat-img" >
                <img src={homeChatBotImg} alt=""  style={{borderRadius:'15px'}}/>
              </div>
            </Col>
          </Row>
        </Container>

  
      
    

      </>
    )
  }

  export default UserHome