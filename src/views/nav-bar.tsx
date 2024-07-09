import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { UploadFiles } from "./file/upload-files";
import { RecentFiles } from "./file/recent-files";
import { Preferences } from "./edit/preferences";
import { Quit } from "./file/quit";
import { About } from "./help/about";
import "../main.css";
import { WindowsViews } from "./windows/windows-views";
import { Logo } from "../components/icons/logo";

export function NavBar() {
  return (
    <div>
      <Navbar
        className={"test-bg test-txt"}
        expand="lg"
        style={{ height: "35px" }}
      >
        <Navbar.Brand href="/">
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="File" id="basic-nav-dropdown">
              <UploadFiles />
              <RecentFiles />
              <NavDropdown.Divider />
              <Quit />
            </NavDropdown>
            <NavDropdown title="Edit" id="basic-nav-dropdown">
              <NavDropdown.Item className={"d-flex justify-content-between"}>
                <i className={"fas fa-close text-danger"}></i>
                <div className={"me-5"}>Load Files</div>
                <div> Ctrl+L</div>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <Preferences />
            </NavDropdown>
            <NavDropdown title="Windows" id="basic-nav-dropdown">
              <WindowsViews />
            </NavDropdown>
            <NavDropdown title="Help" id="basic-nav-dropdown">
              <NavDropdown.Item href="google.com" target={"_blank"}>
                <div className={"me-5"}>User Guide</div>
                <div></div>
              </NavDropdown.Item>
              <About />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
