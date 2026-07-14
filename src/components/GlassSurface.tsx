'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

interface GlassSurfaceProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  className?: string
}

export const GlassSurface = ({ children, className = '', ...props }: GlassSurfaceProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.01 }}
      className={`glass ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
