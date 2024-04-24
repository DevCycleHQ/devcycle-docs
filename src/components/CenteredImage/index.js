import React from 'react'
import styles from './styles.module.css'

export function CenteredImage({ src, height, alt }) {
  return <div className={styles.centeredRow}>
    <img src={src} style={{maxHeight: `${height}px`}} alt={alt}/>
  </div>
}
