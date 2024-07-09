import { Modal, NavDropdown, Row } from "react-bootstrap";
import React from "react";
import { Logo } from "../../components/icons/logo";
import YouWolTxt from "../../assets/YouWol-txt.svg";
import YouWolLog from "../../assets/YouWol_logo_1.svg";
import AboutBgImg from "../../assets/about-bg-img.png";
import AboutStressImg from "../../assets/about-stress-img.png";

export function About() {
  const [modalShow, setModalShow] = React.useState(false);
  const bgStyleImg = {
    backgroundImage: `url(${AboutBgImg}), url(${AboutStressImg})`,
    backgroundPosition: "right bottom, left top",
    backgroundRepeat: "no-repeat, repeat",
  };
  const sharedClassName =
    "d-flex align-content-center align-items-center justify-content-center flex-row";
  return (
    <>
      <NavDropdown.Item onClick={() => setModalShow(true)}>
        <div className={"me-5"}>About</div>
        <div></div>
      </NavDropdown.Item>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          className={"py-1 justify-content-center "}
          style={{
            background: "linear-gradient(90deg, #EEECDF 0%, #9F9E97 100%)",
          }}
        >
          <Logo w={"72px"} h={"72px"} />
          <Modal.Title id="contained-modal-title-vcenter">
            <div style={{ fontSize: "45px", textShadow: "1px 3px 2px black" }}>
              {"MecaFrac"} <small style={{ fontSize: "20px" }}>light</small>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            ...bgStyleImg,
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5))",
          }}
        >
          <Row>
            <div className={sharedClassName}>
              <h5 className={"me-2"}>MecaFrac:</h5>
              <p>{"v. 1.0"}</p>
            </div>
            <div className={sharedClassName}>
              <h5 className={"me-2"}>Arch:</h5>
              <p>v. 1.0</p>
            </div>
            <div className={sharedClassName}>
              <h5 className={"me-2"}>Build date:</h5>
              <p>June 6 2024</p>
            </div>
            <div className={sharedClassName}>
              <h5 className={"me-2"}>
                © 2019-2024 YouWol. All rights reserved.
              </h5>
              <p></p>
            </div>
            <div className={sharedClassName}>
              <img src={YouWolLog} alt={"about"} />
              <img src={YouWolTxt} alt={"about"} />
              <p></p>
            </div>
          </Row>
        </Modal.Body>
        {/*<Modal.Footer>*/}
        {/*    <Button onClick={() => setModalShow(false)}>Close</Button>*/}
        {/*</Modal.Footer>*/}
      </Modal>
    </>
  );
}
