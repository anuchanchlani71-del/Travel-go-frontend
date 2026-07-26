

import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


function AddCab() {

  const navigate = useNavigate();

  // ================= MAIN STATE =================
  const [formData, setFormData] = useState({
    cabName: "",
    operator: "",
    vehicleType: "",
    cabNumber: "",
    cabBrand: "",
    cabModel: "",
    cabColor: "",

    driverName: "",
    driverPhone: "",
    driverImage: null,

    driverExperience: "",

    seatingCapacity: "",
    luggageCapacity: "",
    city: "",
    baseFare: "",
    pricePerKm: "",
    pricePerMinute: "",

    airConditioned: true,
    wifiAvailable: false,
    musicAvailable: false,

    isActive: true,
    underMaintenance: false,

    vehicleModel: "",
    fuelType: "",

    cancellationPolicy: "",
    notes: "",

    cabImage: null,

    sellerId: localStorage.getItem("sellerId")
  });

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {

    const { name, value, type, checked, files } = e.target;

    if (type === "file") {

      setFormData({
        ...formData,
        [name]: files[0]
      });

    } else {

      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value
      });

    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = new FormData();

      payload.append("cabName", formData.cabName);
      payload.append("operator", formData.operator);
      payload.append("vehicleType", formData.vehicleType);
      payload.append("cabNumber", formData.cabNumber);

      payload.append("cabBrand", formData.cabBrand);
      payload.append("cabModel", formData.cabModel);
      payload.append("cabColor", formData.cabColor);

      payload.append("driverName", formData.driverName);
      payload.append("driverPhone", formData.driverPhone);

      payload.append("driverExperience", formData.driverExperience);

      payload.append("seatingCapacity", formData.seatingCapacity);
      payload.append("luggageCapacity", formData.luggageCapacity);
      payload.append("city", formData.city);
      payload.append("baseFare", formData.baseFare);
      payload.append("pricePerKm", formData.pricePerKm);
      payload.append("pricePerMinute", formData.pricePerMinute);

      payload.append("airConditioned", formData.airConditioned);
      payload.append("wifiAvailable", formData.wifiAvailable);
      payload.append("musicAvailable", formData.musicAvailable);

      payload.append("isActive", formData.isActive);
      payload.append("underMaintenance", formData.underMaintenance);

      payload.append("vehicleModel", formData.vehicleModel);
      payload.append("fuelType", formData.fuelType);

      payload.append("cancellationPolicy", formData.cancellationPolicy);
      payload.append("notes", formData.notes);

      payload.append("sellerId", formData.sellerId);

      // ================= IMAGES =================

      if (formData.driverImage) {
        payload.append("driverImage", formData.driverImage);
      }

      if (formData.cabImage) {
        payload.append("cabImage", formData.cabImage);
      }

      const response = await axios.post(
        "http://localhost:5000/api/seller/addCab",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log(response.data);

      if (response.data.success) {
  toast.success("Cab Added Successfully");

        navigate("/admin/cabs");

      } else {

       toast.error(response.data.message);

      }

    } catch (error) {

      console.log(error);

        toast.error(
    error.response?.data?.message ||
    "Something went wrong"
  );

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
            <h1>Add Cab</h1>
          </div>
        </div>

        <div className="content">
          <div className="container-fluid">

            <form onSubmit={handleSubmit}>

              {/* YOUR OLD UI SAME */}


              <h4>Basic Details</h4>

              <div className="row">

                <div className="col-md-6">  
                 <label>Cab Name</label>            
                   <input
                  className="form-control"
                  placeholder="Cab Name"
                  name="cabName"
                  value={formData.cabName}
                  onChange={handleChange}
                  required
                />
                </div>

                <div className="col-md-6">
                 <label>Operator</label>
                  <input
                    className="form-control"
                    placeholder="Operator"
                    name="operator"
                    value={formData.operator}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <br />

              <div className="row">

                <div className="col-md-4">

                      <label>Vehicle Type</label>
                  <select
                    className="form-control"
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    required
                  >
                    <option value="Mini">Mini</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Auto">Auto</option>
                    <option value="Bike">Bike</option>
                  </select>
                </div>

                <div className="col-md-6">
                      <label>fuel Type</label>
                  <select
                    className="form-control"
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChange}
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                <div className="col-md-4">
                        <label>cab Number</label>
                  <input
                    className="form-control"
                    placeholder="Cab Number"
                    name="cabNumber"
                    value={formData.cabNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                  <div className="col-md-4">
                          <label>city</label>
                  <input
                    className="form-control"
                    placeholder="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                        <label>cab brand</label>
                  <input
                    className="form-control"
                    placeholder="Brand"
                    name="cabBrand"
                    value={formData.cabBrand}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <br />

              <div className="row">

                <div className="col-md-6">
                        <label>cab model</label>
                  <input
                    className="form-control"
                    placeholder="Model"
                    name="cabModel"
                    value={formData.cabModel}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                        <label>cab color</label>
                  <input
                    className="form-control"
                    placeholder="Color"
                    name="cabColor"
                    value={formData.cabColor}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <hr />

              {/* ===== DRIVER INFO ===== */}
              <h4>Driver Details</h4>

              <div className="row">

                <div className="col-md-6">
                        <label>driver name</label>
                  <input
                    className="form-control"
                    placeholder="Driver Name"
                    name="driverName"
                    value={formData.driverName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                        <label>driver phone</label>
                  <input
                    className="form-control"
                    placeholder="Driver Phone"
                    name="driverPhone"
                    value={formData.driverPhone}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <br />

              <div className="row">

                <div className="col-md-6">
                        <label>driver experience </label>
                  <input
                    className="form-control"
                    placeholder="Experience (Years)"
                    name="driverExperience"
                    value={formData.driverExperience}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <hr />

              {/* ===== CAPACITY ===== */}
              <h4>Capacity</h4>

              <div className="row">

                <div className="col-md-6">
                        <label>seating Capacity</label>
                  <input
                    className="form-control"
                    placeholder="Seating Capacity"
                    name="seatingCapacity"
                    value={formData.seatingCapacity}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                        <label>luggage Capacity</label>
                  <input
                    className="form-control"
                    placeholder="Luggage Capacity"
                    name="luggageCapacity"
                    value={formData.luggageCapacity}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <hr />

              {/* ===== PRICING ===== */}


              <h4>Pricing</h4>

              <div className="row">

                <div className="col-md-4">
                        <label>Pricing</label>
                  <input
                    className="form-control"
                    placeholder="Base Fare"
                    name="baseFare"
                    value={formData.baseFare}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                        <label>price per km</label>
                  <input
                    className="form-control"
                    placeholder="Price per KM"
                    name="pricePerKm"
                    value={formData.pricePerKm}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                        <label>price per minute</label>
                  <input
                    className="form-control"
                    placeholder="Price per Minute"
                    name="pricePerMinute"
                    value={formData.pricePerMinute}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <hr />

              {/* ===== FEATURES ===== */}
              <h4>Features</h4>

              <label>
                
                <input
                  type="checkbox"
                  name="airConditioned"
                  checked={formData.airConditioned}
                  onChange={handleChange}
                /> AC
              </label>

              <label className="ml-3">
                <input
                  type="checkbox"
                  name="wifiAvailable"
                  checked={formData.wifiAvailable}
                  onChange={handleChange}
                /> WiFi
              </label>

              <label className="ml-3">
                <input
                  type="checkbox"
                  name="musicAvailable"
                  checked={formData.musicAvailable}
                  onChange={handleChange}
                /> Music
              </label>

              <hr />

              {/* ===== EXTRA ===== */}
              <h4>Extra</h4>
      <label>cancellation Policy</label>
              <textarea
                className="form-control"
                placeholder="Cancellation Policy"
                name="cancellationPolicy"
                value={formData.cancellationPolicy}
                onChange={handleChange}
              />

              <br />
      <label>Notes</label>
              <textarea
              
                className="form-control"
                placeholder="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />

              <br />




              {/* DRIVER IMAGE */}
              <div className="form-group">
                <label>Driver Image</label>

                <input
                  type="file"
                  className="form-control"
                  name="driverImage"
                  onChange={handleChange}
                />
              </div>

              {/* CAB IMAGE */}
              <div className="form-group">
                <label>Cab Image</label>

                <input
                  type="file"
                  className="form-control"
                  name="cabImage"
                  onChange={handleChange}
                />
              </div>

              <br />

              <button className="btn btn-primary">
                Save Cab
              </button>

            </form>

          </div>
        </div>

      </div>

      <Footer />

    </div>
  );
}

export default AddCab;