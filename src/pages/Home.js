import React, { useEffect, useState } from "react";
import { getTestData } from "../services/apis";
import { urls } from "../services/urls";

function Home() {
  const [res, setRes] = useState();

  useEffect(() => {
    const api_response = getTestData(urls.test);
    // console.log(api_response);
    setRes(api_response);
  }, []);

  // console.log(res);

  return <div>Home Page</div>;
}

export default Home;
