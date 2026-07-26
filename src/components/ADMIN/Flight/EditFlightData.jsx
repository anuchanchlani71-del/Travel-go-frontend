



import Header from '../Header';
import Footer from '../Footer';
import SideMenu from '../SideMenu';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function EditFlightData() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [flightData, setFlightData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData({ ...flightData, [name]: value });
  };

  // ================= GET SINGLE FLIGHT =================
  const getFlightById = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/viewOneFlight/${id}`
      );

      const f = res.data.data;

      setFlightData({

        flightnumber: f.flightnumber || "",
        airline: f.airline || "",
        airlineCode: f.airlineCode || "",

        fromCity: f.from?.city || "",
        fromAirport: f.from?.airport || "",
        fromCode: f.from?.code || "",

        toCity: f.to?.city || "",
        toAirport: f.to?.airport || "",
        toCode: f.to?.code || "",

        // departuretime: f.departuretime || "",
        // arrivaltime: f.arrivaltime || "",
        departuretime: f.departuretime
  ? new Date(f.departuretime).toISOString().slice(0, 16)
  : "",

arrivaltime: f.arrivaltime
  ? new Date(f.arrivaltime).toISOString().slice(0, 16)
  : "",
        duration: f.duration || "",

        stopCity: f.stops?.[0]?.city || "",
        stopAirport: f.stops?.[0]?.airport || "",
        stopCode: f.stops?.[0]?.code || "",
        // stopArrivalTime: f.stops?.[0]?.arrivalTime || "",
        // stopDepartureTime: f.stops?.[0]?.departureTime || "",
        stopArrivalTime: f.stops?.[0]?.arrivalTime
  ? new Date(f.stops[0].arrivalTime).toISOString().slice(0,16)
  : "",

stopDepartureTime: f.stops?.[0]?.departureTime
  ? new Date(f.stops[0].departureTime).toISOString().slice(0,16)
  : "",

        economyPrice: f.classes?.economy?.price || "",
        economySeats: f.classes?.economy?.seats || "",
        economyAvailableSeats: f.classes?.economy?.availableSeats || "",
        economyAmenityName: f.classes?.economy?.amenities?.[0]?.name || "",
        economyAmenityIncluded: String(f.classes?.economy?.amenities?.[0]?.included ?? true),
        economyAmenityPrice: f.classes?.economy?.amenities?.[0]?.price || "",

        businessPrice: f.classes?.business?.price || "",
        businessSeats: f.classes?.business?.seats || "",
        businessAvailableSeats: f.classes?.business?.availableSeats || "",
        businessAmenityName: f.classes?.business?.amenities?.[0]?.name || "",
        businessAmenityIncluded: String(f.classes?.business?.amenities?.[0]?.included ?? true),
        businessAmenityPrice: f.classes?.business?.amenities?.[0]?.price || "",

        aircraftName: f.aircraft?.name || "",
        aircraftCode: f.aircraft?.code || "",

        checkIn: f.baggage?.checkIn || "",
        cabin: f.baggage?.cabin || "",

        refundable: String(f.fareRules?.refundable ?? true),
        cancellationFee: f.fareRules?.cancellationFee || "",
        rescheduleFee: f.fareRules?.rescheduleFee || "",

        status: f.status || "On Time"

      });

    } catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    getFlightById();
  }, []);

  // ================= UPDATE API =================
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

    departuretime: new Date(
  flightData.departuretime
).toISOString(),

arrivaltime: new Date(
  flightData.arrivaltime
).toISOString(),
     duration: Number(flightData.duration),
     stops: flightData.stopCity
  ? [
      {
        city: flightData.stopCity,
        airport: flightData.stopAirport,
        code: flightData.stopCode,

        arrivalTime: flightData.stopArrivalTime
          ? new Date(flightData.stopArrivalTime).toISOString()
          : null,

        departureTime: flightData.stopDepartureTime
          ? new Date(flightData.stopDepartureTime).toISOString()
          : null
      }
    ]
  : [],

 

      classes: {

        economy: {

          price:Number (flightData.economyPrice),
         seats: Number(flightData.economySeats),
availableSeats: Number(
  flightData.economyAvailableSeats
),
          amenities: flightData.economyAmenityName
            ? [
                {
                  name: flightData.economyAmenityName,
                  included: flightData.economyAmenityIncluded === "true",
                  price:Number (flightData.economyAmenityPrice)
                }
              ]
            : []

        },

        business: {

          price:Number (flightData.businessPrice),
         seats: Number(flightData.businessSeats),
availableSeats: Number(
  flightData.businessAvailableSeats
),
          amenities: flightData.businessAmenityName
            ? [
                {
                  name: flightData.businessAmenityName,
                  included: flightData.businessAmenityIncluded === "true",
                  price:Number( flightData.businessAmenityPrice)
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
        cancellationFee:Number (flightData.cancellationFee),
        rescheduleFee:Number (flightData.rescheduleFee)
      },

      createdBy: localStorage.getItem("sellerId")

    };

    try {

      await axios.put(
        `http://localhost:5000/admin/api/v1/updateflight/${id}`,
        payload
      );

 toast.success("Flight Updated Successfully");

