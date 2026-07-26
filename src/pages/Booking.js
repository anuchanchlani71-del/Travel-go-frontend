
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button
} from "react-bootstrap";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

const TrainBooking = () => {

  const themeColor = "#1e3a6e";

  const [params] = useSearchParams();
  const navigate = useNavigate();

  const trainId = params.get("id");

  const classType = params.get("class");
const [journeyDate, setJourneyDate] = useState("");

  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);

  const [passengers, setPassengers] = useState([
    { name: "", age: "", gender: "Male" }
  ]);

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [tatkalBooking, setTatkalBooking] = useState(false);

  // ================= FETCH TRAIN =================
  useEffect(() => {
    if (!localStorage.getItem("usertoken")) {
       toast.error("Please login first to book!");
      navigate("/login");
      return;
    }
    const fetchTrain = async () => {
      try {
        const res = await axios.get( `http://localhost:5000/api/front/singletrain?id=${trainId}`
        );

console.log("res",res)

        setTrain(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrain();
  }, [trainId]);

  if (loading) {
    return (
      <div className="text-center py-5">
        Loading...
      </div>
    );
  }

  if (!train) {
    return (
      <div className="text-center py-5">
        Train not found
      </div>
    );
  }

  // ================= CLASS SELECT =================
  const selectedClass =
    train.classes?.find(
      cls => cls.classType === classType
    ) || {};

  // ================= PASSENGERS =================
  const addPassenger = () => {
    setPassengers([
      ...passengers,
      { name: "", age: "", gender: "Male" }
    ]);
  };

  let totalAmount =
  selectedClass.baseFare * passengers.length;

if (tatkalBooking) {
  totalAmount += totalAmount * 0.2;
}
  const removePassenger = (index) => {
  const updatedPassengers = passengers.filter(
    (_, i) => i !== index
  );

  setPassengers(updatedPassengers);
};

const handlePassengerChange = (
  index,
  field,
  value
) => {
  const updated = [...passengers];
  updated[index][field] = value;
  setPassengers(updated);
};

  // ================= BOOKING API =================
  const handleBooking = async () => {
    if (!localStorage.getItem("usertoken")) {
      alert("Please login first to book!");
      navigate("/login");
      return;
    }


    
    try {
      const userId =
        localStorage.getItem("user_id");

      const payload = {
        userId,
        trainId: train._id,
        bookingType: "train",
        classType,
        passengersDetails: passengers,
        paymentMethod,
        tatkalBooking,
         journeyDate

      };

      const res = await axios.post(
        "http://localhost:5000/api/booking/addtrain",
        payload
      );
      console.log("res",res)

 toast.success(res.data.message);

    setTimeout(() => {
      navigate("/my-booking");
    }, 1500);
    }catch (err) {
      console.log(err);
     toast.error(
  err?.response?.data?.message ||
  "Booking Failed"
);
    }
  };

  // ================= UI =================
  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ background: "#f5f7fb" }}
    >
<Toaster/>
      <Navbar />

      {/* HERO */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#1e3a6e,#274b8f)",
          color: "white",
          padding: "45px 0"
        }}
      >
        <Container>
          <h2 className="fw-bold mb-2">
            🚂 Train Booking
          </h2>
          <p className="mb-0">
            Complete your journey details
            and confirm your reservation.
          </p>
        </Container>
      </div>

      <Container className="py-5 flex-grow-1">

        <Row className="g-4">

          {/* LEFT SIDE */}
          <Col lg={8}>

            {/* TRAIN CARD */}
            <Card
              className="border-0 mb-4"
              style={{
                borderRadius: "18px"
              }}
            >
              <Card.Body className="p-4">

                <h4 className="fw-bold">
                  {train.trainName}
                </h4>

                <small>
                  Train No: {train.trainNumber}
                </small>

                <div
                  style={{
                    marginTop: 10,
                    padding: "6px 12px",
                    display: "inline-block",
                    background: "#e8f0ff",
                    borderRadius: 20,
                    color: themeColor
                  }}
                >
                  {selectedClass.availableSeats} Seats Left
                </div>

                <hr />

                <Row className="text-center">
               <Col>
  {train.fromStation?.stationName}
</Col>

<Col>
  {classType}
</Col>

<Col>
  {train.toStation?.stationName}
</Col>
                </Row>

              </Card.Body>
            </Card>

            {/* PASSENGERS */}
            <Card className="border-0 mb-4">
              <Card.Body className="p-4">

                <div className="d-flex justify-content-between mb-3">
                  <h5>Passenger Details</h5>

                  <Button
                    onClick={addPassenger}
                    style={{
                      background: "transparent",
                      border: `1px solid ${themeColor}`,
                      color: themeColor
                    }}
                  >
                    + Add
                  </Button>
                  
                </div>

                {passengers.map((p, i) => (
                  <div key={i} className="mb-3">

                    <Form.Control
                      placeholder="Name"
                      className="mb-2"
                      value={p.name}
                      onChange={(e) =>
                        handlePassengerChange(
                          i,
                          "name",
                          e.target.value
                        )
                      }
                    />

                 <Form.Control
  type="number"
  placeholder="Age"
  className="mb-2"
  value={p.age}
  onChange={(e) =>
    handlePassengerChange(
      i,
      "age",
      Number(e.target.value)
    )
  }
/>

                    <Form.Select
                      value={p.gender}
                      onChange={(e) =>
                        handlePassengerChange(
                          i,
                          "gender",
                          e.target.value
                        )
                      }
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Form.Select>

    {passengers.length > 1 && (
      <Button
        variant="danger"
        size="sm"
        className="mt-2"
        onClick={() => removePassenger(i)}
      >
        Remove Passenger
      </Button>
    )}
                  </div>
                ))}

              </Card.Body>
            </Card>

            {/* OPTIONS */}
            <Card className="border-0">
              <Card.Body className="p-4">




<Form.Group className="mb-3">
  <Form.Label>Journey Date</Form.Label>

  <Form.Control
    type="date"
    value={journeyDate}
    onChange={(e) =>
      setJourneyDate(e.target.value)
    }
  />
</Form.Group>
                <Form.Check
                  label="Tatkal Booking"
                  checked={tatkalBooking}
                  onChange={() =>
                    setTatkalBooking(!tatkalBooking)
                  }
                />

                <Form.Select
                  className="mt-3"
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                >
                  <option value="upi">UPI</option>
                  <option value="card">Card</option>
               
                </Form.Select>

              </Card.Body>
            </Card>

          </Col>

          {/* RIGHT SIDE */}
          <Col lg={4}>

            <Card
              className="border-0"
              style={{
                position: "sticky",
                top: 90
              }}
            >
              <Card.Body className="p-4">

                <h5>Fare Summary</h5>

                <div className="d-flex justify-content-between">
                  <span>baseFare</span>
                  <span>
                    ₹{selectedClass.baseFare}
                  </span>
                </div>

                <div className="d-flex justify-content-between">
                  <span>Passengers</span>
                  <span>{passengers.length}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>

                <Button
                  className="w-100 mt-3"
                  style={{
                    background: themeColor,
                    border: "none"
                  }}
                  onClick={handleBooking}
                >
                  Confirm Booking
                </Button>

              </Card.Body>
            </Card>

          </Col>

        </Row>

      </Container>

      <Footer />
    </div>
  );
};

export default TrainBooking;