import React, { Component } from "react";

class LogOut extends Component {
  logout = () => {
    fetch("http://localhost:3001/api/v1/logout")
      .then((response) => response.json())
      .then((response) => console.log(response));
  };
  render() {
    return <div onClick={this.logout}>Log Out</div>;
  }
}

export default LogOut;
