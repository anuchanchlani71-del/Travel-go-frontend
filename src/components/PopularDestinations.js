// import React, { useRef, useEffect, useState } from "react";
// import { Container } from "react-bootstrap";

// const destinations = [
//   {
//     name: "Goa",
//     tag: "Beaches",
//     price: "₹4,999",
//     rating: "4.8",
//     image:
//       "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800"
//   },
//   {
//     name: "Manali",
//     tag: "Mountains",
//     price: "₹5,499",
//     rating: "4.7",
//     image:
//       "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800"
//   },
//   {
//     name: "Agra",
//     tag: "Heritage",
//     price: "₹2,999",
//     rating: "4.6",
//     image:
//       "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800"
//   },
//   {
//     name: "Kerala",
//     tag: "Backwaters",
//     price: "₹6,299",
//     rating: "4.9",
//     image:
//       "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800"
//   },
//   {
//     name: "Jaipur",
//     tag: "Culture",
//     price: "₹3,499",
//     rating: "4.5",
//     image:
//       "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800"
//   },
//   {
//     name: "Udaipur",
//     tag: "Romance",
//     price: "₹4,199",
//     rating: "4.8",
//     image:
//       "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800"
//   }
// ];

// function PopularDestinations() {
//   const sliderRef = useRef(null);

//   const [isMobile, setIsMobile] = useState(
//     window.innerWidth < 768
//   );

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener("resize", handleResize);

//     return () =>
//       window.removeEventListener(
//         "resize",
//         handleResize
//       );
//   }, []);

//   // Auto Slider
//   useEffect(() => {
//     const slider = sliderRef.current;

//     const interval = setInterval(() => {
//       if (!slider) return;

