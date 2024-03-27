import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({ children, outlined, ...props }) => {
  if (outlined) {
    return (
      <Button
        variant="outlined"
        className="border-black text-black hover:border-black hover:text-black hover:bg-white"
        {...props}
      >
        {children}
      </Button>
    );
  } else
    return (
      <Button
        className="bg-black text-white hover:bg-black hover:text-white"
        {...props}
      >
        {children}
      </Button>
    );
};

export default CustomButton;
