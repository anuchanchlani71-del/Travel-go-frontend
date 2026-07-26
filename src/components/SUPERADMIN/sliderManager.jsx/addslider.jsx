import Header from "../Header";
import { useState } from "react";
import axios from "axios";
import SideMenu from "../sidemenu";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddSlider() {
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    tag: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      payload.append("name", formData.name);
      payload.append("tag", formData.tag);
      payload.append("price", formData.price);

      if (formData.image) {
        payload.append("image", formData.image);
      }

      const response = await axios.post(
        "http://localhost:5000/api/add-destination",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {

        toast.success("Slider Added Successfully");

        setFormData({
          name: "",
          tag: "",
          price: "",
          image: null,
        });

        document.getElementById("image").value = "";
          setTimeout(() => {
    navigate("/superadmin/sliders");
  }, 1500);


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

      {/* React Hot Toast */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            style: {
              background: "#16a34a",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#dc2626",
              color: "#fff",
            },
          },
        }}
      />

      <Header />
      <SideMenu />

      <div className="content-wrapper">

        <div className="content-header">
          <div className="container-fluid">
            <h1>Add Slider</h1>
          </div>
        </div>

        <div className="content">
          <div className="container-fluid">

            <form onSubmit={handleSubmit}>

              <div className="card card-primary">

                <div className="card-header">
                  <h3 className="card-title">Slider Details</h3>
                </div>

                <div className="card-body">

                  <div className="row">

                    <div className="col-md-6">
                      <label>Destination Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Destination Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label>Tag</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Trending, Popular..."
                        name="tag"
                        value={formData.tag}
                        onChange={handleChange}
                        required
                      />
                    </div>

                  </div>

                  <br />

                  <div className="row">

                    <div className="col-md-6">
                      <label>Price</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label>Slider Image</label>
                      <input
                        id="image"
                        type="file"
                        className="form-control"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        required
                      />
                    </div>

                  </div>

                </div>

                <div className="card-footer">
                  <button className="btn btn-primary">
                    Add Slider
                  </button>
                </div>

              </div>

            </form>

          </div>
        </div>

      </div>

    </div>
  );
}

export default AddSlider;