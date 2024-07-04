import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { reterieveHelloWorldBean } from "./api/ApiServices";
import axios from "axios";

export default function Welcome() {
  const { username } = useParams();

  const [data, setData] = useState("");

  function handleApiCall() {
    console.log("called");

    // axios
    //   .get("http://localhost:8585/hello-world")
    //   .then((response) => setData(response.data))
    //   .catch((error) => console.log(error))
    //   .finally(() => console.log("done calling"));
    reterieveHelloWorldBean(username)
      .then((response) => setData(response.data.message))
      .catch((error) => console.log(error))
      .finally(() => console.log("cleaned up"));
  }
  return (
    <div>
      <h1>Welcome {username}</h1>
      <div className="welcome">
        Here is the link to manage your Todo List -{" "}
        <Link to="/todos">here</Link>
        <div>
          <button className="btn btn-success m-5" onClick={handleApiCall}>
            Call Hello World
          </button>
        </div>
        <div className="text-info">{data}</div>
      </div>
    </div>
  );
}
