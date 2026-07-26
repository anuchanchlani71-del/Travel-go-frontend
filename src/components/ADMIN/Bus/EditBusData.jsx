


import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function EditBus() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [busData, setBusData] = useState({});
  const [stops, setStops] = useState([]);
  const [droppingPoints, setDroppingPoints] = useState([]);
  const [seatLayout, setSeatLayout] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusData({ ...busData, [name]: value });
  };

  // ================= GET BUS =================
  const getBusById = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/api/v1/findOneBus/${id}`
      );

      const b = res.data.data;

      setBusData({
        busName: b.busName || "",
        busNumber: b.busNumber || "",
        operatorName: b.operatorName || "",
        busType: b.busType || "",
        status: b.status || "Active",

        fromCity: b.from?.city || "",
        fromState: b.from?.state || "",
        fromBusStand: b.from?.busStand || "",
        fromCode: b.from?.code || "",

        toCity: b.to?.city || "",
        toState: b.to?.state || "",
        toBusStand: b.to?.busStand || "",
        toCode: b.to?.code || "",

        departureTime: b.departureTime
          ? new Date(b.departureTime).toISOString().slice(0, 16)
          : "",

        arrivalTime: b.arrivalTime
          ? new Date(b.arrivalTime).toISOString().slice(0, 16)
          : "",

        duration: b.duration || "",

        totalSeats: b.totalSeats || "",
        availableSeats: b.availableSeats || "",

        price: b.price || "",
        tax: b.tax || "",
        discount: b.discount || "",


        cancellationCharge:
          b.cancellationPolicy?.cancellationCharge || "",
        refundable: String(b.cancellationPolicy?.refundable ?? true)
      });
      setStops(b.stops || []);
      setDroppingPoints(b.droppingPoints || []);
      setSeatLayout(b.seatLayout || []);
      setAmenities(b.amenities || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBusById();
  }, []);

  // ================= UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      busName: busData.busName,
      busNumber: busData.busNumber,
      operatorName: busData.operatorName,
      busType: busData.busType,
      status: busData.status,

      from: {
        city: busData.fromCity,
        state: busData.fromState,
        busStand: busData.fromBusStand,
        code: busData.fromCode
      },

      to: {
        city: busData.toCity,
        state: busData.toState,
        busStand: busData.toBusStand,
        code: busData.toCode
      },
      stops: stops.map(({ _id, ...rest }) => rest),
      droppingPoints: droppingPoints.map(({ _id, ...rest }) => rest),
      seatLayout: seatLayout.map(({ _id, ...rest }) => rest),
      amenities: amenities.map(({ _id, ...rest }) => rest),
      departureTime: busData.departureTime,
      arrivalTime: busData.arrivalTime,
      duration: Number(busData.duration),

      totalSeats: Number(busData.totalSeats),
      availableSeats: Number(busData.availableSeats),

      price: Number(busData.price),
      tax: Number(busData.tax),
      discount: Number(busData.discount),

      cancellationPolicy: {
        refundable: busData.refundable === "true",
        cancellationCharge: Number(busData.cancellationCharge)
      }
    };

    try {
      await axios.post(
        `http://localhost:5000/admin/api/v1/updateBusData/${id}`,
        payload
      );

    toast.success("Bus Updated Successfully");

