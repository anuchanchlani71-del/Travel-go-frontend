import { useEffect } from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import Swal from 'sweetalert2';

function Hearder() {
       const navigate = useNavigate();
    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure you want to log out?',
            text: "You will be logged out of your account.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!'
        }).then((result) => {
            if (result.isConfirmed) {
                  localStorage.removeItem("adminToken");
                   localStorage.removeItem("sellerId");
                  
        localStorage.removeItem("_id");
                navigate('/admin', { replace: true });

            }
        });

    };
    useEffect(() => {
        const getToken = localStorage.getItem("adminToken")
        if (getToken) {
            console.log("token found successfully", getToken)
        } else {
        
            navigate("/admin")
        }
    })
    return (
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                <a href="#" className="nav-link">Home</a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                <Link to={'/admin/myProfile'} className="nav-link">My Profile</Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                <a href="#" className="nav-link" onClick={handleLogout}>Logout</a>
                </li>
            </ul>
            {/* Right navbar links */}
            </nav>
    );
  } 
  
  export default Hearder;