import React, { Component, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

// for generating random id
import { v4 as uuidv4 } from "uuid";

const Login = ({ onSetID }) => {
  const [logID, setLogID] = useState("");
  const [error, setError] = useState("");
  const [errStyle, setErrStyle] = useState({ display: "none" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrStyle({ display: "none" });
    setError("");
    const trimedID = logID.trim();
    if (!trimedID) {
      setError("ID cannot be empty");
      setErrStyle({ display: "block" });
      setLogID("");
      return;
    }

    fetch(`https://chatty9242.herokuapp.com/take/${logID}`)
      .then((res) => res.json())
      .then((data) => {
        const main_value = JSON.parse(data.value);
        localStorage.setItem("myapp-clone-id", main_value["myapp-clone-id"]);
        localStorage.setItem(
          "myapp-clone-contacts",
          main_value["myapp-clone-contacts"]
        );
        localStorage.setItem(
          "myapp-clone-Conversations",
          main_value["myapp-clone-Conversations"]
        );
        console.log(localStorage)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // for creating new id so we requre random id
  const handleCreate = (e) => {
    onSetID(uuidv4());
    setLogID("");
  };
  return (
    <>
      <h1 className="text-center">Login</h1>
      <div className="m-1 bg-red-400 text-white-200" style={errStyle}>
        {error}
      </div>
      <Container className="flex justify-center flex-wrap">
        <Form
          className="basis-2/3 sm:basis-1/2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="text-2xl sm:text-3xl">Your Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter id here"
              value={logID}
              onChange={(e) => {
                setLogID(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              We'll never share your id with anyone else.
            </Form.Text>
          </Form.Group>
          <div className="flex flex-wrap justify-center">
            <Button variant="primary" type="submit" className="m-2">
              Submit
            </Button>
            <Button variant="secondary" className="m-2" onClick={handleCreate}>
              Create new ID
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};
export default Login;
