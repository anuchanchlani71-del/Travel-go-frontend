import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddBus() {

  const navigate = useNavigate();

  const [busData, setBusData] = useState({

    // BASIC INFO
    busName: "",
    busNumber: "",
    operatorName: "",
    busType: "",

    // FROM
    fromCity: "",
    fromState: "",
    fromBusStand: "",
    fromCode: "",

    // TO
    toCity: "",
    toState: "",
    toBusStand: "",
    toCode: "",

    // TIMING
    departureTime: "",
    arrivalTime: "",
    duration: "",

    // SEATS
    totalSeats: "",
    availableSeats: "",

    // PRICE
    price: "",
    tax: "",
    discount: "",

    // CANCELLATION
    refundable: "true",
    cancellationCharge: "",

    // STATUS
    status: "Active",

    // STOPS
    stops: [
      {
        city: "",
        busStand: "",
        arrivalTime: "",
        departureTime: "",
      },
    ],

    // DROPPING POINTS
    droppingPoints: [
      {
        location: "",
        address: "",
        time: "",
      },
    ],

    // SEAT LAYOUT
    seatLayout: [
      {
        seatNumber: "",
        seatType: "",
        gender: "Any",
        price: "",
      },
    ],

    // AMENITIES
    // amenities: [
    //   {
    //     name: "",
    //   },
    // ],
    amenities: [
      {
        name: "",
        included: "true",
      },
    ],
    // IMAGES
    images: [""],

  });

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setBusData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  // ================= STOPS =================

  const handleStopChange = (index, field, value) => {

    const updated = [...busData.stops];

    updated[index][field] = value;

    setBusData({
      ...busData,
      stops: updated,
    });

  };

  const addStop = () => {

    setBusData({
      ...busData,
      stops: [
        ...busData.stops,
        {
          city: "",
          busStand: "",
          arrivalTime: "",
          departureTime: "",
        },
      ],
    });

  };

  const removeStop = (index) => {

    const updated = busData.stops.filter(
      (_, i) => i !== index
    );

    setBusData({
      ...busData,
      stops: updated,
    });

  };

  // ================= DROPPING POINTS =================

  const handleDropChange = (index, field, value) => {

    const updated = [...busData.droppingPoints];

    updated[index][field] = value;

    setBusData({
      ...busData,
      droppingPoints: updated,
    });

  };

  const addDropPoint = () => {

    setBusData({
      ...busData,
      droppingPoints: [
        ...busData.droppingPoints,
        {
          location: "",
          address: "",
          time: "",
        },
      ],
    });

  };

  const removeDropPoint = (index) => {

    const updated = busData.droppingPoints.filter(
      (_, i) => i !== index
    );

    setBusData({
      ...busData,
      droppingPoints: updated,
    });

  };

  // ================= SEAT LAYOUT =================

  const handleSeatChange = (index, field, value) => {

    const updated = [...busData.seatLayout];

    updated[index][field] = value;

    setBusData({
      ...busData,
      seatLayout: updated,
    });

  };

  const addSeat = () => {

    setBusData({
      ...busData,
      seatLayout: [
        ...busData.seatLayout,
        {
          seatNumber: "",
          seatType: "",
          gender: "Any",
          price: "",
        },
      ],
    });

  };

  const removeSeat = (index) => {

    const updated = busData.seatLayout.filter(
      (_, i) => i !== index
    );

    setBusData({
      ...busData,
      seatLayout: updated,
    });

  };

  // ================= AMENITIES =================

  // const handleAmenityChange = (index, value) => {

  //   const updated = [...busData.amenities];

  //   updated[index].name = value;

  //   setBusData({
  //     ...busData,
  //     amenities: updated,
  //   });

  // };
  const handleAmenityChange = (
    index,
    field,
    value
  ) => {

    const updated = [...busData.amenities];

    updated[index][field] = value;

    setBusData({
      ...busData,
      amenities: updated,
    });

  };

  // const addAmenity = () => {

  //   setBusData({
  //     ...busData,
  //     amenities: [
  //       ...busData.amenities,
  //       {
  //         name: "",
  //       },
  //     ],
  //   });

  // };
  const addAmenity = () => {

    setBusData({
      ...busData,
      amenities: [
        ...busData.amenities,
        {
          name: "",
          included: "true",
        },
      ],
    });

  };

  const removeAmenity = (index) => {

    const updated = busData.amenities.filter(
      (_, i) => i !== index
    );

    setBusData({
      ...busData,
      amenities: updated,
    });

  };

  // ================= IMAGES =================

  const handleImageChange = (index, value) => {

    const updated = [...busData.images];

    updated[index] = value;

    setBusData({
      ...busData,
      images: updated,
    });

  };

  const addImage = () => {

    setBusData({
      ...busData,
      images: [...busData.images, ""],
    });

  };

  const removeImage = (index) => {

    const updated = busData.images.filter(
      (_, i) => i !== index
    );

    setBusData({
      ...busData,
      images: updated,
    });

  };

  // ================= SUBMIT =================

const handleSubmit = async (e) => {
  const operatorId=localStorage.getItem("sellerId")
  e.preventDefault();

  const formData = new FormData();

  // ================= BASIC =================
  formData.append("busName", busData.busName);
  formData.append("busNumber", busData.busNumber);
  formData.append("operatorName", busData.operatorName);
  formData.append("operatorId",operatorId)
  formData.append("busType", busData.busType);

  // ================= FROM (nested) =================
  formData.append("from[city]", busData.fromCity);
  formData.append("from[state]", busData.fromState);
  formData.append("from[busStand]", busData.fromBusStand);
  formData.append("from[code]", busData.fromCode);

  // ================= TO (nested) =================
  formData.append("to[city]", busData.toCity);
  formData.append("to[state]", busData.toState);
  formData.append("to[busStand]", busData.toBusStand);
  formData.append("to[code]", busData.toCode);

  // ================= TIMING =================
  formData.append("departureTime", busData.departureTime);
  formData.append("arrivalTime", busData.arrivalTime);
  formData.append("duration", Number(busData.duration));

  // ================= SEATS =================
  formData.append("totalSeats", Number(busData.totalSeats));
  formData.append("availableSeats", Number(busData.availableSeats));

  // ================= PRICE =================
  formData.append("price", Number(busData.price));
  formData.append("tax", Number(busData.tax));
  formData.append("discount", Number(busData.discount));

  // ================= STOPS =================
  busData.stops.forEach((stop, i) => {
    formData.append(`stops[${i}][city]`, stop.city);
    formData.append(`stops[${i}][busStand]`, stop.busStand);
    formData.append(`stops[${i}][arrivalTime]`, stop.arrivalTime);
    formData.append(`stops[${i}][departureTime]`, stop.departureTime);
  });

  // ================= DROPPING POINTS =================
  busData.droppingPoints.forEach((drop, i) => {
    formData.append(`droppingPoints[${i}][location]`, drop.location);
    formData.append(`droppingPoints[${i}][address]`, drop.address);
    formData.append(`droppingPoints[${i}][time]`, drop.time);
  });

  // ================= SEAT LAYOUT =================
  busData.seatLayout.forEach((seat, i) => {
    formData.append(`seatLayout[${i}][seatNumber]`, seat.seatNumber);
    formData.append(`seatLayout[${i}][seatType]`, seat.seatType);
    formData.append(`seatLayout[${i}][gender]`, seat.gender);
    formData.append(`seatLayout[${i}][price]`, seat.price);
  });

  // ================= AMENITIES =================
  busData.amenities.forEach((item, i) => {
    formData.append(`amenities[${i}][name]`, item.name);
    formData.append(`amenities[${i}][included]`, item.included);
  });

  // ================= IMAGES =================
  busData.images.forEach((img) => {
    formData.append("images", img);
  });

  // ================= POLICY =================
  formData.append("cancellationPolicy[refundable]", busData.refundable);
  formData.append(
    "cancellationPolicy[cancellationCharge]",
    busData.cancellationCharge
  );

  // ================= STATUS =================
  formData.append("status", busData.status);

  try {
    await axios.post(
      "http://localhost:5000/admin/api/v1/registerBus",
      formData
    );

  toast.success("Bus Added Successfully");
    navigate("/admin/bus");

  } catch (err) {
    console.log(err);
   toast.error("Error Adding Bus");
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
            <h1>Add Bus</h1>
          </div>

        </div>

        <div className="content">

          <div className="container-fluid">

            <div className="card card-primary">

              <div className="card-body">

                <form onSubmit={handleSubmit}>

                  {/* BASIC INFO */}

                  <h4>Basic Info</h4>

                  <div className="row">

                    <div className="col-md-4">
                      <label>Bus Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="busName"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label>Bus Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="busNumber"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label>Operator Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="operatorName"
                        onChange={handleChange}
                      />
                    </div>

                  </div>

                  {/* BUS TYPE */}

                  <div className="mt-4">

                    <label>Bus Type</label>

                    <select
                      className="form-control"
                      name="busType"
                      onChange={handleChange}
                    >

                      <option value="">
                        Select Type
                      </option>

                      <option value="AC Sleeper">
                        AC Sleeper
                      </option>

                      <option value="Non-AC Sleeper">
                        Non-AC Sleeper
                      </option>

                      <option value="AC Seater">
                        AC Seater
                      </option>

                      <option value="Non-AC Seater">
                        Non-AC Seater
                      </option>

                      <option value="Volvo">
                        Volvo
                      </option>

                      <option value="Semi Sleeper">
                        Semi Sleeper
                      </option>

                    </select>

                  </div>

                  {/* FROM ROUTE */}

                  <h4 className="mt-4">
                    From Route
                  </h4>

                  <div className="row">

                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="City"
                        name="fromCity"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="State"
                        name="fromState"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Bus Stand"
                        name="fromBusStand"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Code"
                        name="fromCode"
                        onChange={handleChange}
                      />
                    </div>

                  </div>

                  {/* TO ROUTE */}

                  <h4 className="mt-4">
                    To Route
                  </h4>

                  <div className="row">

                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="City"
                        name="toCity"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="State"
                        name="toState"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Bus Stand"
                        name="toBusStand"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Code"
                        name="toCode"
                        onChange={handleChange}
                      />
                    </div>

                  </div>

                  {/* TIMING */}

                  <h4 className="mt-4">
                    Timing
                  </h4>

                  <div className="row">

                    <div className="col-md-4">
                      <label>Departure Time</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="departureTime"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label>Arrival Time</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="arrivalTime"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label>Duration</label>
                      <input
                        type="number"
                        className="form-control"
                        name="duration"
                        onChange={handleChange}
                      />
                    </div>

                  </div>

                  {/* SEATS */}

                  <h4 className="mt-4">
                    Seats Info
                  </h4>

                  <div className="row">

                    <div className="col-md-6">
                      <label>Total Seats</label>
                      <input
                        type="number"
                        className="form-control"
                        name="totalSeats"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label>Available Seats</label>
                      <input
                        type="number"
                        className="form-control"
                        name="availableSeats"
                        onChange={handleChange}
                      />
                    </div>

                  </div>

                  {/* PRICE */}

                  <h4 className="mt-4">
                    Pricing
                  </h4>

                  <div className="row">

                    <div className="col-md-4">
                      <label>Price</label>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label>Tax</label>
                      <input
                        type="number"
                        className="form-control"
                        name="tax"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4">
                      <label>Discount</label>
                      <input
                        type="number"
                        className="form-control"
                        name="discount"
                        onChange={handleChange}
                      />
                    </div>

                  </div>

                  {/* ================= STOPS ================= */}

                  <h4 className="mt-4">
                    Stops
                  </h4>

                  {
                    busData.stops.map((stop, index) => (

                      <div className="card p-3 mb-3" key={index}>

                        <div className="d-flex justify-content-between mb-3">

                          <h5>
                            Stop {index + 1}
                          </h5>

                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => removeStop(index)}
                          >
                            Remove
                          </button>

                        </div>

                        <div className="row">

                          <div className="col-md-3">

                            <input
                              type="text"
                              placeholder="City"
                              className="form-control"
                              value={stop.city}
                              onChange={(e) =>
                                handleStopChange(
                                  index,
                                  "city",
                                  e.target.value
                                )
                              }
                            />

                          </div>

                          <div className="col-md-3">

                            <input
                              type="text"
                              placeholder="Bus Stand"
                              className="form-control"
                              value={stop.busStand}
                              onChange={(e) =>
                                handleStopChange(
                                  index,
                                  "busStand",
                                  e.target.value
                                )
                              }
                            />

                          </div>

                          <div className="col-md-3">

                            <input
                              type="datetime-local"
                              className="form-control"
                              value={stop.arrivalTime}
                              onChange={(e) =>
                                handleStopChange(
                                  index,
                                  "arrivalTime",
                                  e.target.value
                                )
                              }
                            />

                          </div>

                          <div className="col-md-3">

                            <input
                              type="datetime-local"
                              className="form-control"
                              value={stop.departureTime}
                              onChange={(e) =>
                                handleStopChange(
                                  index,
                                  "departureTime",
                                  e.target.value
                                )
                              }
                            />

                          </div>

                        </div>

                      </div>

                    ))
                  }

                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={addStop}
                  >
                    + Add Stop
                  </button>

                  {/* ================= DROPPING POINTS ================= */}

                  <h4 className="mt-4">
                    Dropping Points
                  </h4>

                  {
                    busData.droppingPoints.map((drop, index) => (

                      <div className="card p-3 mb-3" key={index}>

                        <div className="d-flex justify-content-between mb-3">

                          <h5>
                            Point {index + 1}
                          </h5>

                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => removeDropPoint(index)}
                          >
                            Remove
                          </button>

                        </div>

                        <div className="row">

                          <div className="col-md-4">

                            <input
                              type="text"
                              placeholder="Location"
                              className="form-control"
                              value={drop.location}
                              onChange={(e) =>
                                handleDropChange(
                                  index,
                                  "location",
                                  e.target.value
                                )
                              }
                            />

                          </div>

                          <div className="col-md-4">

                            <input
                              type="text"
                              placeholder="Address"
                              className="form-control"
                              value={drop.address}
                              onChange={(e) =>
                                handleDropChange(
                                  index,
                                  "address",
                                  e.target.value
                                )
                              }
                            />

                          </div>

                          <div className="col-md-4">

                            <input
                              type="datetime-local"
                              className="form-control"
                              value={drop.time}
                              onChange={(e) =>
                                handleDropChange(
                                  index,
                                  "time",
                                  e.target.value
                                )
                              }
                            />

                          </div>

                        </div>

                      </div>

                    ))
                  }

                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={addDropPoint}
                  >
                    + Add Dropping Point
                  </button>

                  {/* ================= SEAT LAYOUT ================= */}

                  <h4 className="mt-4">
                    Seat Layout
                  </h4>

                  {
                    busData.seatLayout.map((seat, index) => (

                      <div className="card p-3 mb-3" key={index}>

                        <div className="d-flex justify-content-between mb-3">

                          <h5>
                            Seat {index + 1}
                          </h5>

                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => removeSeat(index)}
                          >
                            Remove
                          </button>

                        </div>

                        <div className="row">

                          <div className="col-md-3">

                            <input
                              type="text"
                              placeholder="Seat Number"
                              className="form-control"
                              value={seat.seatNumber}
                              onChange={(e) =>
                                handleSeatChange(
                                  index,
                                  "seatNumber",
                                  e.target.value
                                )
                              }
                            />

                          </div>

                          <div className="col-md-3">

                            <select
                              className="form-control"
                              value={seat.seatType}
                              onChange={(e) =>
                                handleSeatChange(
                                  index,
                                  "seatType",
                                  e.target.value
                                )
                              }
                            >

                              <option value="">
                                Select Seat Type
                              </option>

                              <option value="Sleeper">
                                Sleeper
                              </option>

                              <option value="Seater">
                                Seater
                              </option>

                            </select>

                          </div>

                          <div className="col-md-3">

                            <select
                              className="form-control"
                              value={seat.gender}
                              onChange={(e) =>
                                handleSeatChange(
                                  index,
                                  "gender",
                                  e.target.value
                                )
                              }
                            >

                              <option value="Any">
                                Any
                              </option>

                              <option value="Male">
                                Male
                              </option>

                              <option value="Female">
                                Female
                              </option>

                            </select>

                          </div>

                          <div className="col-md-3">

                            <input
                              type="number"
                              placeholder="Seat Price"
                              className="form-control"
                              value={seat.price}
                              onChange={(e) =>
                                handleSeatChange(
                                  index,
                                  "price",
                                  e.target.value
                                )
                              }
                            />

                          </div>

                        </div>

                      </div>

                    ))
                  }

                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={addSeat}
                  >
                    + Add Seat
                  </button>

                  {/* ================= AMENITIES =================

<h4 className="mt-4">
  Amenities
</h4>

{
  busData.amenities.map((item, index) => (

    <div
      className="d-flex mb-3"
      key={index}
    >

      <input
        type="text"
        className="form-control"
        placeholder="Amenity Name"
        value={item.name}
        onChange={(e) =>
          handleAmenityChange(
            index,
            e.target.value
          )
        }
      />

      <button
        type="button"
        className="btn btn-danger ml-2"
        onClick={() => removeAmenity(index)}
      >
        Remove
      </button>

    </div>

  ))
}

<button
  type="button"
  className="btn btn-success"
  onClick={addAmenity}
>
  + Add Amenity
</button> */}



                  {/* ================= AMENITIES ================= */}

                  <h4 className="mt-4">
                    Amenities
                  </h4>

                  {
                    busData.amenities.map((item, index) => (

                      <div
                        className="card p-3 mb-3"
                        key={index}
                      >

                        <div className="d-flex justify-content-between mb-3">

                          <h5>
                            Amenity {index + 1}
                          </h5>

                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => removeAmenity(index)}
                          >
                            Remove
                          </button>

                        </div>

                        <div className="row">

                          <div className="col-md-6">

                            <input
                              type="text"
                              className="form-control"
                              placeholder="Amenity Name"
                              value={item.name}
                              onChange={(e) =>
                                handleAmenityChange(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                            />

                          </div>

                          <div className="col-md-6">

                            <select
                              className="form-control"
                              value={item.included}
                              onChange={(e) =>
                                handleAmenityChange(
                                  index,
                                  "included",
                                  e.target.value
                                )
                              }
                            >

                              <option value="true">
                                Included
                              </option>

                              <option value="false">
                                Not Included
                              </option>

                            </select>

                          </div>

                        </div>

                      </div>

                    ))
                  }

                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={addAmenity}
                  >
                    + Add Amenity
                  </button>
                  {/* ================= IMAGES ================= */}

                  <h4 className="mt-4">
                    Bus Images
                  </h4>

                  {
                    busData.images.map((img, index) => (

                      <div
                        className="d-flex mb-3 align-items-center"
                        key={index}
                      >

                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageChange(
                              index,
                              e.target.files[0]
                            )
                          }
                        />

                        <button
                          type="button"
                          className="btn btn-danger ml-2"
                          onClick={() => removeImage(index)}
                        >
                          Remove
                        </button>

                      </div>

                    ))
                  }

                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={addImage}
                  >
                    + Add Image
                  </button>
                  {/* CANCELLATION */}

                  <h4 className="mt-4">
                    Cancellation Policy
                  </h4>

                  <div className="row">

                    <div className="col-md-6">

                      <label>Refundable</label>

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

                    <div className="col-md-6">

                      <label>Cancellation Charge</label>

                      <input
                        type="number"
                        className="form-control"
                        name="cancellationCharge"
                        onChange={handleChange}
                      />

                    </div>

                  </div>

                  {/* STATUS */}

                  <h4 className="mt-4">
                    Status
                  </h4>

                  <select
                    className="form-control"
                    name="status"
                    onChange={handleChange}
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="InActive">
                      Inactive
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>

                    <option value="Delayed">
                      Delayed
                    </option>

                  </select>

                  {/* SUBMIT */}

                  <div className="text-right mt-4">

                    <button className="btn btn-primary">

                      Add Bus

                    </button>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default AddBus;