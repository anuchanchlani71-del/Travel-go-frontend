import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
// import { mockHotels } from "../data/mockData.js";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const CabResults = () => {
  const [filter, setFilter] = useState("All");
  // const [cabs,setCabs]=useState([]);

  //   const fetchCabs=async()=>{
  //     const response=await axios.get("http://localhost:5000/frontviewcab")
  //     console.log("response",response)
  //     setCabs(response.data.data ||[])
  //   }
  //   useEffect(()=>{
  //     fetchCabs();
  //   },[])

  const location = useLocation();
  
    const [cabs,setCabs]=useState([]);
    const fetchCabs=async()=>{
      const response=await axios.get("http://localhost:5000/api/front/frontviewcab")
      console.log("response",response)
      setCabs(response.data.data ||[])
    }
    useEffect(() => {
  
    // agar search se aaye
    if (location.state?.cabs) {
  
    setCabs(location.state.cabs);
  
    }
  
    // agar navbar se aaye
    else {
  
      fetchCabs();
  
    }
  
  }, []);
  const navigate = useNavigate();

  const handleBook = (path) => {
    if (!localStorage.getItem("usertoken")) {
         Swal.fire({
      icon: "warning",
      title: "Login Required",
      text: "Please login first to book!",
      confirmButtonText: "Go to Login",
      confirmButtonColor: "#1e3a6e"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  }else {
      navigate(path);
    }
  };

const types = [
  "All",
  ...new Set(cabs.map((c) => c.vehicleType))
];

const filtered =
  filter === "All"
    ? cabs
    : cabs.filter(
        (c) => c.vehicleType === filter
      );
  return (
    <div className="min-vh-100 bg-tg-muted">
          
      <Navbar />
      <div className="container" style={{ paddingTop: "100px", paddingBottom: "60px" }}>
        <h1 className="font-heading fw-bold mb-2">Available Cabs</h1>
        <p className="text-tg-muted mb-4">Choose your ride – fast, safe & affordable</p>

        <div className="d-flex gap-2 mb-4 flex-wrap">
          {types.map((t) => (
            <button key={t} onClick={() => setFilter(t)} className={`tg-pill ${filter === t ? "active" : ""}`}>{t}</button>
          ))}
        </div>

        <div className="row g-4">
          {/* {filtered.map((cab) => (
            <div key={cab.id} className="col-md-6 col-lg-4">
              <div className="tg-card overflow-hidden h-100">
                <div className="tg-gradient-ocean text-center p-4 position-relative">
                  <span style={{ fontSize: "3.5rem" }}>{cab.image}</span>
                </div>
                <div className="p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="font-heading fw-bold mb-0">{cab.name}</h6>
                    <span className="small text-tg-muted">⭐ {cab.rating}</span>
                  </div>
                  <div className="d-flex gap-3 small text-tg-muted mb-3">
                    <span><i className="bi bi-clock"></i> {cab.eta}</span>
                    <span><i className="bi bi-people"></i> {cab.seats} seats</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="fw-bold fs-5 text-tg-primary">₹{cab.price}</div>
                    <button onClick={() => navigate("/booking")} className="btn btn-tg-sunset btn-sm px-3">Book Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))} */}
          {filtered.map((cab) => (
  <div key={cab._id} className="col-md-6 col-lg-4">

    <div className="tg-card overflow-hidden h-100">

      <div className="text-center p-3">

        <img
          src={cab.cabImage}
          alt="cab"
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover"
          }}
        />

      </div>

      <div className="p-3">

        <div className="d-flex justify-content-between">

          <h5>{cab.cabName}</h5>

          <span>⭐ {cab.driverRating || 4.5}</span>

        </div>

        <p>{cab.vehicleType}</p>

        <p>{cab.seatingCapacity} Seats</p>

        <h5>₹ {cab.baseFare}</h5>

      <button
  className="btn btn-primary"
  onClick={() =>
    handleBook(`/cab-booking?id=${cab._id}`)
  }
>
  Book Now
</button>

      </div>

    </div>

  </div>
))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CabResults;
