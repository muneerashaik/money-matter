import React from "react";

const InputContainer = ({ children }) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};

export const InputLabel = ({ name }) => (
  <label className="text-sm font-medium text-slate-600">{name}</label>
);

export const SelectInput = (props) => {
  return (
    <select
      className="border-2 text-sm px-2 appearance-none rounded-lg h-[46px] text-slate-800 outline-none w-full"
      {...props}
    >
      {props.children}
    </select>
  );
};

export const InputElement = (props) => {
  return (
    <input
      className="border-2 text-sm pl-2 rounded-lg h-[46px] text-slate-800 placeholder:font-medium outline-none"
      {...props}
    />
  );
};

export default InputContainer;
