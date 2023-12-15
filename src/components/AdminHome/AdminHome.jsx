import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import AdminHeader from '../AdminHeader/AdminHeader';
import { FcMoneyTransfer, FcPortraitMode, FcTodoList } from 'react-icons/fc';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import Chart from 'react-apexcharts';
import './AdminHome.css';
import { getAdminDashboardDetails } from '../../api/adminApi';

function AdminHome() {
  const [clicked, setCLicked] = useState(false);
  const handleClick = () => {
    setCLicked(!clicked);
  };
  const [dashboardData, setDashboardData] = useState({
    totalBooking: 0,
    totalRevenue: 0,
    totalDoctors: 0,
    monthlyData: [],
    departmentData: [],
  });

  const monthlyDataState = {
    options: {
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: '50%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
      },
      grid: {
        row: {
          colors: ['#fff', '#f2f2f2'],
        },
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        tickPlacement: 'on',
      },
      yaxis: {
        title: {
          text: 'Monthly Revenue',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100],
        },
      },
    },
    series: [
      {
        name: 'Monthly Revenue',
        data: dashboardData.monthlyData || [],
      },
    ],
  };
  

  const departmentDataState = {
    options: {
      chart: {
        id: 'basic-bar',
        width: 380,
        type: 'pie',
      },
      labels: dashboardData.departmentData.map((department) => department.departmentName),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
    series: dashboardData.departmentData.map((department) => department.count),
  };

  useEffect(() => {
    (async function () {
      const data = await getAdminDashboardDetails();
      if (!data.err) {
        setDashboardData({
          ...data.booking,
          totalDoctors: data.totalDoctors,
          monthlyData: data.monthlyData,
          departmentData: data.departmentData,
        });
      }
    })();
  }, []);

  return (
    <div className="admin-home">
      <AdminHeader handleClick={handleClick} />
      <div className="admin-main">
        <AdminSidebar page={'dashboard'} clicked={clicked} />
        <div className="admin-container">
          <Container fluid>
            <h5>Dashboard</h5>
          </Container>
          <Container>
            <Row>
              <Col md={4}>
                <div className="dash-item">
                  <div className="dash-item-desc">
                    <b>Total Booking</b>
                    <h3>{dashboardData.totalBooking}</h3>
                  </div>
                  <div className="dash-item icon">
                    <div className="icon-div">
                      <FcTodoList className="icon" />
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="dash-item">
                  <div className="dash-item-desc">
                    <b>Total Revenue</b>
                    <h3>{dashboardData.totalRevenue}</h3>
                  </div>
                  <div className="dash-item icon">
                    <div className="icon-div">
                      <FcMoneyTransfer className="icon" />
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="dash-item">
                  <div className="dash-item-desc">
                    <b>Total Doctors</b>
                    <h3>{dashboardData.totalDoctors}</h3>
                  </div>
                  <div className="dash-item icon">
                    <div className="icon-div">
                      <FcPortraitMode className="icon" />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          <Container fluid>
            <h5>Analysis</h5>
          </Container>
          <Container>
            <Row>
              <Col md={6}>
                <Chart
                  options={departmentDataState.options}
                  series={departmentDataState.series}
                  type="pie"
                  className={'w-100 dashboard-chart'}
                  height={300}
                />
              </Col>
              <Col md={6}>
                <Chart
                  options={monthlyDataState.options}
                  series={monthlyDataState.series}
                  type="bar"
                  className={'w-100 dashboard-chart'}
                  height={300}
                />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
