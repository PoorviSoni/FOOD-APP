import React from "react";
import { useHistory } from "react-router-dom";
import Footer from "./Footer";
import Verticalcards from "./Verticalcards";

function Home() {
  let history = useHistory();
  // for restaurent Register
  function clickForRegister() {
    history.push("./restaurantregister");
  }
  function clickForMasterLogin() {
    history.push("./masterlogin");
  }
  return (
    <div className="container-fluid p-0 m-0 ">
      <div className="d-flex justify-content-between p-auto m-auto mt-3">
        <h2 className="quote">We serve happiness!!</h2>

        <button
          className="btn bg-success rounded-pill float-end text-light"
          onClick={clickForRegister}
        >
          Collab with us!!
        </button>
        <button
          className="btn bg-success rounded-pill float-end text-light"
          onClick={clickForMasterLogin}
        >
          Master Login
        </button>
      </div>
      <div className="row mt-3 d-flex justify-content-evenly">
        <div className="col-1"></div>
        {/*  static image */}

        <div className="col-2 d-flex justify-content-center">
          <img
            src="https://c.tenor.com/LeSVOZJUt-oAAAAM/muuve-rider.gif"
            className="mx-auto"
            width="250px"
            height="367px"
            alt=""
          />
        </div>

        {/* carousel part */}

        <div className="col-9 d-none d-md-block">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://i.pinimg.com/originals/f1/5c/da/f15cda34750f8b13cbe072096843422b.jpg"
                  className="d-block mx-auto"
                  width="844px"
                  height="367px"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://blog.dineout-cdn.co.in/blog/wp-content/uploads/2018/08/2018_8_14_Blog_Buffet_Amogham_499_2-845x321.jpg"
                  className="d-block mx-auto"
                  width="844px"
                  height="367px"
                  alt=""
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://www.jaipurstuff.com/wp-content/uploads/2019/04/Popular-Non-veg-Food-you-must-eat-in-Jaipur.jpg"
                  className="d-block mx-auto"
                  width="844px"
                  height="367px"
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <Verticalcards />

      {/* horizontal cards */}

      <div className=" container p-auto m-auto row row-cols-1 row-cols-md-3 g-4 mt-3">
        <div className="col">
          <div className="card shadow">
            <img
              src="https://b.zmtcdn.com/data/pictures/chains/8/301718/c754be5e4d4ed74f5f07da1c3fe6ce77.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Biryani Blues</h5>
              <p className="card-text">Biryani Taste, better then the rest</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow">
            <img
              src="https://b.zmtcdn.com/data/pictures/6/18384116/1d26c0560f51eaa6480ce54dcf96b1ed.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">The Cake Shop</h5>
              <p className="card-text">Come...Fall in love with our cakes.</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card shadow">
            <img
              src="https://b.zmtcdn.com/data/pictures/chains/5/55/1c55f84a8fc991e2de56b7e4dda133bc.jpeg?fit=around|771.75:416.25&crop=771.75:416.25;*,*"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Berco's</h5>
              <p className="card-text">Nothing Is Real Without It.</p>
            </div>
          </div>
        </div>
      </div>

      {/* horizontal cards  */}
      <div class="row  mt-3 container p-auto m-auto ">
        <div class="col-sm-6">
          <div class="card shadow">
            <div className="row row-cols-1 row-cols-sm-12 row-cols-md-2">
              <div class=" col col-sm-12 col-md-4 col-lg-4">
                <img
                  src="https://b.zmtcdn.com/data/pictures/4/19585064/4bcd527b7ea78f31092febd591cb8f9c_o2_featured_v2.jpg"
                  width="180px"
                  height="180px"
                  alt="..."
                  class="mx-auto p-auto"
                />
              </div>
              <div className="col col-sm-12 col-md-8 col-lg-8">
                <div class="card-body">
                  <h5 class="card-title">The South Corner</h5>
                  <p class="card-text">
                    If you don't Love south Indian cuisine, you are either an
                    alien or your taste buds are spoiled.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card shadow">
            <div className="row row-cols-1 row-cols-sm-12 row-cols-md-2">
              <div class=" col col-sm-12 col-md-4 col-lg-4">
                <img
                  src="https://b.zmtcdn.com/data/pictures/chains/1/18332051/18543cf6b1dde10ffbffc04c92fd72c7_o2_featured_v2.jpeg"
                  width="180px"
                  height="180px"
                  alt="..."
                  class="mx-auto p-auto"
                />
              </div>
              <div className="col col-sm-12 col-md-8 col-lg-8">
                <div class="card-body">
                  <h5 class="card-title">The Land of Spices</h5>
                  <p class="card-text">
                    We like to say “Padhariye”. Come north for flavors The
                    heritage of Indian flavors is here
                  </p>
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

export default Home;