//       if (
//         slider.scrollLeft + slider.clientWidth >=
//         slider.scrollWidth - 10
//       ) {
//         slider.scrollTo({
//           left: 0,
//           behavior: "smooth"
//         });
//       } else {
//         slider.scrollBy({
//           left: slider.clientWidth / 3,
//           behavior: "smooth"
//         });
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   const scrollLeft = () => {
//     sliderRef.current.scrollBy({
//       left: -(sliderRef.current.clientWidth / 3),
//       behavior: "smooth"
//     });
//   };

//   const scrollRight = () => {
//     sliderRef.current.scrollBy({
//       left: sliderRef.current.clientWidth / 3,
//       behavior: "smooth"
//     });
//   };

//   return (
//     <section
//       style={{
//         padding: "80px 0",
//         background: "#f8fafc"
//       }}
//     >
//       <Container fluid>

//         {/* Heading */}
//         <div className="d-flex justify-content-between align-items-center mb-5">

//           <div>
//             <span
//               style={{
//                 background: "#e7f1ff",
//                 color: "#0d6efd",
//                 padding: "7px 15px",
//                 borderRadius: "30px",
//                 fontSize: "13px",
//                 fontWeight: "600"
//               }}
//             >
//               🔥 Trending Destinations
//             </span>

//             <h2
//               style={{
//                 marginTop: "15px",
//                 fontWeight: "700",
//                 fontSize: "38px"
//               }}
//             >
//               Popular Destinations
//             </h2>

//             <p
//               style={{
//                 color: "#6c757d",
//                 marginBottom: 0
//               }}
//             >
//               Handpicked destinations loved by
//               millions of travelers
//             </p>
//           </div>

//           <div>
//             <button
//               onClick={scrollLeft}
//               className="btn btn-light shadow-sm me-2"
//               style={{
//                 width: "45px",
//                 height: "45px",
//                 borderRadius: "50%"
//               }}
//             >
//               ←
//             </button>

//             <button
//               onClick={scrollRight}
//               className="btn btn-light shadow-sm"
//               style={{
//                 width: "45px",
//                 height: "45px",
//                 borderRadius: "50%"
//               }}
//             >
//               →
//             </button>
//           </div>

//         </div>

//         {/* Slider */}
//         <div
//           ref={sliderRef}
//           style={{
//             display: "flex",
//             gap: "20px",
//             overflowX: "auto",
//             scrollBehavior: "smooth",
//             scrollbarWidth: "none",
//             msOverflowStyle: "none"
//           }}
//         >
//           {destinations.map((dest, index) => (
//             <div
//               key={index}
//               style={{
//                 width: isMobile
//                   ? "85%"
//                   : "32%",
//                 minWidth: isMobile
//                   ? "85%"
//                   : "32%",
//                 height: "450px",
//                 borderRadius: "22px",
//                 overflow: "hidden",
//                 position: "relative",
//                 flexShrink: 0,
//                 cursor: "pointer",
//                 boxShadow:
//                   "0 15px 35px rgba(0,0,0,0.15)"
//               }}
//             >
//               {/* Image */}
//               <img
//                 src={dest.image}
//                 alt={dest.name}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover"
//                 }}
//               />

//               {/* Overlay */}
//               <div
//                 style={{
//                   position: "absolute",
//                   inset: 0,
//                   background:
//                     "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.15))"
//                 }}
//               />

//               {/* Rating */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "15px",
//                   right: "15px",
//                   background: "#fff",
//                   padding: "7px 12px",
//                   borderRadius: "30px",
//                   fontWeight: "600",
//                   fontSize: "13px"
//                 }}
//               >
//                 ⭐ {dest.rating}
//               </div>

//               {/* Content */}
//               <div
//                 style={{
//                   position: "absolute",
//                   left: "20px",
//                   bottom: "20px",
//                   color: "#fff"
//                 }}
//               >
//                 <span
//                   style={{
//                     background: "#0d6efd",
//                     padding: "6px 14px",
//                     borderRadius: "30px",
//                     fontSize: "12px"
//                   }}
//                 >
//                   {dest.tag}
//                 </span>

//                 <h3
//                   style={{
//                     marginTop: "12px",
//                     fontWeight: "700"
//                   }}
//                 >
//                   {dest.name}
//                 </h3>

//                 <p
//                   style={{
//                     marginBottom: 0,
//                     fontSize: "15px"
//                   }}
//                 >
//                   Starting from{" "}
//                   <strong>
//                     {dest.price}
//                   </strong>
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//       </Container>
//     </section>
//   );
// }

// export default PopularDestinations;

import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

function PopularDestinations() {
  const sliderRef = useRef(null);

  const [destinations, setDestinations] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // fetch API
  const getDestinations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/popular-destinations"
      );

      if (res.data.success) {
        setDestinations(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDestinations();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto slider
  useEffect(() => {
    const slider = sliderRef.current;

    const interval = setInterval(() => {
      if (!slider) return;

      if (
        slider.scrollLeft + slider.clientWidth >=
        slider.scrollWidth - 10
      ) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({
          left: slider.clientWidth / 3,
          behavior: "smooth",
        });
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -(sliderRef.current.clientWidth / 3),
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.clientWidth / 3,
      behavior: "smooth",
    });
  };

  return (
    <section style={{ padding: "80px 0", background: "#f8fafc" }}>
      <Container >

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-5">

          <div>
            <span style={{
              background: "#e7f1ff",
              color: "#0d6efd",
              padding: "7px 15px",
              borderRadius: "30px",
              fontSize: "13px",
              fontWeight: "600"
            }}>
              🔥 Trending Destinations
            </span>

            <h2 style={{ marginTop: "15px", fontWeight: "700", fontSize: "38px" }}>
              Popular Destinations
            </h2>

            <p style={{ color: "#6c757d", marginBottom: 0 }}>
              Handpicked destinations loved by millions
            </p>
          </div>

          <div>
            <button onClick={scrollLeft} className="btn btn-light me-2">←</button>
            <button onClick={scrollRight} className="btn btn-light">→</button>
          </div>

        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          style={{
            display: "flex",
            gap: "20px",
            overflowX: "auto",
            scrollBehavior: "smooth"
          }}
        >
          {destinations.map((dest) => (
            <div
              key={dest._id}
              style={{
                width: isMobile ? "85%" : "32%",
                minWidth: isMobile ? "85%" : "32%",
                height: "450px",
                borderRadius: "22px",
                overflow: "hidden",
                position: "relative",
                flexShrink: 0,
                boxShadow: "0 15px 35px rgba(0,0,0,0.15)"
              }}
            >

              {/* Image from API */}
              <img
                src={dest.image}
                alt={dest.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />

              {/* Overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.15))"
              }} />

              {/* Rating */}
              <div style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "#fff",
                padding: "7px 12px",
                borderRadius: "30px",
                fontWeight: "600"
              }}>
                ⭐ {dest.rating}
              </div>

              {/* Content */}
              <div style={{
                position: "absolute",
                left: "20px",
                bottom: "20px",
                color: "#fff"
              }}>
                <span style={{
                  background: "#0d6efd",
                  padding: "6px 14px",
                  borderRadius: "30px",
                  fontSize: "12px"
                }}>
                  {dest.tag}
                </span>

                <h3 style={{ marginTop: "12px", fontWeight: "700" }}>
                  {dest.name}
                </h3>

                <p>
                  Starting from <strong>{dest.price}</strong>
                </p>
              </div>

            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}

export default PopularDestinations;