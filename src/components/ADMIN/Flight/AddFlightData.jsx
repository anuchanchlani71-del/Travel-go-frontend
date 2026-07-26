
import Header from '../Header';
import Footer from '../Footer';
import SideMenu from '../SideMenu';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

function AddFlightData() {

  const [flightData, setFlightData] = useState({

    flightnumber: "",
    airline: "",
    airlineCode: "",

    fromCity: "",
    fromAirport: "",
    fromCode: "",

    toCity: "",
    toAirport: "",
    toCode: "",

    departuretime: "",
    arrivaltime: "",
    duration: "",

    stopCity: "",
    stopAirport: "",
    stopCode: "",
    stopArrivalTime: "",
    stopDepartureTime: "",

    economyPrice: "",
    economySeats: "",
    economyAvailableSeats: "",
    economyAmenityName: "",
    economyAmenityIncluded: true,
    economyAmenityPrice: "",

    businessPrice: "",
    businessSeats: "",
    businessAvailableSeats: "",
    businessAmenityName: "",
    businessAmenityIncluded: true,
    businessAmenityPrice: "",

    aircraftName: "",
    aircraftCode: "",

    checkIn: "",
    cabin: "",

    refundable: true,
    cancellationFee: "",
    rescheduleFee: "",

    status: "On Time"

  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFlightData({
      ...flightData,
      [name]: value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const payload = {

      flightnumber: flightData.flightnumber,
      airline: flightData.airline,
      airlineCode: flightData.airlineCode,

      from: {
        city: flightData.fromCity,
        airport: flightData.fromAirport,
        code: flightData.fromCode
      },

      to: {
        city: flightData.toCity,
        airport: flightData.toAirport,
        code: flightData.toCode
      },

      departuretime: flightData.departuretime,
      arrivaltime: flightData.arrivaltime,
      duration: flightData.duration,

      stops: flightData.stopCity
        ? [
            {
              city: flightData.stopCity,
              airport: flightData.stopAirport,
              code: flightData.stopCode,
              arrivalTime: flightData.stopArrivalTime,
              departureTime: flightData.stopDepartureTime
            }
          ]
        : [],

      classes: {

        economy: {

          price: flightData.economyPrice,
          seats: flightData.economySeats,
          availableSeats: flightData.economyAvailableSeats,

          amenities: flightData.economyAmenityName
            ? [
                {
                  name: flightData.economyAmenityName,
                  included: flightData.economyAmenityIncluded === "true",
                  price: flightData.economyAmenityPrice
                }
              ]
            : []

        },

        business: {

          price: flightData.businessPrice,
          seats: flightData.businessSeats,
          availableSeats: flightData.businessAvailableSeats,

          amenities: flightData.businessAmenityName
            ? [
                {
                  name: flightData.businessAmenityName,
                  included: flightData.businessAmenityIncluded === "true",
                  price: flightData.businessAmenityPrice
                }
              ]
            : []

        }

      },

      status: flightData.status,

      aircraft: {
        name: flightData.aircraftName,
        code: flightData.aircraftCode
      },

      baggage: {
        checkIn: flightData.checkIn,
        cabin: flightData.cabin
      },

      fareRules: {
        refundable: flightData.refundable === "true",
        cancellationFee: flightData.cancellationFee,
        rescheduleFee: flightData.rescheduleFee
      },

      createdBy: localStorage.getItem("sellerId")

    };

    try {

      const response = await axios.post(
        "http://localhost:5000/admin/api/v1/AddFlights",
        payload
      );

      console.log(response.data);

     toast.success("Flight Added Successfully");

    } catch (error) {

      console.log(error);
     toast.error("Something went wrong");

    }

  };

  return (

    <div className="wrapper">
  <Toaster />
      <Header />
      <SideMenu />

      <div className="content-wrapper">

        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">
              Add Flight
            </h1>
          </div>
        </div>

        <div className="content">

          <div className="container-fluid">

            <div className="row justify-content-center">

              <div className="col-md-11">

                <div className="card card-primary shadow">

                  <div className="card-header">
                    <h3 className="card-title">
                      Flight Information
                    </h3>
                  </div>

                  <div className="card-body">

                    <form onSubmit={handleSubmit}>

                      {/* BASIC DETAILS */}

                      <div
                        className="border rounded p-3 mb-4"
                        style={{ background: "#f8f9fa" }}
                      >

                        <h4 className="mb-3 text-dark">
                          <b>Basic Flight Details</b>
                          
                        </h4>

                        <div className="row">

                          <div className="col-md-4">

                            <div className="form-group">

                              <label>
                                Flight Number
                              </label>

                              <input
                                type="text"
                                className="form-control"
                                name="flightnumber"
                                placeholder="AI-202"
                                onChange={handleChange}
                              />

                            </div>

                          </div>

                          <div className="col-md-4">

                            <div className="form-group">

                              <label>
                                Airline
                              </label>

                              <input
                                type="text"
                                className="form-control"
                                name="airline"
                                placeholder="Air India"
                                onChange={handleChange}
                              />

                            </div>

                          </div>

                          <div className="col-md-4">

                            <div className="form-group">

                              <label>
                                Airline Code
                              </label>

                              <input
                                type="text"
                                className="form-control"
                                name="airlineCode"
                                placeholder="AI"
                                onChange={handleChange}
                              />

                            </div>

                          </div>

                        </div>

                      </div>

                      {/* ROUTE */}

                      <div
                        className="border rounded p-3 mb-4"
                        style={{ background: "#f8f9fa" }}
                      >

                        <h4 className="mb-3 text-dark">
                          <b>Route Information</b>
                          
                        </h4>

                        <div className="row">

                          <div className="col-md-6">

                            <div className="border rounded p-3 bg-white">

                              <h5 className="mb-3">
                                From
                              </h5>
 <label>
                                city
                              </label>
                              <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="City"
                                name="fromCity"
                                onChange={handleChange}
                              />
 <label>
                                airport
                              </label>
                              <input
                              
                                type="text"
                                className="form-control mb-3"
                                placeholder="Airport"
                                name="fromAirport"
                                onChange={handleChange}
                              />
 <label>
                                code
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Code"
                                name="fromCode"
                                onChange={handleChange}
                              />

                            </div>

                          </div>

                          <div className="col-md-6">

                            <div className="border rounded p-3 bg-white">

                              <h5 className="mb-3">
                                To
                              </h5>
 <label>
                                city
                              </label>
                              <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="City"
                                name="toCity"
                                onChange={handleChange}
                              />
 <label>
                                To
                              </label>
                              <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Airport"
                                name="toAirport"
                                onChange={handleChange}
                              />
 <label>
                                code
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Code"
                                name="toCode"
                                onChange={handleChange}
                              />

                            </div>

                          </div>

                        </div>

                      </div>

                      {/* TIMING */}

                      <div
                        className="border rounded p-3 mb-4"
                        style={{ background: "#f8f9fa" }}
                      >

                        <h4 className="mb-3 text-dark">
                          <b>Flight Timing</b>
                          
                        </h4>

                        <div className="row">

                          <div className="col-md-4">

                            <label>
                              Departure Time
                            </label>

                            <input
                              type="datetime-local"
                              className="form-control"
                              name="departuretime"
                              onChange={handleChange}
                            />

                          </div>

                          <div className="col-md-4">

                            <label>
                              Arrival Time
                            </label>

                            <input
                              type="datetime-local"
                              className="form-control"
                              name="arrivaltime"
                              onChange={handleChange}
                            />

                          </div>

                          <div className="col-md-4">

                            <label>
                              Duration
                            </label>

                            <input
                              type="number"
                              className="form-control"
                              placeholder="Minutes"
                              name="duration"
                              onChange={handleChange}
                            />

                          </div>

                        </div>

                      </div>

                      {/* STOPS */}

                      <div
                        className="border rounded p-3 mb-4"
                        style={{ background: "#f8f9fa" }}
                      >

                        <h4 className="mb-3 text-dark">
                          <b>Stop Information</b>
                          
                        </h4>

                        <div className="row">

                          <div className="col-md-4">
                             <label>
                                city
                              </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Stop City"
                              name="stopCity"
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-4">
                             <label>
                                airport
                              </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Stop Airport"
                              name="stopAirport"
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-4">
                             <label>
                                code
                              </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Stop Code"
                              name="stopCode"
                              onChange={handleChange}
                            />
                          </div>

                        </div>

                        <div className="row mt-3">

                          <div className="col-md-6">
                             <label>
                                arrival time
                              </label>
                            <input
                              type="datetime-local"
                              className="form-control"
                              name="stopArrivalTime"
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-6">
                             <label>
                                departure time
                              </label>
                            <input
                              type="datetime-local"
                              className="form-control"
                              name="stopDepartureTime"
                              onChange={handleChange}
                            />
                          </div>

                        </div>

                      </div>

                      {/* ECONOMY */}

                      <div
                        className="border rounded p-3 mb-4"
                        style={{ background: "#f8f9fa" }}
                      >

                        <h4 className="mb-3 text-dark">
                          <b> Economy Class</b>
                         
                        </h4>

                        <div className="row">

                          <div className="col-md-4">
                             <label>
                                price
                              </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Price"
                              name="economyPrice"
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-4">
                             <label>
                                seats
                              </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Seats"
                              name="economySeats"
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-4">
                             <label>
                                Avalable seats
                              </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Available Seats"
                              name="economyAvailableSeats"
                              onChange={handleChange}
                            />
                          </div>

                        </div>

                        <div className="row mt-3">

                          <div className="col-md-4">
                             <label>
                                Amenity name
                              </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Amenity Name"
                              name="economyAmenityName"
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-4">
 <label>
                              select  
                              </label>
                            <select
                              className="form-control"
                              name="economyAmenityIncluded"
                              onChange={handleChange}
                            >
                              <option value="true">
                                Included
                              </option>

                              <option value="false">
                                Paid
                              </option>

                            </select>

                          </div>

                          <div className="col-md-4">
                             <label>
                                Amenity price
                              </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Amenity Price"
                              name="economyAmenityPrice"
                              onChange={handleChange}
                            />
                          </div>

                        </div>

                      </div>

                      {/* BUSINESS */}

                      <div
                        className="border rounded p-3 mb-4"
                        style={{ background: "#f8f9fa" }}
                      >

                        <h4 className="mb-3 text-dark">
                          <b>
                          Business Class</b>
                        </h4>

                        <div className="row">

                          <div className="col-md-4">
                             <label>
                                price 
                              </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Price"
                              name="businessPrice"
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-4">
                             <label>
                                seats
                              </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Seats"
                              name="businessSeats"
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-4">
                             <label>
                                available Seats 
                              </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Available Seats"
                              name="businessAvailableSeats"
                              onChange={handleChange}
                            />
                          </div>

                        </div>

                        <div className="row mt-3">

                          <div className="col-md-4">
                             <label>
                                Amenity name
                              </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Amenity Name"
                              name="businessAmenityName"
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-4">
 <label>
                             select   
                              </label>
                            <select
                              className="form-control"
                              name="businessAmenityIncluded"
                              onChange={handleChange}
                            >
                              <option value="true">
                                Included
                              </option>

                              <option value="false">
                                Paid
                              </option>

                            </select>

                          </div>

                          <div className="col-md-4">
                             <label>
                                Amenity price
                              </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Amenity Price"
                              name="businessAmenityPrice"
                              onChange={handleChange}
                            />
                          </div>

                        </div>

                      </div>

                      {/* AIRCRAFT */}

                      <div
                        className="border rounded p-3 mb-4"
                        style={{ background: "#f8f9fa" }}
                      >

                        <h4 className="mb-3 text-dark">
                          <b>Aircraft Information</b>
                          
                        </h4>

                        <div className="row">

                          <div className="col-md-6">
                             <label>
                                aircraft name
                              </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Aircraft Name"
                              name="aircraftName"
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-6">
                             <label>
                                aircraft code
                              </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Aircraft Code"
                              name="aircraftCode"
                              onChange={handleChange}
                            />
                          </div>

                        </div>

                      </div>

                      {/* BAGGAGE */}

                      <div
                        className="border rounded p-3 mb-4"
                        style={{ background: "#f8f9fa" }}
                      >

                        <h4 className="mb-3 text-dark">
                          <b>   Baggage Information </b>
                        
                        </h4>

                        <div className="row">

                          <div className="col-md-6">
                             <label>
                                check in baggage
                              </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Check-In Baggage"
                              name="checkIn"
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-6">
                             <label>
                                cabin baggage
                              </label>
                            <input
                            
                              type="text"
                              className="form-control"
                              placeholder="Cabin Baggage"
                              name="cabin"
                              onChange={handleChange}
                            />
                          </div>

                        </div>

                      </div>

                      {/* FARE RULES */}

                      <div
                        className="border rounded p-3 mb-4"
                        style={{ background: "#f8f9fa" }}
                      >

                        <h4 className="mb-3 text-dark">
                          <b>  Fare Rules </b>
                         
                        </h4>

                        <div className="row">

                          <div className="col-md-4">

                            <select
                              className="form-control"
                              name="refundable"
                              onChange={handleChange}
                            >
                              <option value="true">
                                Refundable
                              </option>

                              <option value="false">
                                Non Refundable
                              </option>

                            </select>

                          </div>

                          <div className="col-md-4">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Cancellation Fee"
                              name="cancellationFee"
                              onChange={handleChange}
                            />
                          </div>

                          <div className="col-md-4">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Reschedule Fee"
                              name="rescheduleFee"
                              onChange={handleChange}
                            />
                          </div>

                        </div>

                      </div>

                      {/* STATUS */}

                      <div
                        className="border rounded p-3 mb-4"
                        style={{ background: "#f8f9fa" }}
                      >

                        <h4 className="mb-3 text-dark">
                          <b> Flight Status</b>
                          
                        </h4>

                        <select
                          className="form-control"
                          name="status"
                          onChange={handleChange}
                        >
                          <option value="On Time">
                            On Time
                          </option>

                          <option value="Delayed">
                            Delayed
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>

                        </select>

                      </div>

                      {/* BUTTONS */}

                      <div className="text-right">

                        <Link
                          to="/admin/flights"
                          className="btn btn-secondary mr-2"
                        >
                          Cancel
                        </Link>

                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          Save Flight
                        </button>

                      </div>

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

export default AddFlightData;




