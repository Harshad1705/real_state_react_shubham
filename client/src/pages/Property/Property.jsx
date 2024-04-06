import React, { useState } from "react";
import "./Property.css";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart } from "react-icons/ai";
// import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdMeetingRoom, MdLocationPin, MdShower } from "react-icons/md";
import Map from "../../components/Map/Map";
import { useAuthCheck } from "../../hooks/useAuthCheck.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../../components/BookingModal/BookingModal.jsx";

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  );
  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  if (isError) {
    return (
      <div className="wrapper">
        <div className="paddings flexCenter">
          Error while fetching the property details
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="paddings flexCenter">
          <PuffLoader />
        </div>
      </div>
    );
  }
  return (
    <div className="wrapper">
      <div className="paddings innerWidth flexColStart property-container">
        {/* like button  */}
        <div className="like">
          <AiFillHeart size={25} color="white" />
        </div>
        {/* image  */}
        <img src={data.image} alt="" />
        <div className="flexCenter property-details">
          {/* left side  */}

          <div className="flexColStart left">
            {/* head  */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data?.price}
              </span>
            </div>
            {/* facilities  */}
            <div className="flexStart facilities">
              <div className="flexStart facility">
                <MdShower size={20} color="#1F3E72" />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities?.parkings} Parking</span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities?.bedrooms} Room</span>
              </div>
            </div>

            {/* description */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            {/* address  */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span>
                {data?.address}
                {data?.city}
                {data?.country}
              </span>
            </div>

            {/* booking button  */}
            <button
              className="button"
              onClick={() => {
                validateLogin() && setModalOpened(true);
              }}
            >
              Book your visit
            </button>

            <BookingModal
            // opened={modalOpened}
            // setopened={setModalOpened}
            // propertyId={id}
            // email={user?.email}
            />
          </div>

          {/* right side  */}
          <div className="map">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
