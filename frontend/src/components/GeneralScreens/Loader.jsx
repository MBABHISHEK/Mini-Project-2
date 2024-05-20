import React from 'react';
import '../../css/Loader.css'
const Loader = () => {
  console.log("loader")
  return (
     <div className="mask">
         <div className="loader"></div>
    </div>

  );
}

export default Loader;