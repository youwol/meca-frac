import { NavDropdown, Navbar } from "react-bootstrap";
import React, { useEffect, useState } from "react";

interface UploadedFile {
  name: string;
  path: string;
}

export function RecentFiles() {
  const [recentFiles, setRecentFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    const savedFiles = localStorage.getItem("uploadedFiles");
    if (savedFiles) {
      setRecentFiles(JSON.parse(savedFiles));
    }
  }, []);

  const handleOpenFile = (file: UploadedFile) => {
    if (file.path.startsWith("blob:")) {
      const blob = new Blob([file.path], { type: "text/plain" });

      const reader = new FileReader();
      reader.onload = () => {
        //
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      reader.readAsText(blob);
    } else {
      console.error("Unsupported file path:", file.path);
    }
  };

  return (
    <div className={"d-flex justify-content-between dropdown-item"}>
      <Navbar.Collapse id="basic-navbar-nav">
        <NavDropdown
          className={"p-0"}
          title="Load Recent Files"
          id="basic-nav-dropdown"
          drop={"end"}
        >
          {recentFiles.map((file, index) => {
            return (
              <NavDropdown.Item
                key={`index-${index}`}
                className={"d-flex justify-content-between"}
                onClick={() => handleOpenFile(file)}
              >
                <div className={"me-5"}>{file.name}</div>
                <div></div>
              </NavDropdown.Item>
            );
          })}
        </NavDropdown>
      </Navbar.Collapse>
    </div>
  );
}
