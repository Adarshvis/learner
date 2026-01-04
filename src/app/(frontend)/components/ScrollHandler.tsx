'use client'

import { useEffect } from 'react'

export default function ScrollHandler() {
  useEffect(() => {
    function toggleScrolled() {
      const selectBody = document.querySelector('body')
      const selectHeader = document.querySelector('.header')
      if (!selectBody || !selectHeader) return
      
      if (window.scrollY > 100) {
        selectBody.classList.add('scrolled')
      } else {
        selectBody.classList.remove('scrolled')
      }
    }

    // Add scroll event listener
    document.addEventListener('scroll', toggleScrolled)
    
    // Call on load
    toggleScrolled()

    // Cleanup
    return () => {
      document.removeEventListener('scroll', toggleScrolled)
    }
  }, [])

  return null
}
