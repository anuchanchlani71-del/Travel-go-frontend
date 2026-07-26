import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";

const HeroSearch = () => {


  const tabs = [
  { id: "flights", label: "✈ Flights" },
  { id: "cabs", label: "🚕 Cabs" },
  { id: "trains", label: "🚂 Trains" },
  { id: "buses", label: "🚌 Buses" },
];
  const [activeTab, setActiveTab] = useState("flights");
  const [trainSearch, setTrainSearch] = useState({
  fromStation: "",
  toStation: "",
  date: ""
});


const [flightSearch, setFlightSearch] = useState({
  from: "",
  to: "",
  date: ""
});


const [cabSearch, setCabSearch] = useState({
  city: "",
  dropCity: "",
  date: ""
});


const [busSearch, setBusSearch] = useState({
  from: "",
  to: "",
  date: ""
});
  const navigate = useNavigate();



  const today = new Date().toISOString().split("T")[0];
const handleTrainChange = (e) => {

  setTrainSearch({
    ...trainSearch,
    [e.target.name]: e.target.value
  });

};
const handleBusChange = (e) => {

  setBusSearch({
    ...busSearch,
    [e.target.name]: e.target.value
  });

};

const handleCabChange = (e) => {

  setCabSearch({
    ...cabSearch,
    [e.target.name]: e.target.value
  });

};
const handleFlightChange = (e) => {

  setFlightSearch({
    ...flightSearch,
    [e.target.name]: e.target.value
  });

};
const searchTrains = async () => {

  try {

    const response = await axios.get(
      `http://localhost:5000/api/front/searchroute`,
      {
        params: {
          fromStation: trainSearch.fromStation,
          toStation: trainSearch.toStation,
          date: trainSearch.date
        }
      }
    );

    // NO TRAIN FOUND
     if (response.data.data.length === 0) {
      toast.error(response.data.message || "No trains found");

      return;

    }

    navigate("/trains", {
      state: {
        trains: response.data.data
      }
    });

  } catch (error) {

    console.log(error);
toast.error(
  error.response?.data?.message || "Something went wrong"
);

  }

};
const searchCabs = async () => {

  try {

    const response = await axios.get(
      "http://localhost:5000/api/front/searchcabroute",
      {
        params: {
          city: cabSearch.city
        }
      }
    );

    // NO CAB FOUND
   if (!response.data.data || response.data.data.length === 0) { toast.error("No cabs found for this route and date");

      return;

    }

    // NAVIGATE ONLY IF CAB FOUND
    navigate("/cabs", {

      state: {

        cabs: response.data.data,
        dropCity: cabSearch.dropCity

      }

    });

  } catch (error) {

    console.log(error);

   toast.error(
  error.response?.data?.message || "Something went wrong"
);

  }

};


const searchFlights = async () => {

  try {

    const response = await axios.get(
      "http://localhost:5000/api/front/searchflightroute",
      {
        params: {
          from: flightSearch.from,
          to: flightSearch.to,
          date: flightSearch.date
        }
      }
    );

    // NO FLIGHT FOUND
   if (!response.data.data || response.data.data.length === 0) { toast.error("No flight found for this route and date");

      return;

    }

    navigate("/flights", {

      state: {

        flights: response.data.data

      }

    });

  } catch (error) {

    console.log(error);
toast.error(
  error.response?.data?.message || "Something went wrong"
);

  }

};


const searchBuses = async () => {

  try {

    const response = await axios.get(
      "http://localhost:5000/api/front/searchbusroute",
      {
        params: {
          from: busSearch.from,
          to: busSearch.to,
          date: busSearch.date
        }
      }
    );

    // NO BUS FOUND
  if (!response.data.data || response.data.data.length === 0) { toast.error("No bus found for this route and date");

      return;

    }

    navigate("/buses", {

      state: {

        buses: response.data.data

      }

    });

  } catch (error) {

    console.log(error);
toast.error(
  error.response?.data?.message || "Something went wrong"
);

  }

};

// const searchCabs = async () => {

//   try {

//     const response = await axios.get(
//       "http://localhost:5000/api/seller/searchcabroute",
//       {
//         params: {
//           city: cabSearch.city
//         }
//       }
//     );

//     navigate("/cabs", {
//       state: {
//         cabs: response.data.data,
//         dropCity: cabSearch.dropCity
//       }
//     });

//   } catch (error) {

//     console.log(error);

//     alert("No cabs found");

//   }

// };
  return (
    <section className="hero-section   text-white">
      <div className="hero-bg" style={{
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/download (1).jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "650px"
  }}/>

      <Toaster/>
      <Container className="position-relative" style={{ zIndex: 10 }}>
        <div className="text-center mb-5 animate-fade-in">
          <h1 className="display-4 font-heading fw-bold mb-3">
            Explore the World<br /><span style={{ color: "var(--accent)" }}>Your Way</span>
          </h1>
          <p className="lead opacity-75 mx-auto" style={{ maxWidth: 540 }}>Book flights, cabs, trains & buses at the best prices.</p>
        </div>

        <div className="search-card shadow-elevated mx-auto p-1" style={{ maxWidth: 900 }}>
          <Nav variant="tabs" className="nav-tab-travel border-bottom">
            {tabs.map((tab) => (
              <Nav.Item key={tab.id}>
                <Nav.Link active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}>{tab.label}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <div className="p-4">
           {activeTab === "trains" && (
  <Row className="g-2 align-items-end">

    <Col md>
      <Form.Control
        placeholder="From Station"
        name="fromStation"
        value={trainSearch.fromStation}
        onChange={handleTrainChange}
      />
    </Col>

    <Col md>
      <Form.Control
        placeholder="To Station"
        name="toStation"
        value={trainSearch.toStation}
        onChange={handleTrainChange}
      />
    </Col>

    <Col md>
      <Form.Control
        type="date"
        name="date"
          min={today}
        value={trainSearch.date}
        onChange={handleTrainChange}
      />
    </Col>

    <Col md={2}>
      <Button
        className="btn-sunset w-100"
        onClick={searchTrains}
      >
        🔍 Search
      </Button>
    </Col>




  </Row>



)}

{activeTab === "cabs" && (

  <Row className="g-2 align-items-end">

    <Col md>
      <Form.Control
        placeholder="Pickup City"
        name="city"
        value={cabSearch.city}
        onChange={handleCabChange}
      />
    </Col>

    <Col md>
      <Form.Control
        placeholder="Drop City"
        name="dropCity"
        value={cabSearch.dropCity}
        onChange={handleCabChange}
      />
    </Col>

    <Col md>
      <Form.Control
        type="date"
        name="date"
          min={today}
        value={cabSearch.date}
        onChange={handleCabChange}
      />
    </Col>

    <Col md={2}>
      <Button
        className="btn-sunset w-100"
        onClick={searchCabs}
      >
        🔍 Search
      </Button>
    </Col>

  </Row>

)}
{activeTab === "buses" && (

  <Row className="g-2 align-items-end">

    <Col md>
      <Form.Control
        placeholder="From City"
        name="from"
        value={busSearch.from}
        onChange={handleBusChange}
      />
    </Col>

    <Col md>
      <Form.Control
        placeholder="To City"
        name="to"
        value={busSearch.to}
        onChange={handleBusChange}
      />
    </Col>

    <Col md>
      <Form.Control
        type="date"
        name="date"
          min={today}
        value={busSearch.date}
        onChange={handleBusChange}
      />
    </Col>

    <Col md={2}>
      <Button
        className="btn-sunset w-100"
        onClick={searchBuses}
      >
        🔍 Search
      </Button>
    </Col>

  </Row>

)}


{activeTab === "flights" && (

  <Row className="g-2 align-items-end">

    <Col md>
      <Form.Control
        placeholder="From City"
        name="from"
        value={flightSearch.from}
        onChange={handleFlightChange}
      />
    </Col>

    <Col md>
      <Form.Control
        placeholder="To City"
        name="to"
        value={flightSearch.to}
        onChange={handleFlightChange}
      />
    </Col>

    <Col md>
      <Form.Control
        type="date"
        name="date"
          min={today}
        value={flightSearch.date}
        onChange={handleFlightChange}
      />
    </Col>

    <Col md={2}>
      <Button
        className="btn-sunset w-100"
        onClick={searchFlights}
      >
        🔍 Search
      </Button>
    </Col>

  </Row>

)}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSearch;
