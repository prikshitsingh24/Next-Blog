import React from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

export default function BlogAdditionComponent() {
  return (
    <div className="bg-black p-8 flex-column justify-center items-center h-screen">
        <div className="text-white text-xl my-5">Your Blog</div>
      <div className="bg-white p-8 rounded shadow-md w-100">
        <div className="mb-4">
          <label htmlFor="title" className="text-black block mb-1">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="py-2 px-3 w-full rounded border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="text-black block mb-1">
            Description:
          </label>
          <textarea
            id="description"
            className="py-2 px-3 w-full h-40 rounded border-gray-300 resize-none"
          />
        </div>
        <Button variant="contained" color="success">
          Add Blog
        </Button>
      </div>
    </div>
  );
}

