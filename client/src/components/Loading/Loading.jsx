import React from 'react'
import style from '../Loading/Loading.module.css'

export default function Loading() {
  return (
    <div>
        <h1>Loading Dogs...</h1>
        <img className={style.loadingDog} src="https://cdn.dribbble.com/users/77598/screenshots/12570694/media/8eaa19b2448ee8719f559e4d1ec931bc.gif" alt="loading" />
    </div>
  )
}
