import React from "react";

const Output = ({output}) => {
    const isError = output?.isError;
    let result = output?.result;
    result = result?.replace(/\n/g, "<br>");
    //console.log(result)
    return (
      <div className="w-full h-55">
          <h1 className="font-mono font-style: italic text-xl text-white bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
            Output
          </h1>
          <div
        className={`w-full h-56 rounded-md text-black bg-white font-normal text-sm overflow-y-auto ${
          isError ? "text-red-500" : "text-black"
        }`}
        dangerouslySetInnerHTML={{ __html: result }}
      />
        </div>
      );
}
export default Output