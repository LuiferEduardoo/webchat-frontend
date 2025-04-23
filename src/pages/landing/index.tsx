import React from "react";
import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

const Landing: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route
          path=""
          element={
            <>
              <Header />
              <Body />
              <Footer />
            </>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default Landing;
