import React from 'react'
import style from '../NotFound/NotFound.module.css'
import video from "../NotFound/puglisto.mp4"

export default function NotFound() {
  return (
    
       
    <video className={style.videonotfound} src={video} autoplay="true" muted="true" loop="true"> </video> 
    
  )
}
