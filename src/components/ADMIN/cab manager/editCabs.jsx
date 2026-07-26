


// ================= IMPORTS =================
import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";

import {
  Link,
  useNavigate,
  useSearchParams
} from "react-router-dom";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function EditCab() {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const _id = searchParams.get("_id");
  console.log("_id",_id)

  // ================= MAIN FORM STATE =================
  const [formData, setFormData] = useState({

    cabName: "",
    operator: "",
    vehicleType: "",
    cabNumber: "",
city:"",
    cabBrand: "",
    cabModel: "",
    cabColor: "",

    driverName: "",
    driverPhone: "",
    driverImage: "",

    driverExperience: "",
    driverRating: "",

    seatingCapacity: "",
    luggageCapacity: "",
   
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

    rating: "",

    cancellationPolicy: "",
    cabImage: "",
    notes: "",

    sellerId: ""
  });

  // ================= FETCH CAB =================
  const fetchCab = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/seller/getOnecab?_id=${_id}`
      );

      if (response.data.success) {

        const data = response.data.data;

        setFormData({

          cabName: data.cabName || "",
          operator: data.operator || "",
          vehicleType: data.vehicleType || "",
          cabNumber: data.cabNumber || "",
           city: data.city || "",

          cabBrand: data.cabBrand || "",
          cabModel: data.cabModel || "",
          cabColor: data.cabColor || "",

          driverName: data.driverName || "",
          driverPhone: data.driverPhone || "",
          driverImage: data.driverImage || "",

          driverExperience: data.driverExperience || "",
          driverRating: data.driverRating || "",

          seatingCapacity: data.seatingCapacity || "",
          luggageCapacity: data.luggageCapacity || "",

          baseFare: data.baseFare || "",
          pricePerKm: data.pricePerKm || "",
          pricePerMinute: data.pricePerMinute || "",

          airConditioned: data.airConditioned || false,
          wifiAvailable: data.wifiAvailable || false,
          musicAvailable: data.musicAvailable || false,

          isActive: data.isActive || false,
          underMaintenance: data.underMaintenance || false,

          vehicleModel: data.vehicleModel || "",
          fuelType: data.fuelType || "",

          rating: data.rating || "",

          cancellationPolicy:
            data.cancellationPolicy || "",

          cabImage: data.cabImage || "",

          notes: data.notes || "",

          sellerId: data.sellerId || ""
        });

      }

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {
    fetchCab();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
      files
    } = e.target;

    if (type === "file") {

      setFormData({
        ...formData,
        [name]: files[0]
      });

    } else {

      setFormData({
        ...formData,
        [name]:
          type === "checkbox"
            ? checked
            : value
      });

    }

  };

  // ================= UPDATE CAB =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = new FormData();

      payload.append("cabName", formData.cabName);
      payload.append("operator", formData.operator);
      payload.append("vehicleType", formData.vehicleType);
      payload.append("cabNumber", formData.cabNumber);
       payload.append("city", formData.city);

      payload.append("cabBrand", formData.cabBrand);
      payload.append("cabModel", formData.cabModel);
      payload.append("cabColor", formData.cabColor);

      payload.append("driverName", formData.driverName);
      payload.append("driverPhone", formData.driverPhone);

      payload.append(
        "driverExperience",
        formData.driverExperience
      );

      payload.append(
        "driverRating",
        formData.driverRating
      );

      payload.append(
        "seatingCapacity",
        formData.seatingCapacity
      );

      payload.append(
        "luggageCapacity",
        formData.luggageCapacity
      );

      payload.append(
        "baseFare",
        formData.baseFare
      );

      payload.append(
        "pricePerKm",
        formData.pricePerKm
      );

      payload.append(
        "pricePerMinute",
        formData.pricePerMinute
      );

      payload.append(
        "airConditioned",
        formData.airConditioned
      );

      payload.append(
        "wifiAvailable",
        formData.wifiAvailable
      );

      payload.append(
        "musicAvailable",
        formData.musicAvailable
      );

      payload.append(
        "isActive",
        formData.isActive
      );

      payload.append(
        "underMaintenance",
        formData.underMaintenance
      );

      payload.append(
        "vehicleModel",
        formData.vehicleModel
      );

      payload.append(
        "fuelType",
        formData.fuelType
      );

      payload.append(
        "rating",
        formData.rating
      );

      payload.append(
        "cancellationPolicy",
        formData.cancellationPolicy
      );

      payload.append(
        "notes",
        formData.notes
      );

      payload.append(
        "sellerId",
        formData.sellerId
      );

      if (formData.driverImage) {
        payload.append(
          "driverImage",
          formData.driverImage
        );
      }

      if (formData.cabImage) {
        payload.append(
          "cabImage",
          formData.cabImage
        );
      }

      const response = await axios.put(
        `http://localhost:5000/api/seller/updateCab/${_id}`,
        payload,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      if (response.data.success) {

        toast.success(
          response.data.message
        );

        setTimeout(() => {

          navigate("/admin/cabs");

        }, 2000);

      } else {

        toast.error(
          response.data.message
        );

      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong"
      );

    }

  };

  return (
    <div className="wrapper">

      <Header />
      <SideMenu />
      <Toaster />

      <div className="content-wrapper">

        {/* PAGE HEADER */}
        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">
              Edit Cab
            </h1>
          </div>
        </div>

        {/* CONTENT */}
        <div className="content">
          <div className="container-fluid">

            <div className="row justify-content-center">

              <div className="col-md-11">

                <div className="card card-primary">

                  <div className="card-header">

                    <h3 className="card-title">
                      Cab Information
                    </h3>

                  </div>

                  <div className="card-body">

                    <form
                      onSubmit={handleSubmit}
                    >

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

                            <label>Cab Name</label>

                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Cab Name"
                              name="cabName"
                              value={formData.cabName}
                              onChange={handleChange}
                              required
                            />

                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">

                            <label>Operator</label>

                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Operator"
                              name="operator"
                              value={formData.operator}
                              onChange={handleChange}
                              required
                            />

                          </div>

                          
                        </div>

                      </div>

                      <div className="row">

                        <div className="col-md-4">
                          <div className="form-group">

                            <label>Vehicle Type</label>

                            <select
                              className="form-control"
                              name="vehicleType"
                              value={formData.vehicleType}
                              onChange={handleChange}
                              required
                            >

                              <option value="">
                                Select Vehicle Type
                              </option>

                              <option value="Mini">
                                Mini
                              </option>

                              <option value="Sedan">
                                Sedan
                              </option>

                              <option value="SUV">
                                SUV
                              </option>

                              <option value="Luxury">
                                Luxury
                              </option>

                              <option value="Auto">
                                Auto
                              </option>

                              <option value="Bike">
                                Bike
                              </option>

                            </select>

                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">

                            <label>Cab Number</label>

                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Cab Number"
                              name="cabNumber"
                              value={formData.cabNumber}
                              onChange={handleChange}
                              required
                            />

                          </div>
                          
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">

                            <label>Fuel Type</label>

                            <select
                              className="form-control"
                              name="fuelType"
                              value={formData.fuelType}
                              onChange={handleChange}
                            >

                              <option value="">
                                Select Fuel Type
                              </option>

                              <option value="Petrol">
                                Petrol
                              </option>

                              <option value="Diesel">
                                Diesel
                              </option>

                              <option value="CNG">
                                CNG
                              </option>

                              <option value="Electric">
                                Electric
                              </option>

                            </select>

                          </div>
                        </div>

                      </div>

                      <div className="row">

                        <div className="col-md-4">
                          <div className="form-group">

                            <label>Cab Brand</label>

                            <input
                              type="text"
                              className="form-control"
                              name="cabBrand"
                              value={formData.cabBrand}
                              onChange={handleChange}
                            />

                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">

                            <label>Cab Model</label>

                            <input
                              type="text"
                              className="form-control"
                              name="cabModel"
                              value={formData.cabModel}
                              onChange={handleChange}
                            />

                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">

                            <label>Cab Color</label>

                            <input
                              type="text"
                              className="form-control"
                              name="cabColor"
                              value={formData.cabColor}
                              onChange={handleChange}
                            />

                          </div>
                          
                        </div>
                         <div className="form-group">

                            <label>city</label>

                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter city"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              required
                            />

                          </div>

                      </div>

                      <hr />

                      {/* DRIVER DETAILS */}
                      <h4
                        className="mb-3"
                        style={{ fontWeight: "bold" }}
                      >
                        Driver Details
                      </h4>

                      <div className="row">

                        <div className="col-md-6">
                          <div className="form-group">

                            <label>Driver Name</label>

                            <input
                              type="text"
                              className="form-control"
                              name="driverName"
                              value={formData.driverName}
                              onChange={handleChange}
                            />

                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">

                            <label>Driver Phone</label>

                            <input
                              type="text"
                              className="form-control"
                              name="driverPhone"
                              value={formData.driverPhone}
                              onChange={handleChange}
                            />

                          </div>
                        </div>

                      </div>

                      <div className="row">

                        <div className="col-md-4">
                          <div className="form-group">

                            <label>Driver Experience</label>

                            <input
                              type="number"
                              className="form-control"
                              name="driverExperience"
                              value={formData.driverExperience}
                              onChange={handleChange}
                            />

                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">

                            <label>Driver Rating</label>

                            <input
                              type="number"
                              className="form-control"
                              name="driverRating"
                              value={formData.driverRating}
                              onChange={handleChange}
                            />

                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">

                            <label>Driver Image</label>

                            <input
                              type="file"
                              className="form-control"
                              name="driverImage"
                              onChange={handleChange}
                            />

                          </div>
                        </div>

                      </div>

                      <hr />

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

                      <hr />

                      {/* CAPACITY */}
                      <h4
                        className="mb-3"
                        style={{ fontWeight: "bold" }}
                      >
                        Capacity
                      </h4>

                      <div className="row">

                        <div className="col-md-6">
                          <div className="form-group">

                            <label>Seating Capacity</label>

                            <input
                              type="number"
                              className="form-control"
                              name="seatingCapacity"
                              value={formData.seatingCapacity}
                              onChange={handleChange}
                            />

                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">

                            <label>Luggage Capacity</label>

                            <input
                              type="number"
                              className="form-control"
                              name="luggageCapacity"
                              value={formData.luggageCapacity}
                              onChange={handleChange}
                            />

                          </div>
                        </div>

                      </div>

                      <hr />

                      {/* PRICING */}
                      <h4
                        className="mb-3"
                        style={{ fontWeight: "bold" }}
                      >
                        Pricing
                      </h4>

                      <div className="row">

                        <div className="col-md-4">
                          <div className="form-group">

                            <label>Base Fare</label>

                            <input
                              type="number"
                              className="form-control"
                              name="baseFare"
                              value={formData.baseFare}
                              onChange={handleChange}
                            />

                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">

                            <label>Price Per KM</label>

                            <input
                              type="number"
                              className="form-control"
                              name="pricePerKm"
                              value={formData.pricePerKm}
                              onChange={handleChange}
                            />

                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">

                            <label>Price Per Minute</label>

                            <input
                              type="number"
                              className="form-control"
                              name="pricePerMinute"
                              value={formData.pricePerMinute}
                              onChange={handleChange}
                            />

                          </div>
                        </div>

                      </div>

                      <hr />

                      {/* FEATURES */}
                      <h4
                        className="mb-3"
                        style={{ fontWeight: "bold" }}
                      >
                        Features
                      </h4>

                      <div className="row">

                        <div className="col-md-3">

                          <label>

                            <input
                              type="checkbox"
                              className="mr-2"
                              name="airConditioned"
                              checked={formData.airConditioned}
                              onChange={handleChange}
                            />

                            AC

                          </label>

                        </div>

                        <div className="col-md-3">

                          <label>

                            <input
                              type="checkbox"
                              className="mr-2"
                              name="wifiAvailable"
                              checked={formData.wifiAvailable}
                              onChange={handleChange}
                            />

                            WiFi

                          </label>

                        </div>

                        <div className="col-md-3">

                          <label>

                            <input
                              type="checkbox"
                              className="mr-2"
                              name="musicAvailable"
                              checked={formData.musicAvailable}
                              onChange={handleChange}
                            />

                            Music

                          </label>

                        </div>

                        <div className="col-md-3">

                          <label>

                            <input
                              type="checkbox"
                              className="mr-2"
                              name="isActive"
                              checked={formData.isActive}
                              onChange={handleChange}
                            />

                            Active

                          </label>

                        </div>

                      </div>

                      <hr />

                      {/* EXTRA */}
                      <div className="form-group">

                        <label>Cancellation Policy</label>

                        <textarea
                          className="form-control"
                          rows="4"
                          name="cancellationPolicy"
                          value={formData.cancellationPolicy}
                          onChange={handleChange}
                        ></textarea>

                      </div>

                      <div className="form-group">

                        <label>Notes</label>

                        <textarea
                          className="form-control"
                          rows="4"
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                        ></textarea>

                      </div>

                      <div className="form-group text-right">

                        <Link
                          to={"/admin/cabs"}
                          className="btn btn-secondary mr-2"
                        >
                          Cancel
                        </Link>

                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          Update Cab
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

export default EditCab;