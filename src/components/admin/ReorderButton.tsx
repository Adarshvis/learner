'use client'

import React from 'react'

interface ReorderButtonProps {
  collectionSlug: string
}

export const ReorderButton: React.FC<ReorderButtonProps> = ({ collectionSlug }) => {
  return (
    <a
      href={`/admin/reorder/${collectionSlug}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        backgroundColor: '#0066cc',
        color: 'white',
        borderRadius: '4px',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: 500,
        marginBottom: '16px',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M2 4h12v1H2V4zm0 3.5h12v1H2v-1zm0 3.5h12v1H2v-1z"/>
      </svg>
      Reorder Sections
    </a>
  )
}

export default ReorderButton
