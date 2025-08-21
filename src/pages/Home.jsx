import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const images = [
    "images/360_F_284468940_1bg6BwgOfjCnE3W0wkMVMVqddJgtMynE.jpg",
    "images/abstract-background-restaurant-concept-blurred-background-evening-food-fork-knife-cutlery-table-setting_548821-3460.avif",
    "images/premium_photo-1661432769134-758550b8fedb.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {/* Hero Section */}
      <div className="container-fluid p-0" style={{ marginTop: 0 }}>
        <section
          className="hero d-flex align-items-center justify-content-center text-center text-white"
          style={{
            backgroundImage: `url(${images[currentImageIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "90vh",
            position: "relative",
            marginTop: "-40px",
            transition: "background-image 1s ease-in-out",
          }}
        >
          {/* Dark overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          ></div>

          {/* Hero Text */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <h1 className="display-2 fw-bold ">
              Delicious food, delivered fast.
            </h1>
            <p className="lead mt-3 fw-bold">
              <span className="text-warning fw-bold">Order Now</span>
              <br />
              Freshly prepared meals from local restaurants. Order in just a few
              taps.
            </p>
            <Link
              to="/menu"
              className="btn btn-light btn-lg mt-3 fw-bold text-primary"
            >
              See Menu
            </Link>
          </div>
        </section>
      </div>

      {/* Popular Categories */}
      <section className="section1 mb-5 mt-5">
        <h3 className="text-center fw-bold fs-lg display-4">
          Popular Categories
        </h3>
        <div className="row g-3 mt-3">
          {[
            {
              src: "/images/food-pizza-wallpaper-paper-poster-1-vp-221221-617-poster-smoky-original-imag9wjrxfzzhrpd.webp",
              label: "Pizza",
            },
            {
              src: "/images/a-flying-burger-with-all-the-layers-ai-generative-free-photo.jpg",
              label: "Burgers",
            },
            { src: "/images/images.jpg", label: "Desserts" },
            {
              src: "/images/360_F_123430450_j35Dbf7ye3G7HegagILna7iAjrMN9g4j.jpg",
              label: "Drinks",
            },
            {
              src: "/images/istockphoto-1093396546-612x612.jpg",
              label: "Veg Starters",
            },
            {
              src: "/images/healthy-non-veg-food-chicken-260nw-730914082.jpg",
              label: "Non-Veg Starters",
            },
            {
              src: "/images/360_F_912102578_dpR2r8IstjbBzQWgn2dAegf6SE2gDPNT.jpg",
              label: "Special Biryani",
            },
            {
              src: "/images/istockphoto-1208083887-612x612.jpg",
              label: "Manchurian",
            },
          ].map((category, index) => (
            <div className="col-6 col-md-3" key={index}>
              <div className="card p-2 text-center">
                <img
                  src={category.src}
                  alt={category.label}
                  className="img-fluid"
                />
                <h2 className="mt-2">
                  <strong>{category.label}</strong>
                </h2>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
