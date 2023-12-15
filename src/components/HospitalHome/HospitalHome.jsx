import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import HospitalHeader from '../HospitalHeader/HospitalHeader';
import HospitalSidebar from '../HospitalSidebar/HospitalSidebar';
import '../AdminHome/AdminHome.css'
import { FcMoneyTransfer, FcPaid, FcPortraitMode, FcTodoList } from 'react-icons/fc'
import Chart from "react-apexcharts";
import axios from 'axios';
import { getDashboardDetails } from '../../api/hospitalApi';
import { useSelector } from 'react-redux';
import WithdrawModal from '../Modals/WithdrawModal/WithdrawModal';

function HospitalHome() {
  const [clicked, setCLicked] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const hospital = useSelector((state)=>state.hospital.details)
  const [dashboardData, setDashboardData] = useState({
    totalBooking: 0,
    totalRevenue: 0,
    totalDoctors: 0,
    monthlyData: []
  })
  const handleClick = () => {
    setCLicked(!clicked)
  }
  const state = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
      }
    },
    series: [
      {
        name: "series-1",
        data: dashboardData.monthlyData
      }
    ]
  };
  useEffect(() => {
    (
      async function () {
        const data = await getDashboardDetails()
        if (!data.err) {
          setDashboardData({
            ...data.booking, totalDoctors: data.totalDoctors,
            monthlyData: data.monthlyData
          })
        }
      }
    )()

  }, [refresh])

  return (
    <div className="admin-home">
      <HospitalHeader handleClick={handleClick} />
      <div className="admin-main">
        <HospitalSidebar page={'dashboard'} clicked={clicked} />
        <div className="admin-container">
          <Container>

            <h5>Dashboard</h5>
          </Container>
          <Container>
            <Row>


              <Col md={3}>
                <div className="dash-item">
                  <div className="dash-item-desc">
                    <b>Total Booking</b>
                    <h3>{dashboardData.totalBooking}</h3>
                  </div>
                  <div className="dash-item icon">
                    <div className="icon-div">
                      <FcTodoList className='icon' />
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={3}>
                <div className="dash-item">
                  <div className="dash-item-desc">
                    <b>Total Revenue</b>
                    <h3>{dashboardData.totalRevenue}</h3>
                  </div>
                  <div className="dash-item icon">
                    <div className="icon-div">
                      <FcMoneyTransfer className='icon' />
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={3}>
                <div className="dash-item">
                  <div className="dash-item-desc">
                    <b>Total Doctors</b>
                    <h3>{dashboardData.totalDoctors}</h3>
                  </div>
                  <div className="dash-item icon">
                    <div className="icon-div">
                      <FcPortraitMode className='icon' />
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={3}>
                <div className="dash-item">
                  <div className="dash-item-desc">
                    <b>Wallet</b>
                    <h3>{hospital.wallet}</h3>
                    <button className='btn btn-outline-dark btn-sm' 
                    onClick={()=>setShowModal(true)}
                    disabled={hospital.wallet<100}>Withdraw</button>
                  </div>
                  <div className="dash-item icon">
                    <div className="icon-div">
                      <FcPaid className='icon' />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

          </Container>
          <Container>

            <h5>Analysis</h5>
          </Container>
          <Container>
            <Row>
                <Chart
                  options={state.options}
                  series={state.series}
                  type="bar"
                  className={'w-100 dashboard-chart'}
                  height={300}
                /> 
            </Row>

          </Container>
        </div>
      </div>
      {
        showModal &&
        <WithdrawModal setShowModal={setShowModal} refresh={refresh} setRefresh={setRefresh} />
      }
    </div>
  )
}

export default HospitalHome