setTimeout(() => {
  navigate("/admin/bus");
}, 1500);
    } catch (err) {
      console.log(err);
     toast.error("Update Failed");
    }
  };

  return (
    <div className="wrapper">
      <Header />
      <SideMenu />
          <Toaster />

      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">Edit Bus</h1>
          </div>
        </div>

        <div className="content">
          <div className="container-fluid">

            <div className="row justify-content-center">
              <div className="col-md-10">

                <div className="card card-primary shadow">
                  <div className="card-header">
                    <h3 className="card-title">
                      Bus Information
                    </h3>
                  </div>

                  <div className="card-body">
                    <form onSubmit={handleSubmit}>

                      {/* BASIC DETAILS */}
                      <div className="border rounded p-3 mb-4" style={{ background: "#f8f9fa" }}>
                        <h4 className="mb-3"><b>Basic Bus Details</b></h4>

                        <div className="row">
                          <div className="col-md-4">
                            <label>Bus Name</label>
                            <input className="form-control" name="busName" value={busData.busName || ""} onChange={handleChange} />
                          </div>

                          <div className="col-md-4">
                            <label>Bus Number</label>
                            <input className="form-control" name="busNumber" value={busData.busNumber || ""} onChange={handleChange} />
                          </div>

                          <div className="col-md-4">
                            <label>Operator Name</label>
                            <input className="form-control" name="operatorName" value={busData.operatorName || ""} onChange={handleChange} />
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-md-4">
                            <label>Bus Type</label>
                            <select className="form-control" name="busType" value={busData.busType || ""} onChange={handleChange}>
                              <option value="">Select</option>
                              <option>AC Sleeper</option>
                              <option>Non-AC Sleeper</option>
                              <option>AC Seater</option>
                              <option>Volvo</option>
                            </select>
                          </div>

                          <div className="col-md-4">
                            <label>Status</label>
                            <select className="form-control" name="status" value={busData.status || ""} onChange={handleChange}>
                              <option>Active</option>
                              <option>Inactive</option>
                              <option>Cancelled</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* FROM / TO */}
                      <div className="border rounded p-3 mb-4" style={{ background: "#f8f9fa" }}>
                        <h4><b>Route Information</b></h4>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="border p-3 bg-white rounded">
                              <h5>From</h5>

                              <label>City</label>
                              <input className="form-control mb-2" name="fromCity" value={busData.fromCity || ""} onChange={handleChange} />

                              <label>State</label>
                              <input className="form-control mb-2" name="fromState" value={busData.fromState || ""} onChange={handleChange} />

                              <label>Bus Stand</label>
                              <input className="form-control mb-2" name="fromBusStand" value={busData.fromBusStand || ""} onChange={handleChange} />

                              <label>Code</label>
                              <input className="form-control" name="fromCode" value={busData.fromCode || ""} onChange={handleChange} />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="border p-3 bg-white rounded">
                              <h5>To</h5>

                              <label>City</label>
                              <input className="form-control mb-2" name="toCity" value={busData.toCity || ""} onChange={handleChange} />

                              <label>State</label>
                              <input className="form-control mb-2" name="toState" value={busData.toState || ""} onChange={handleChange} />

                              <label>Bus Stand</label>
                              <input className="form-control mb-2" name="toBusStand" value={busData.toBusStand || ""} onChange={handleChange} />

                              <label>Code</label>
                              <input className="form-control" name="toCode" value={busData.toCode || ""} onChange={handleChange} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* TIMING */}
                      <div className="border rounded p-3 mb-4" style={{ background: "#f8f9fa" }}>
                        <h4><b>Timing</b></h4>

                        <div className="row">
                          <div className="col-md-4">
                            <label>Departure</label>
                            <input type="datetime-local" className="form-control" name="departureTime" value={busData.departureTime || ""} onChange={handleChange} />
                          </div>

                          <div className="col-md-4">
                            <label>Arrival</label>
                            <input type="datetime-local" className="form-control" name="arrivalTime" value={busData.arrivalTime || ""} onChange={handleChange} />
                          </div>

                          <div className="col-md-4">
                            <label>Duration</label>
                            <input type="number" className="form-control" name="duration" value={busData.duration || ""} onChange={handleChange} />
                          </div>
                        </div>
                      </div>

                      {/* SEATS */}
                      <div className="border rounded p-3 mb-4" style={{ background: "#f8f9fa" }}>
                        <h4><b>Seats</b></h4>

                        <div className="row">
                          <div className="col-md-6">
                            <label>Total Seats</label>
                            <input className="form-control" name="totalSeats" value={busData.totalSeats || ""} onChange={handleChange} />
                          </div>

                          <div className="col-md-6">
                            <label>Available Seats</label>
                            <input className="form-control" name="availableSeats" value={busData.availableSeats || ""} onChange={handleChange} />
                          </div>
                        </div>
                      </div>

                      {/* PRICING */}
                      <div className="border rounded p-3 mb-4" style={{ background: "#f8f9fa" }}>
                        <h4><b>Pricing</b></h4>

                        <div className="row">
                          <div className="col-md-4">
                            <label>Price</label>
                            <input className="form-control" name="price" value={busData.price || ""} onChange={handleChange} />
                          </div>

                          <div className="col-md-4">
                            <label>Tax</label>
                            <input className="form-control" name="tax" value={busData.tax || ""} onChange={handleChange} />
                          </div>

                          <div className="col-md-4">
                            <label>Discount</label>
                            <input className="form-control" name="discount" value={busData.discount || ""} onChange={handleChange} />
                          </div>
                        </div>
                      </div>
                      <div className="border rounded p-3 mb-4" style={{ background: "#f8f9fa" }}>
                        <h4><b>Stops</b></h4>

                        {stops.map((s, i) => (
                          <div key={i} className="border p-3 bg-white mb-3 rounded">

                            <div className="row">
                              <div className="col-md-3">
                                <label>City</label>
                                <input className="form-control"
                                  value={s.city}
                                  onChange={(e) => {
                                    const arr = [...stops];
                                    arr[i].city = e.target.value;
                                    setStops(arr);
                                  }}
                                />
                              </div>

                              <div className="col-md-3">
                                <label>Bus Stand</label>
                                <input className="form-control"
                                  value={s.busStand}
                                  onChange={(e) => {
                                    const arr = [...stops];
                                    arr[i].busStand = e.target.value;
                                    setStops(arr);
                                  }}
                                />
                              </div>

                              <div className="col-md-3">
                                <label>Arrival</label>
                                <input type="datetime-local" className="form-control"
                                  value={s.arrivalTime}
                                  onChange={(e) => {
                                    const arr = [...stops];
                                    arr[i].arrivalTime = e.target.value;
                                    setStops(arr);
                                  }}
                                />
                              </div>

                              <div className="col-md-3">
                                <label>Departure</label>
                                <input type="datetime-local" className="form-control"
                                  value={s.departureTime}
                                  onChange={(e) => {
                                    const arr = [...stops];
                                    arr[i].departureTime = e.target.value;
                                    setStops(arr);
                                  }}
                                />
                              </div>
                            </div>

                            <button
                              type="button"
                              className="btn btn-danger btn-sm mt-2"
                              onClick={() => setStops(stops.filter((_, idx) => idx !== i))}
                            >
                              Remove Stop
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            setStops([
                              ...stops,
                              { city: "", busStand: "", arrivalTime: "", departureTime: "" }
                            ])
                          }
                        >
                          + Add Stop
                        </button>
                      </div>
                      <div className="border rounded p-3 mb-4" style={{ background: "#f8f9fa" }}>
                        <h4><b>Dropping Points</b></h4>

                        {droppingPoints.map((d, i) => (
                          <div key={i} className="border p-3 bg-white mb-3 rounded row">

                            <div className="col-md-4">
                              <label>Location</label>
                              <input className="form-control"
                                value={d.location}
                                onChange={(e) => {
                                  const arr = [...droppingPoints];
                                  arr[i].location = e.target.value;
                                  setDroppingPoints(arr);
                                }}
                              />
                            </div>

                            <div className="col-md-4">
                              <label>Address</label>
                              <input className="form-control"
                                value={d.address}
                                onChange={(e) => {
                                  const arr = [...droppingPoints];
                                  arr[i].address = e.target.value;
                                  setDroppingPoints(arr);
                                }}
                              />
                            </div>

                            <div className="col-md-4">
                              <label>Time</label>
                              <input type="datetime-local" className="form-control"
                                value={d.time}
                                onChange={(e) => {
                                  const arr = [...droppingPoints];
                                  arr[i].time = e.target.value;
                                  setDroppingPoints(arr);
                                }}
                              />
                            </div>

                            <button
                              type="button"
                              className="btn btn-danger btn-sm mt-2"
                              onClick={() =>
                                setDroppingPoints(droppingPoints.filter((_, idx) => idx !== i))
                              }
                            >
                              Remove
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            setDroppingPoints([
                              ...droppingPoints,
                              { location: "", address: "", time: "" }
                            ])
                          }
                        >
                          + Add Dropping Point
                        </button>
                      </div>
                      <div className="border rounded p-3 mb-4" style={{ background: "#f8f9fa" }}>
                        <h4><b>Seat Layout</b></h4>

                        {seatLayout.map((seat, i) => (
                          <div key={i} className="border p-3 bg-white mb-3 rounded row">

                            <div className="col-md-3">
                              <label>Seat No</label>
                              <input className="form-control"
                                value={seat.seatNumber}
                                onChange={(e) => {
                                  const arr = [...seatLayout];
                                  arr[i].seatNumber = e.target.value;
                                  setSeatLayout(arr);
                                }}
                              />
                            </div>

                            <div className="col-md-3">
                              <label>Type</label>
                              <input className="form-control"
                                value={seat.seatType}
                                onChange={(e) => {
                                  const arr = [...seatLayout];
                                  arr[i].seatType = e.target.value;
                                  setSeatLayout(arr);
                                }}
                              />
                            </div>

                            <div className="col-md-3">
                              <label>Price</label>
                              <input className="form-control"
                                value={seat.price}
                                onChange={(e) => {
                                  const arr = [...seatLayout];
                                  arr[i].price = e.target.value;
                                  setSeatLayout(arr);
                                }}
                              />
                            </div>

                            <div className="col-md-3">
                              <label>Booked</label>
                              <select className="form-control"
                                value={seat.isBooked}
                                onChange={(e) => {
                                  const arr = [...seatLayout];
                                  arr[i].isBooked = e.target.value === "true";
                                  setSeatLayout(arr);
                                }}
                              >
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                              </select>
                            </div>

                            <button
                              type="button"
                              className="btn btn-danger btn-sm mt-2"
                              onClick={() =>
                                setSeatLayout(seatLayout.filter((_, idx) => idx !== i))
                              }
                            >
                              Remove Seat
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            setSeatLayout([
                              ...seatLayout,
                              { seatNumber: "", seatType: "", price: "", isBooked: false }
                            ])
                          }
                        >
                          + Add Seat
                        </button>
                      </div>
                      <div className="border rounded p-3 mb-4" style={{ background: "#f8f9fa" }}>
                        <h4><b>Amenities</b></h4>

                        {amenities.map((a, i) => (
                          <div key={i} className="border p-3 bg-white mb-3 rounded row">

                            <div className="col-md-4">
                              <label>Name</label>
                              <input className="form-control"
                                value={a.name}
                                onChange={(e) => {
                                  const arr = [...amenities];
                                  arr[i].name = e.target.value;
                                  setAmenities(arr);
                                }}
                              />
                            </div>

                            <div className="col-md-4">
                              <label>Included</label>
                              <select className="form-control"
                                value={a.included}
                                onChange={(e) => {
                                  const arr = [...amenities];
                                  arr[i].included = e.target.value === "true";
                                  setAmenities(arr);
                                }}
                              >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                              </select>
                            </div>

                            <div className="col-md-4">
                              <label>Price</label>
                              <input className="form-control"
                                value={a.price}
                                onChange={(e) => {
                                  const arr = [...amenities];
                                  arr[i].price = e.target.value;
                                  setAmenities(arr);
                                }}
                              />
                            </div>

                            <button
                              type="button"
                              className="btn btn-danger btn-sm mt-2"
                              onClick={() =>
                                setAmenities(amenities.filter((_, idx) => idx !== i))
                              }
                            >
                              Remove
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            setAmenities([...amenities, { name: "", included: true, price: "" }])
                          }
                        >
                          + Add Amenity
                        </button>
                      </div>

                      {/* POLICY */}
                      <div className="border rounded p-3 mb-4" style={{ background: "#f8f9fa" }}>
                        <h4><b>Cancellation Policy</b></h4>

                        <div className="row">
                          <div className="col-md-6">
                            <label>Charge</label>
                            <input className="form-control" name="cancellationCharge" value={busData.cancellationCharge || ""} onChange={handleChange} />
                          </div>

                          <div className="col-md-6">
                            <label>Refundable</label>
                            <select className="form-control" name="refundable" value={busData.refundable || ""} onChange={handleChange}>
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* BUTTONS */}
                      <div className="text-right">
                        <Link to="/admin/bus" className="btn btn-secondary mr-2">Cancel</Link>
                        <button className="btn btn-primary">Update Bus</button>
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

export default EditBus;