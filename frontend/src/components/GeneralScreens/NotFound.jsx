import React from "react";
import "../../css/NotFound.css"
const NotFound = () => {
  console.log("not found")
  return (
  <>
    <div className="notFound">

      <div className='stars'></div>
      <div className='stars2'></div>
      <div className='stars3'></div>
      <div className='category'>
        <span className="text404">
          404
        </span>
        <br />
        <span>
          PAGE NOT FOUND
        </span>
      </div>
    </div>

  </>

);
}

export default NotFound;