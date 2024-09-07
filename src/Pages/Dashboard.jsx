import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Navbar';

const Dashboard = () => {
    const userInfo = useSelector((state) => state.auth.userInfo);
    console.log(userInfo)
    const navigate=useNavigate()
    if (!userInfo) {
        navigate('/login')
        return 
    }

    return (
        <div className="background-container" style={{ backgroundImage: 'url(/food4.jpg)' }}>
      <Header />
      <div className="main-body" >
        <nav aria-label="breadcrumb" className="main-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item text-white">Home</li>
            <li className="breadcrumb-item active " aria-current="page">Profile</li>
          </ol>
        </nav>
        <div className="row gutters-sm" >
          
            <div className="card card-profile"  >
              <div className="card-body">
            <h1>Welcome to your Dashboard, {userInfo.name}!</h1>
            
        
        </div>
        </div>
        </div>
        </div>
        </div>
    );
};

export default Dashboard;
