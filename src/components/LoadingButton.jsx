import React from "react";
import { TailSpin } from "react-loader-spinner";

const LoadingButton = ({ action, isLoading }) => {
  const renderButtonText = () => {
    if (action === "edit") {
      return "Edit Transaction";
    } else if (action === "add") {
      return "Add Transaction";
    }
  };

  return (
    <button
      type="submit"
      className="flex justify-center items-center mt-5  bg-blue-500 text-white font-medium text-sm rounded-lg h-12 w-full "
    >
      {isLoading ? (
        <TailSpin
          visible={true}
          height="30"
          width="30"
          color="white"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        renderButtonText()
      )}
    </button>
  );
};

export default LoadingButton;
