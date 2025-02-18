import React, { use, useEffect } from "react";

import { useNavigate } from "react-router-dom";

function Protected({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  }, []);

  return children;
}

export default Protected;
