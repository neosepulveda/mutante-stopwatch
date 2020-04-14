import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { FaSun, FaRegMoon } from "react-icons/fa";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  function toggle() {
    setIsActive(!isActive);
  }

  function resetStopwatch() {
    setTime(0.0);
    setIsActive(false);
  }

  function addCounter() {
    setCounter(counter + 1);
  }

  function substractCounter() {
    setCounter(counter - 1);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 0.01);
      }, 10);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const sevens = Math.floor(time / 10);

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <Container>
        <Row>
          <Col>
            <div className="dark-mode-control d-flex flex-row-reverse">
              <Button
                className="transparent"
                variant="primary"
                onClick={toggleDarkMode}
              >
                {darkMode ? <FaSun /> : <FaRegMoon fill="#333333" />}
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="main">
          <Col className="col-md-8 col-12">
            <Row>
              <div className="time w-100 d-flex justify-content-center">
                <span style={{ width: "10rem" }} className="d-flex d-flex-row">
                  {minutes > 0 && (
                    <h1 style={{ fontSize: "10rem" }}>{minutes}:</h1>
                  )}
                  <h1 style={{ fontSize: "10rem" }}>{seconds.toFixed(0)}</h1>
                  <h1 style={{ fontSize: "3rem", marginTop: "100px" }}>
                    {(time % 1).toFixed(2).split(".")[1]}
                  </h1>
                </span>
              </div>
            </Row>
            <Row>
              <Col>
                <div className="actions w-100 d-flex justify-content-center">
                  <Button
                    onClick={toggle}
                    size="lg"
                    className="circular-xl mx-2"
                  >
                    {isActive ? "Pause" : "Start"}
                  </Button>
                  <Button
                    variant={darkMode ? "outline-light" : "outline-secondary"}
                    onClick={resetStopwatch}
                    size="lg"
                    className="circular-xl mx-2"
                  >
                    Reset
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col className="col-md-4 col-12 mt-5">
            <div className="counter w-100 d-flex justify-content-center mt-5">
              <Row>
                <div className="mt-4">
                  <Button
                    size="lg"
                    className="circular mx-3"
                    onClick={substractCounter}
                    disabled={counter === 0}
                  >
                    <span>-</span>
                  </Button>
                </div>
                <div>
                  <h1 style={{ fontSize: "5rem" }}>{counter}</h1>
                </div>
                <div className="mt-4">
                  <Button
                    size="lg"
                    className="circular mx-3"
                    onClick={addCounter}
                  >
                    <span>+</span>
                  </Button>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-5">
          <Col className="col-12 text-center">
            <h2>Reps of 7</h2>
          </Col>
          <Col className="col-12 text-center">
            <h1 className="display-1">{sevens}</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
