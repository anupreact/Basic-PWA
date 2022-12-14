import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

const Users = () => {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState("online");

  useEffect(() => {
    let url = `https://jsonplaceholder.typicode.com/users`;

    axios
      .get(url)
      .then((res) => {
        console.log(res);
        setData(res.data);
        localStorage.setItem("Users", JSON.stringify(res.data));
      })
      .catch((error) => {
        let collection = localStorage.getItem("Users");
        setData(JSON.parse(collection));
        setMode("offline");
      });

    // console.log("Users ");
  }, []);

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        {mode === "offline" ? (
          <Alert variant="success">
            <Alert.Heading>You are in Offline Mode</Alert.Heading>
            <p>
              " Please check your Internet connection .There might be some issues with
              your Internet connection"
            </p>
            <hr />
           
          </Alert>
        ) : null}
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.address.street}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
