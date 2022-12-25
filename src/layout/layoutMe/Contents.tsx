import React, { createContext } from "react";
import { Outlet } from "react-router-dom";

export const CreateRefeshProject = createContext<any>(null);

function Contents() {
  const [refesh, setRefesh] = React.useState<any>(null);

  return (
    <CreateRefeshProject.Provider value={{ refesh, setRefesh }}>
      <div
        style={{
          minHeight: "75vh",
          borderRadius: "10px",
          marginTop: "100px",
        }}
      >
        <Outlet />
      </div>
    </CreateRefeshProject.Provider>
  );
}

export default Contents;
