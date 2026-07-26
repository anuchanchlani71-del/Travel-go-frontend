import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
} from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const MyProfile = () => {

  const [user, setUser] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {

      const res = await axios.get("http://localhost:5000/api/v1/myprofile", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (res.data.success) {
        setUser(res.data.data);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="py-5">

      <Row className="justify-content-center">

        <Col md={8}>

          <Card
            className="shadow-lg border-0 rounded-4 overflow-hidden"
          >

            {/* Header */}

            <div
              style={{
                background:
                  "linear-gradient(135deg,#0d6efd,#6610f2)",
                height: "150px",
              }}
            ></div>

            <div className="text-center">

              <img
                src={`http://localhost:5000/uploads/${user.image}`}
                alt=""
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "6px solid white",
                  marginTop: "-75px",
                }}
              />

              <h3 className="mt-3">
                {user.first_name} {user.last_name}
              </h3>

              <Badge bg="primary" className="px-3 py-2">
                {user.role}
              </Badge>

            </div>

            <Card.Body className="p-4">

              <Row>

                <Col md={6} className="mb-3">
                  <h6>First Name</h6>
                  <p>{user.first_name}</p>
                </Col>

                <Col md={6} className="mb-3">
                  <h6>Last Name</h6>
                  <p>{user.last_name}</p>
                </Col>

                <Col md={6} className="mb-3">
                  <h6>Email</h6>
                  <p>{user.email}</p>
                </Col>

                <Col md={6} className="mb-3">
                  <h6>Mobile</h6>
                  <p>{user.mobile}</p>
                </Col>

                <Col md={6} className="mb-3">
                  <h6>Address</h6>
                  <p>{user.address}</p>
                </Col>

                <Col md={6} className="mb-3">
                  <h6>Status</h6>

                  {user.status ? (
                    <Badge bg="success">Active</Badge>
                  ) : (
                    <Badge bg="danger">Inactive</Badge>
                  )}
                </Col>

                <Col md={12} className="mb-3">
                  <h6>Account Created</h6>

                  <p>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : ""}
                  </p>
                </Col>

              </Row>

              <div className="text-center mt-4">

                <Button variant="primary">
                  Edit Profile
                </Button>

              </div>

            </Card.Body>

          </Card>

        </Col>

      </Row>

    </Container>
  );
};

export default MyProfile;