import React from "react";
import { Footer as FooterFB } from "flowbite-react";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    // <div className="w-full absolute bottom-0 left-0">
    <div className="w-full">
      <FooterFB bgDark={true}>
        <div className="w-full">
          <div className="grid w-full grid-cols-2 gap-8 py-8 px-6 md:grid-cols-4">
            <div>
              <FooterFB.Title title="Company" />
              <FooterFB.LinkGroup col={true}>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='#'>Careers</Link>
                {/* <FooterFB.Link href="#">Careers</FooterFB.Link>
                <FooterFB.Link href="#">Brand Center</FooterFB.Link>
                <FooterFB.Link href="#">Blog</FooterFB.Link> */}
              </FooterFB.LinkGroup>
            </div>
            <div>
              <FooterFB.Title title="help center" />
              <FooterFB.LinkGroup col={true}>
                <Link to="#">Discord Server</Link>
                <Link to="#">Twitter</Link>
                <Link to="#">Facebook</Link>
                <Link to="#">Contact Us</Link>
              </FooterFB.LinkGroup>
            </div>
            <div>
              <FooterFB.Title title="legal" />
              <FooterFB.LinkGroup col={true}>
                <Link to="#">Privacy Policy</Link>
                <Link to="#">Licensing</Link>
                <Link to="#">Terms & Conditions</Link>
              </FooterFB.LinkGroup>
            </div>
            <div>
              <FooterFB.Title title="download" />
              <FooterFB.LinkGroup col={true}>
                <Link to="#">iOS</Link>
                <Link to="#">Android</Link>
                <Link to="#">Windows</Link>
                <Link to="#">MacOS</Link>
              </FooterFB.LinkGroup>
            </div>
          </div>
          <div className="w-full bg-gray-700 py-6 px-4 sm:flex sm:items-center sm:justify-between">
            <FooterFB.Copyright href="#" by="Ebuka Victor™" year={2022} />
            {/* <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <FooterFB.Icon href="#" icon={BsFacebook} />
              <FooterFB.Icon href="#" icon={BsInstagram} />
              <FooterFB.Icon href="#" icon={BsTwitter} />
              <FooterFB.Icon href="#" icon={BsGithub} />
              <FooterFB.Icon href="#" icon={BsDribbble} />
            </div> */}
          </div>
        </div>
      </FooterFB>
    </div>
  );
};

export default Footer;
