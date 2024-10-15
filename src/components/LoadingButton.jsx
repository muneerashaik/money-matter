import React from "react";
import { TailSpin } from "react-loader-spinner";
import { ACTION_TYPES } from "../contants";

const LoadingButton = ({ action, isLoading }) => {
  const renderButtonText = () => {
    switch (action) {
      case ACTION_TYPES.edit:
        return "Edit Transaction";
      case ACTION_TYPES.add:
        return "Add Transaction";
      default:
        break;
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
