import React from 'react'
import Shimmer from './Shimmer';
import SkeletonElement from './SkeletonElement'

const  Skeletonquestion =({theme}) =>  {

  const themeClass = theme || "light" ; 
  return (
   
    <div className={`skeleton-wrapper ${themeClass} `}>

        <div className="skeleton-question">
            <SkeletonElement type="thumbnail"/>
            <SkeletonElement type="category"/>
            <SkeletonElement type="text"/>
            <SkeletonElement type="text"/>
            <SkeletonElement type="text"/>
        </div>
        <Shimmer/>
    </div>
    
  )
}

export default Skeletonquestion