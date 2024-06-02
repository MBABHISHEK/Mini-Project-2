import React from 'react'
import '../../css/Skeleton.css'
const SkeletonElement =({type }) =>  {
  const classes =`skeleton ${type}`
  //console.log(type)
    return (
        <div className={classes}></div>
    
  )
}

export default SkeletonElement