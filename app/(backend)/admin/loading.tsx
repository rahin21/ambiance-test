import React from "react";
import { ImSpinner } from "react-icons/im";

function Loading() {
  return (
    <div>
      <div className="flex h-screen items-center justify-center">
        <div className="flex items-center gap-3">
          <ImSpinner className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black" />
          <span className="text-black text-lg">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
