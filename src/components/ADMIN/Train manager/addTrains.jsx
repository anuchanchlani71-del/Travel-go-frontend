
// ================= IMPORTS =================


import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function AddTrain() {

  const navigate = useNavigate();

  // ================= MAIN FORM STATE =================
  const [formData, setFormData] = useState({
    trainName: "",
    trainNumber: "",
    operator: "Indian Railways",
    trainType: "",

    fromStation: {
      city:"",
      stationName: "",
      stationCode: ""
    },

    toStation: {
      stationName: "",
      stationCode: "",
      city:"",
    },

    departureTime: "",
    arrivalTime: "",
    durationMinutes: "",

    journeyStartDate: "",
    journeyEndDate: "",

    runningDays: [],

    pantryAvailable: false,
    tatkalAvailable: false,
    underMaintenance: false,
    isActive: false,

    cancellationPolicy: "",

    sellerId: localStorage.getItem("sellerId")
  });

  // ================= CLASSES =================
  const [classes, setClasses] = useState([
    {
      classType: "",
      baseFare: "",
      totalSeats: "",
      availableSeats: ""
    }
  ]);

  // ================= STOPS =================
  const [stops, setStops] = useState([
    {
      stopNumber: "",
      day: "",
      stationName: "",
      stationCode: "",
      arrivalTime: "",
      departureTime: "",
      haltTime: "",
      distance: ""
    }
  ]);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

  };

  // ================= FROM STATION =================
  const handleFromStation = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      fromStation: {
        ...formData.fromStation,
        [name]: value
      }
    });

  };

  // ================= TO STATION =================
  const handleToStation = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      toStation: {
        ...formData.toStation,
        [name]: value
      }
    });

  };

  // ================= RUNNING DAYS =================
  const handleRunningDays = (day) => {

    if (formData.runningDays.includes(day)) {

      setFormData({
        ...formData,
        runningDays: formData.runningDays.filter(
          (item) => item !== day
        )
      });

    } else {

      setFormData({
        ...formData,
        runningDays: [...formData.runningDays, day]
      });

    }

  };

  // ================= CLASS CHANGE =================
  const handleClassChange = (index, e) => {

    const updated = [...classes];

    updated[index][e.target.name] = e.target.value;

    setClasses(updated);

  };

  // ================= STOP CHANGE =================
  const handleStopChange = (index, e) => {

    const updated = [...stops];

    updated[index][e.target.name] = e.target.value;

    setStops(updated);

  };

  // ================= ADD CLASS =================
  const addMoreClass = () => {

    setClasses([
      ...classes,
      {
        classType: "",
        baseFare: "",
        totalSeats: "",
        availableSeats: ""
      }
    ]);

  };

  // ================= REMOVE CLASS =================
  const removeClass = (index) => {

    const updated = [...classes];

    updated.splice(index, 1);

    setClasses(updated);

  };

  // ================= ADD STOP =================
  const addStop = () => {

    setStops([
      ...stops,
      {
        stopNumber: "",
        day: "",
        stationName: "",
        stationCode: "",
        arrivalTime: "",
        departureTime: "",
        haltTime: "",
        distance: ""
      }
    ]);

  };

  // ================= REMOVE STOP =================
  const removeStop = (index) => {

    const updated = [...stops];

    updated.splice(index, 1);

    setStops(updated);

  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {
        ...formData,
        classes,
        stops
      };

      const response = await axios.post(
        "http://localhost:5000/api/seller/addTrain",
        payload
      );

      if (response.data.success) {

         toast.success(response.data.message);

        navigate("/admin/trains");

      } else {

       toast.error(response.data.message);

      }

    } catch (error) {

      console.log(error);

       toast.error(
    error.response?.data?.message || "Something went wrong"
  );


    }

  };

  return (
    <div className="wrapper">

    <Toaster/>
      <Header />
      <SideMenu />

      <div className="content-wrapper">

        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">Add Train</h1>
          </div>
        </div>

        <div className="content">
          <div className="container-fluid">

            <div className="row justify-content-center">

              <div className="col-md-11">

                <div className="card card-primary">

                  <div className="card-header">
                    <h3 className="card-title">
                      Train Information
                    </h3>
                  </div>

                  <div className="card-body">

                    {/* ================= FORM ================= */}
                    <form onSubmit={handleSubmit}>

                      {/* BASIC DETAILS */}
                      <h4
                        className="mb-3"
                        style={{ fontWeight: "bold" }}
                      >
                        Basic Details
                      </h4>

                      <div className="row">

                        <div className="col-md-6">
                          <div className="form-group">

                            <label>Train Name</label>

                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Train Name"
                              name="trainName"
                              value={formData.trainName}
                              onChange={handleChange}
                              required
                            />

                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">

                            <label>Train Number</label>

                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Train Number"
                              name="trainNumber"
                              value={formData.trainNumber}
                              onChange={handleChange}
                              required
                            />

                          </div>
                        </div>

                      </div>

                      <div className="row">

                        <div className="col-md-6">
                          <div className="form-group">

                            <label>Operator</label>

                            <input
                              type="text"
                              className="form-control"
                              placeholder="Indian Railways"
                              name="operator"
                              value={formData.operator}
                              onChange={handleChange}
                              required
                            />

                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">

                            <label>Train Type</label>

                            <select
                              className="form-control"
                              name="trainType"
                              value={formData.trainType}
                              onChange={handleChange}
                              required
                            >

                              <option value="">
                                Select Train Type
                              </option>

                              <option value="Express">
                                Express
                              </option>

                              <option value="Superfast">
                                Superfast
                              </option>

                              <option value="Rajdhani">
                                Rajdhani
                              </option>

                              <option value="Shatabdi">
                                Shatabdi
                              </option>

                              <option value="Duronto">
                                Duronto
                              </option>

                              <option value="Passenger">
                                Passenger
                              </option>

                              <option value="Local">
                                Local
                              </option>

                            </select>

                          </div>
                        </div>

                      </div>

                      <hr />

                      {/* STATION DETAILS */}
                      <h4
                        className="mb-3"
                        style={{ fontWeight: "bold" }}
                      >
                        Station Details
                      </h4>

                      <div className="row">

                        {/* FROM */}
                        <div className="col-md-6">

                          <div
                            className="border rounded p-3"
                            style={{ background: "#f8f9fa" }}
                          >

                            <h5 className="mb-3">
                              From Station
                            </h5>

                            <div className="form-group">

                              <label>Station Name</label>

                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Station Name"
                                name="stationName"
                                value={formData.fromStation.stationName}
                                onChange={handleFromStation}
                                required
                              />

                            </div>
                            
                            <div className="form-group">

                              <label>city</label>

                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter city"
                                name="city"
                                value={formData.fromStation.city}
                                onChange={handleFromStation}
                                required
                              />

                            </div>

                            <div className="form-group">

                              <label>Station Code</label>

                              <input
                                type="text"
                                className="form-control"
                                placeholder="e.g NDLS"
                                name="stationCode"
                                value={formData.fromStation.stationCode}
                                onChange={handleFromStation}
                                required
                              />

                            </div>

                          </div>

                        </div>

                        {/* TO */}
                        <div className="col-md-6">

                          <div
                            className="border rounded p-3"
                            style={{ background: "#f8f9fa" }}
                          >

                            <h5 className="mb-3">
                              To Station
                            </h5>

                            <div className="form-group">

                              <label>Station Name</label>

                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Station Name"
                                name="stationName"
                                value={formData.toStation.stationName}
                                onChange={handleToStation}
                                required
                              />

                            </div>
                             <div className="form-group">

                              <label>city</label>

                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter city"
                                name="city"
                                value={formData.toStation.city}
                                onChange={handleToStation}
                                required
                              />

                            </div>

                            <div className="form-group">

                              <label>Station Code</label>

                              <input
                                type="text"
                                className="form-control"
                                placeholder="e.g BCT"
                                name="stationCode"
                                value={formData.toStation.stationCode}
                                onChange={handleToStation}
                                required
                              />

                            </div>

                          </div>

                        </div>

                      </div>

                      <hr />

                      {/* TIMINGS */}
                      <h4
                        className="mb-3"
                        style={{ fontWeight: "bold" }}
                      >
                        Journey Timings
                      </h4>

                      <div className="row">

                        <div className="col-md-4">
                          <div className="form-group">

                            <label>Departure Time</label>

                            <input
                              type="time"
                              className="form-control"
                              name="departureTime"
                              value={formData.departureTime}
                              onChange={handleChange}
                              required
                            />

                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">

                            <label>Arrival Time</label>

                            <input
                              type="time"
                              className="form-control"
                              name="arrivalTime"
                              value={formData.arrivalTime}
                              onChange={handleChange}
                              required
                            />

                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">

                            <label>Duration (Minutes)</label>

                            <input
                              type="number"
                              className="form-control"
                              placeholder="Enter Duration"
                              name="durationMinutes"
                              value={formData.durationMinutes}
                              onChange={handleChange}
                              required
                            />

                          </div>
                        </div>

                      </div>

                      {/* DATE */}
                      <div className="row">

                        <div className="col-md-6">
                          <div className="form-group">

                            <label>Journey Start Date</label>

                            <input
                              type="date"
                              className="form-control"
                              name="journeyStartDate"
                              value={formData.journeyStartDate}
                              onChange={handleChange}
                            />

                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">

                            <label>Journey End Date</label>

                            <input
                              type="date"
                              className="form-control"
                              name="journeyEndDate"
                              value={formData.journeyEndDate}
                              onChange={handleChange}
                            />

                          </div>
                        </div>

                      </div>

                      <hr />

                      {/* RUNNING DAYS */}
                      <h4
                        className="mb-3"
                        style={{ fontWeight: "bold" }}
                      >
                        Running Days
                      </h4>

                      <div className="d-flex flex-wrap mb-4">

                        {[
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                          "Sunday"
                        ].map((day, index) => (

                          <div
                            key={index}
                            className="mr-4 mb-2"
                          >

                            <input
                              type="checkbox"
                              className="mr-2"
                              checked={formData.runningDays.includes(day)}
                              onChange={() => handleRunningDays(day)}
                            />

                            {day}

                          </div>

                        ))}

                      </div>
{/* STOPS */}
<hr />

<div className="d-flex justify-content-between align-items-center mb-3">

  <div>

    <h4 style={{ fontWeight: "bold" }}>
      Train Stops
    </h4>

    <small className="text-muted">
      Add multiple train stops for this journey
    </small>

  </div>

  <button
    type="button"
    className="btn btn-success"
    onClick={addStop}
  >

    <i className="fas fa-plus mr-2"></i>
    Add Stop

  </button>

</div>

{/* MULTIPLE STOPS */}
{stops.map((item, index) => (

  <div
    key={index}
    className="border rounded p-3 mb-3"
    style={{ background: "#f9f9f9" }}
  >

    <div className="d-flex justify-content-between align-items-center mb-3">

      <h5 className="m-0">
        Stop Details
      </h5>

      {stops.length > 1 && (
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => removeStop(index)}
        >

          <i className="fas fa-trash mr-1"></i>
          Remove Stop

        </button>
      )}

    </div>

    <div className="row">

      <div className="col-md-2">
        <div className="form-group">

          <label>Stop No.</label>

          <input
            type="number"
            className="form-control"
            placeholder="1"
            name="stopNumber"
            value={item.stopNumber}
            onChange={(e) => handleStopChange(index, e)}
          />

        </div>
      </div>

      <div className="col-md-2">
        <div className="form-group">

          <label>Day</label>

          <input
            type="number"
            className="form-control"
            placeholder="1"
            name="day"
            value={item.day}
            onChange={(e) => handleStopChange(index, e)}
          />

        </div>
      </div>

      <div className="col-md-4">
        <div className="form-group">

          <label>Station Name</label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter Station Name"
            name="stationName"
            value={item.stationName}
            onChange={(e) => handleStopChange(index, e)}
          />

        </div>
      </div>

      <div className="col-md-4">
        <div className="form-group">

          <label>Station Code</label>

          <input
            type="text"
            className="form-control"
            placeholder="NDLS"
            name="stationCode"
            value={item.stationCode}
            onChange={(e) => handleStopChange(index, e)}
          />

        </div>
      </div>

    </div>

    <div className="row">

      <div className="col-md-3">
        <div className="form-group">

          <label>Arrival Time</label>

          <input
            type="time"
            className="form-control"
            name="arrivalTime"
            value={item.arrivalTime}
            onChange={(e) => handleStopChange(index, e)}
          />

        </div>
      </div>

      <div className="col-md-3">
        <div className="form-group">

          <label>Departure Time</label>

          <input
            type="time"
            className="form-control"
            name="departureTime"
            value={item.departureTime}
            onChange={(e) => handleStopChange(index, e)}
          />

        </div>
      </div>

      <div className="col-md-3">
        <div className="form-group">

          <label>Halt Time</label>

          <input
            type="text"
            className="form-control"
            placeholder="10 Min"
            name="haltTime"
            value={item.haltTime}
            onChange={(e) => handleStopChange(index, e)}
          />

        </div>
      </div>

      <div className="col-md-3">
        <div className="form-group">

          <label>Distance (KM)</label>

          <input
            type="number"
            className="form-control"
            placeholder="120"
            name="distance"
            value={item.distance}
            onChange={(e) => handleStopChange(index, e)}
          />

        </div>
      </div>

    </div>

  </div>

))}

