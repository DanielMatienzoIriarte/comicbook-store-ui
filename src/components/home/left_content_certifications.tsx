import React from "react";

const LeftContentCertifications = () => {
  return (
    <div className="templatemo_content_left_section">                
      <a href="http://validator.w3.org/check?uri=referer">
        <img style={{ border:"0", width:"88px", height:"31px", marginTop: "8", marginBottom: "8" }} src="http://www.w3.org/Icons/valid-xhtml10" alt="Valid XHTML 1.0 Transitional" width="88" height="31" />
      </a>
      <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img style={{ border:"0", width:"88px", height: "31px", marginTop: "8", marginBottom: "8" }}  src="http://jigsaw.w3.org/css-validator/images/vcss-blue" alt="Valid CSS!" />
      </a>
    </div>
  );
}

export default LeftContentCertifications;