setTimeout(() => {
  navigate("/admin/flight");
}, 1500);
    } catch (err) {
      console.log(err);
     toast.error("Update Failed");
    }

  };

  return (

    <div className="wrapper">
  <Toaster />
      <Header />
      <SideMenu />

      <div className="content-wrapper">

        {/* SAME HEADER AS ADD */}
        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">Edit Flight</h1>
          </div>
        </div>

        <div className="content">
          <div className="container-fluid">

            <div className="row justify-content-center">
              <div className="col-md-10">

                <div className="card card-primary shadow">

                  <div className="card-header">
                    <h3 className="card-title">Flight Information</h3>
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
                                value={flightData.flightnumber || ""}
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
                                value={flightData.airline || ""}
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
                                value={flightData.airlineCode || ""}
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
                                value={flightData.fromCity || ""}
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
                                value={flightData.fromAirport || ""}
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
                                value={flightData.fromCode || ""}
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
                                value={flightData.toCity || ""}
                              />
                              <label>
                                airport
                              </label>
                              <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Airport"
                                name="toAirport"
                                onChange={handleChange}
                                value={flightData.toAirport || ""}
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
                                value={flightData.toCode || ""}
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
                              value={flightData.departuretime || ""}
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
                              value={flightData.arrivaltime || ""}
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
                              value={flightData.duration || ""}
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
                              value={flightData.stopCity || ""}
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
                              value={flightData.stopAirport || ""}
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
                              value={flightData.stopCode || ""}
                            />
                          </div>

                        </div>

                        <div className="row mt-3">

                          <div className="col-md-6">
                            <label>
                              arrivaltime
                            </label>
                            <input
                              type="datetime-local"
                              className="form-control"
                              name="stopArrivalTime"
                              onChange={handleChange}
                              value={flightData.stopArrivalTime || ""}
                            />
                          </div>

                          <div className="col-md-6">
                            <label>
                              departuretime
                            </label>
                            <input
                              type="datetime-local"
                              className="form-control"
                              name="stopDepartureTime"
                              onChange={handleChange}
                              value={flightData.stopDepartureTime || ""}
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
                              value={flightData.economyPrice || ""}
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
                              value={flightData.economySeats || ""}
                            />
                          </div>

                          <div className="col-md-4">
                            <label>
                              availableSeats
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Available Seats"
                              name="economyAvailableSeats"
                              onChange={handleChange}
                              value={flightData.economyAvailableSeats || ""}
                            />
                          </div>

                        </div>

                        <div className="row mt-3">

                          <div className="col-md-4">
                            <label>
                              Amentity Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Amenity Name"
                              name="economyAmenityName"
                              onChange={handleChange}
                              value={flightData.economyAmenityName || ""}
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
                              value={flightData.economyAmenityIncluded || ""}
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
                              Amenity Price
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Amenity Price"
                              name="economyAmenityPrice"
                              onChange={handleChange}
                              value={flightData.economyAmenityPrice || ""}
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
                              value={flightData.businessPrice || ""}
                            />
                          </div>

                          <div className="col-md-4">
                            <label>
                              Seats
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Seats"
                              name="businessSeats"
                              onChange={handleChange}
                              value={flightData.businessSeats || ""}
                            />
                          </div>

                          <div className="col-md-4">
                            <label>
                              availableSeats
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Available Seats"
                              name="businessAvailableSeats"
                              onChange={handleChange}
                              value={flightData.businessAvailableSeats || ""}
                            />
                          </div>

                        </div>

                        <div className="row mt-3">

                          <div className="col-md-4">
                            <label>
                              Amenity Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Amenity Name"
                              name="businessAmenityName"
                              onChange={handleChange}
                              value={flightData.businessAmenityName || ""}
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
                              value={flightData.businessAmenityIncluded || ""}
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
                              Amenity Price
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Amenity Price"
                              name="businessAmenityPrice"
                              onChange={handleChange}
                              value={flightData.businessAmenityPrice || ""}
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
                              Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Aircraft Name"
                              name="aircraftName"
                              onChange={handleChange}
                              value={flightData.aircraftName || ""}
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
                              value={flightData.aircraftCode || ""}
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
                              checkIn
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Check-In Baggage"
                              name="checkIn"
                              onChange={handleChange}
                              value={flightData.checkIn || ""}
                            />
                          </div>

                          <div className="col-md-6">
                            <label>
                              cabin
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Cabin Baggage"
                              name="cabin"
                              onChange={handleChange}
                              value={flightData.cabin || ""}
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
                            <label>
                              select
                            </label>

                            <select
                              className="form-control"
                              name="refundable"
                              onChange={handleChange}
                              value={flightData.refundable || ""}
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
                            <label>
                              cancellationFee
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Cancellation Fee"
                              name="cancellationFee"
                              onChange={handleChange}
                              value={flightData.cancellationFee || ""}
                            />
                          </div>

                          <div className="col-md-4">
                            <label>
                              refundablefee
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Reschedule Fee"
                              name="rescheduleFee"
                              onChange={handleChange}
                              value={flightData.rescheduleFee || ""}
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
                        <label>
                          select
                        </label>

                        <select
                          className="form-control"
                          name="status"
                          onChange={handleChange}
                          value={flightData.status || ""}
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
                          to="/admin/flight"
                          className="btn btn-secondary mr-2"
                        >
                          Cancel
                        </Link>

                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          Update Flight
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

export default EditFlightData;