{/* FEATURES */}
<h4
  className="mb-3"
  style={{ fontWeight: "bold" }}
>
  Train Features
</h4>

<div className="row">

  <div className="col-md-3">
    <div
      className="border rounded p-3 text-center"
      style={{ background: "#f8f9fa" }}
    >

      <i
        className="fas fa-utensils mb-2"
        style={{
          fontSize: "25px",
          color: "#28a745"
        }}
      ></i>

      <div>
        <label style={{ cursor: "pointer" }}>
          <input
            type="checkbox"
            className="mr-2"
            name="pantryAvailable"
            checked={formData.pantryAvailable}
            onChange={handleChange}
          />
          Pantry Available
        </label>
      </div>

    </div>
  </div>

  <div className="col-md-3">
    <div
      className="border rounded p-3 text-center"
      style={{ background: "#f8f9fa" }}
    >

      <i
        className="fas fa-ticket-alt mb-2"
        style={{
          fontSize: "25px",
          color: "#007bff"
        }}
      ></i>

      <div>
        <label style={{ cursor: "pointer" }}>
          <input
            type="checkbox"
            className="mr-2"
            name="tatkalAvailable"
            checked={formData.tatkalAvailable}
            onChange={handleChange}
          />
          Tatkal Available
        </label>
      </div>

    </div>
  </div>

  <div className="col-md-3">
    <div
      className="border rounded p-3 text-center"
      style={{ background: "#f8f9fa" }}
    >

      <i
        className="fas fa-tools mb-2"
        style={{
          fontSize: "25px",
          color: "#dc3545"
        }}
      ></i>

      <div>
        <label style={{ cursor: "pointer" }}>
          <input
            type="checkbox"
            className="mr-2"
            name="underMaintenance"
            checked={formData.underMaintenance}
            onChange={handleChange}
          />
          Under Maintenance
        </label>
      </div>

    </div>
  </div>

  <div className="col-md-3">
    <div
      className="border rounded p-3 text-center"
      style={{ background: "#f8f9fa" }}
    >

      <i
        className="fas fa-check-circle mb-2"
        style={{
          fontSize: "25px",
          color: "#17a2b8"
        }}
      ></i>

      <div>
        <label style={{ cursor: "pointer" }}>
          <input
            type="checkbox"
            className="mr-2"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          Active Train
        </label>
      </div>

    </div>
  </div>

