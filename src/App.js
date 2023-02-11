import React, { useState, useEffect } from "react";
import LoadingIndicator from "./components/LoadingIndicator";
import Location from "./components/Location";
import { DateTime } from "luxon";
import { Card } from "react-bootstrap";
import IP_Logo from "./IP_Logo.png";

import useWindowResize from "./components/useWindowResize";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  const [IPAddress, setIPAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);
  const [position, setPosition] = useState(null);
  const [flag, setFlag] = useState("");
  const { width, height, findScreenSize } = useWindowResize();
  const API = `${process.env.REACT_APP_API_KEY}`;
  const [localTime, setLocalTime] = useState(
    DateTime.now().toLocaleString(DateTime.DATETIME_MED)
  );

  useEffect(() => {
    findScreenSize();
  }, []);

  window.addEventListener("resize", () => {
    findScreenSize();
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${API}`)
      .then((response) => {
        if (!response.ok) {
          return setError(`HTTP Status Error: ${response.status}`);
        } else {
          return response;
        }
      })
      .then((response) => response.json())
      .then((json) => {
        setIPAddress(json);
        setPosition([json.location.lat, json.location.lng]);
      })
      .catch((error) => {
        setError(`${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (IPAddress) {
      if (IPAddress.location) {
        setIsLoading(true);
        fetch(
          `https://restcountries.com/v3.1/alpha/${IPAddress.location.country}`
        )
          .then((response) => {
            if (!response.ok) {
              return setError(`HTTP Status Error: ${response.status}`);
            } else {
              return response;
            }
          })
          .then((response) => response.json())
          .then((json) => {
            setFlag(json[0].flags.svg);
          })
          .catch((error) => {
            setError2(`${error}`);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  }, [IPAddress]);

  console.log(IPAddress);

  return (
    <div className="container">
      <div className="row">
        <h1>
          <img className="IPLogo" src={IP_Logo} />
          What is My IP Address?
        </h1>
      </div>
      <div className="row" style={{ height: height - 100 }}>
        {isLoading ? (
          <LoadingIndicator />
        ) : IPAddress.ip ? (
          <>
            <div className="col-6">
              <Location
                IPAddress={IPAddress}
                position={position}
                height={height}
              />
            </div>
            {flag ? (
              <Card className="col-6">
                <Card.Img variant="top" src={flag} />
                <Card.Body>
                  <Card.Text>
                    <span
                      className="title"
                      style={{
                        textDecorationLine: "underline",
                        fontWeight: "bold",
                      }}
                    >
                      Your IP Address Is:
                    </span>{" "}
                    {IPAddress.ip}
                  </Card.Text>
                  <Card.Text>
                    <span
                      className="title"
                      style={{
                        textDecorationLine: "underline",
                        fontWeight: "bold",
                      }}
                    >
                      Your Internet Service Provider Is:
                    </span>{" "}
                    {IPAddress.isp}
                  </Card.Text>
                  <Card.Text>
                    <span
                      className="title"
                      style={{
                        textDecorationLine: "underline",
                        fontWeight: "bold",
                      }}
                    >
                      You Are Currently Located In:
                    </span>{" "}
                    {IPAddress.location.city}, {IPAddress.location.region},{" "}
                    {IPAddress.location.country}
                  </Card.Text>
                  <Card.Text>
                    <span
                      className="title"
                      style={{
                        textDecorationLine: "underline",
                        fontWeight: "bold",
                      }}
                    >
                      The Local Time & Date Is:
                    </span>{" "}
                    {localTime}
                  </Card.Text>
                </Card.Body>
              </Card>
            ) : (
              error2
            )}
          </>
        ) : (
          error
        )}
      </div>
    </div>
  );
}

export default App;
