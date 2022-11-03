import React from "react";
import landingIamge from "../images/landingImage.svg"
function LandingPage() {
  return (
    <div className="background-landing">
      <div className="landing-display">
        <div className="landing-display-left">
          <div className="landing-display-left-text-container">
            <h1>Endpoint:</h1>
            <h2>Making it count</h2>
          </div>
        </div>
              <div className="landing-display-right">
                  <img className="landing-image" src={landingIamge} />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