</div>

<hr />

{/* TRAIN CLASSES */}
<div className="d-flex justify-content-between align-items-center mb-3">

  <div>

    <h4 style={{ fontWeight: "bold" }}>
      Train Classes
    </h4>

    <small className="text-muted">
      Add multiple train classes like SL, 3AC, 2AC etc.
    </small>

  </div>

  <button
    type="button"
    className="btn btn-success"
    onClick={addMoreClass}
  >

    <i className="fas fa-plus mr-2"></i>
    Add More Class

  </button>

</div>

{/* MULTIPLE CLASS */}
{classes.map((item, index) => (

  <div
    key={index}
    className="border rounded p-3 mb-3"
    style={{ background: "#f9f9f9" }}
  >

    <div className="d-flex justify-content-between align-items-center mb-3">

      <h5 className="m-0">
        Class Details
      </h5>

      {classes.length > 1 && (
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => removeClass(index)}
        >

          <i className="fas fa-trash mr-1"></i>
          Remove Class

        </button>
      )}

    </div>

    <div className="row">

      <div className="col-md-3">
        <div className="form-group">

          <label>Class Type</label>

          <select
            className="form-control"
            name="classType"
            value={item.classType}
            onChange={(e) => handleClassChange(index, e)}
          >

            <option value="">
              Select Class
            </option>

            <option value="SL">SL</option>
            <option value="3AC">3AC</option>
            <option value="2AC">2AC</option>
            <option value="1AC">1AC</option>
            <option value="CC">CC</option>
            <option value="2S">2S</option>

          </select>

        </div>
      </div>

      <div className="col-md-3">
        <div className="form-group">

          <label>Base Fare</label>

          <input
            type="number"
            className="form-control"
            placeholder="Enter Fare"
            name="baseFare"
            value={item.baseFare}
            onChange={(e) => handleClassChange(index, e)}
          />

        </div>
      </div>

      <div className="col-md-3">
        <div className="form-group">

          <label>Total Seats</label>

          <input
            type="number"
            className="form-control"
            placeholder="Enter Seats"
            name="totalSeats"
            value={item.totalSeats}
            onChange={(e) => handleClassChange(index, e)}
          />

        </div>
      </div>

      <div className="col-md-3">
        <div className="form-group">

          <label>Available Seats</label>

          <input
            type="number"
            className="form-control"
            placeholder="Available Seats"
            name="availableSeats"
            value={item.availableSeats}
            onChange={(e) => handleClassChange(index, e)}
          />

        </div>
      </div>

    </div>

  </div>

))}

<hr />

{/* CANCELLATION POLICY */}
<div className="form-group">

  <label>Cancellation Policy</label>

  <textarea
    className="form-control"
    rows="4"
    placeholder="Enter Cancellation Policy"
    name="cancellationPolicy"
    value={formData.cancellationPolicy}
    onChange={handleChange}
  ></textarea>

</div>

{/* BUTTONS */}
<div className="form-group text-right">

  <Link
    to={"/admin/trains"}
    className="btn btn-secondary mr-2"
  >
    Cancel
  </Link>

  <button
    type="submit"
    className="btn btn-primary"
  >
    Save Train
  </button>

</div>
                      {/* AAGE TUMHARA SAME DESIGN RAHEGA */}

                    </form>

                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>

      </div>

      <Footer />

    </div>
  );
}

export default AddTrain;