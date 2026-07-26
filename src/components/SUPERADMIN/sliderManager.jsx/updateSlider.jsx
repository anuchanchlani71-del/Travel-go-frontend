import Header from "../Header";
import { useState, useEffect } from "react";
import axios from "axios";
import SideMenu from "../sidemenu";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function UpdateSlider() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    tag: "",
    price: "",
    image: null,
    oldImage: "",
  });

  useEffect(() => {
    getSlider();
  }, []);

  const getSlider = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/get-destination/${id}`
      );

      if (res.data.success) {
        setFormData({
          name: res.data.data.name,
          tag: res.data.data.tag,
          price: res.data.data.price,
          image: null,
          oldImage: res.data.data.image,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load slider");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({
        ...formData,
        image: files[0],
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

      const response = await axios.put(
        `http://localhost:5000/api/update-destination/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Slider Updated Successfully");

        setTimeout(() => {
          navigate("/superadmin/sliders");
        }, 1500);
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
            <h1>Update Slider</h1>
          </div>
        </div>

        <div className="content">
          <div className="container-fluid">

            <form onSubmit={handleSubmit}>

              <div className="card card-primary">

                <div className="card-header">
                  <h3 className="card-title">Update Slider</h3>
                </div>

                <div className="card-body">

                  <div className="row">

                    <div className="col-md-6">
                      <label>Destination Name</label>
                      <input
                        type="text"
                        className="form-control"
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
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label>Slider Image</label>

                      {formData.oldImage && (
                        <div className="mb-2">
                          <img
                            src={`http://localhost:5000/uploads/${formData.oldImage}`}
                            alt=""
                            width="120"
                            className="img-thumbnail"
                          />
                        </div>
                      )}

                      <input
                        type="file"
                        className="form-control"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                      />

                      <small className="text-muted">
                        Leave blank if you don't want to change the image.
                      </small>
                    </div>

                  </div>

                </div>

                <div className="card-footer">
                  <button className="btn btn-primary">
                    Update Slider
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

export default UpdateSlider;