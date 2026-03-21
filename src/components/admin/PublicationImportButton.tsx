'use client'

import React, { useState } from 'react'

interface ImportResult {
  success: boolean
  message: string
  results?: {
    imported: number
    skipped: number
    errors: number
    details: Array<{ title: string; status: string; reason?: string }>
  }
}

const sources = [
  {
    id: 'google-scholar',
    name: 'Google Scholar',
    idLabel: 'Google Scholar Author ID',
    idPlaceholder: 'e.g., rSMl_OIAAAAJ',
    requiresApiKey: true,
    description: 'Import via SerpAPI (requires paid API key from serpapi.com)',
  },
  {
    id: 'orcid',
    name: 'ORCID',
    idLabel: 'ORCID ID',
    idPlaceholder: 'e.g., 0000-0002-1234-5678',
    requiresApiKey: false,
    description: 'Free API — enter your ORCID iD',
  },
  {
    id: 'crossref',
    name: 'CrossRef',
    idLabel: 'Author Name',
    idPlaceholder: 'e.g., John Smith',
    requiresApiKey: false,
    description: 'Free API — search by author name',
    isQuery: true,
  },
  {
    id: 'semantic-scholar',
    name: 'Semantic Scholar',
    idLabel: 'Semantic Scholar Author ID',
    idPlaceholder: 'e.g., 1741101',
    requiresApiKey: false,
    description: 'Free API — find your Author ID on semanticscholar.org',
  },
]

export const PublicationImportButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedSource, setSelectedSource] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ImportResult | null>(null)
  const [error, setError] = useState('')

  const currentSource = sources.find((s) => s.id === selectedSource)

  const handleImport = async () => {
    if (!selectedSource || !authorId.trim()) {
      setError('Please select a source and enter the required ID/query')
      return
    }
    if (currentSource?.requiresApiKey && !apiKey.trim()) {
      setError('API key is required for this source')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const body: Record<string, string> = { source: selectedSource }
      if (currentSource?.isQuery) {
        body.query = authorId.trim()
      } else {
        body.authorId = authorId.trim()
      }
      if (currentSource?.requiresApiKey) {
        body.apiKey = apiKey.trim()
      }

      const response = await fetch('/api/publications/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Import failed')
        return
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setSelectedSource('')
    setAuthorId('')
    setApiKey('')
    setResult(null)
    setError('')
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <button
        onClick={() => {
          setIsOpen(!isOpen)
          if (isOpen) handleReset()
        }}
        type="button"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          backgroundColor: isOpen ? '#333' : '#0066cc',
          color: 'white',
          borderRadius: '4px',
          border: 'none',
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 1z" />
        </svg>
        {isOpen ? 'Close Import' : 'Import from External Source'}
      </button>

      {isOpen && (
        <div
          style={{
            marginTop: '12px',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#fafafa',
            maxWidth: '700px',
          }}
        >
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600 }}>
            Import Publications from External Source
          </h3>

          {/* Source Selection */}
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{ display: 'block', marginBottom: '6px', fontWeight: 500, fontSize: '14px' }}
            >
              Select Source
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {sources.map((source) => (
                <button
                  key={source.id}
                  type="button"
                  onClick={() => {
                    setSelectedSource(source.id)
                    setError('')
                    setResult(null)
                  }}
                  style={{
                    padding: '12px',
                    border:
                      selectedSource === source.id ? '2px solid #0066cc' : '1px solid #ccc',
                    borderRadius: '6px',
                    backgroundColor: selectedSource === source.id ? '#e6f0ff' : '#fff',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{source.name}</div>
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                    {source.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ID/Query Input */}
          {currentSource && (
            <>
              <div style={{ marginBottom: '12px' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontWeight: 500,
                    fontSize: '14px',
                  }}
                >
                  {currentSource.idLabel}
                </label>
                <input
                  type="text"
                  value={authorId}
                  onChange={(e) => setAuthorId(e.target.value)}
                  placeholder={currentSource.idPlaceholder}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* API Key Input (Google Scholar only) */}
              {currentSource.requiresApiKey && (
                <div style={{ marginBottom: '12px' }}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '6px',
                      fontWeight: 500,
                      fontSize: '14px',
                    }}
                  >
                    SerpAPI Key
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your SerpAPI key"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              )}

              {/* Import Button */}
              <button
                onClick={handleImport}
                type="button"
                disabled={loading}
                style={{
                  padding: '10px 24px',
                  backgroundColor: loading ? '#999' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: loading ? 'wait' : 'pointer',
                }}
              >
                {loading ? 'Importing...' : 'Fetch & Import Publications'}
              </button>
            </>
          )}

          {/* Error */}
          {error && (
            <div
              style={{
                marginTop: '12px',
                padding: '10px 14px',
                backgroundColor: '#fff3f3',
                border: '1px solid #e55',
                borderRadius: '4px',
                color: '#c00',
                fontSize: '14px',
              }}
            >
              {error}
            </div>
          )}

          {/* Results */}
          {result && (
            <div style={{ marginTop: '16px' }}>
              <div
                style={{
                  padding: '12px 16px',
                  backgroundColor: '#f0fff0',
                  border: '1px solid #4a4',
                  borderRadius: '4px',
                  marginBottom: '12px',
                  fontSize: '14px',
                }}
              >
                <strong>{result.message}</strong>
              </div>

              {result.results && result.results.details.length > 0 && (
                <div
                  style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                  }}
                >
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      fontSize: '13px',
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: '#f5f5f5' }}>
                        <th style={{ padding: '8px 12px', textAlign: 'left' }}>Title</th>
                        <th style={{ padding: '8px 12px', textAlign: 'left', width: '100px' }}>
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.results.details.map((item, i) => (
                        <tr
                          key={i}
                          style={{
                            borderTop: '1px solid #eee',
                            backgroundColor:
                              item.status === 'imported'
                                ? '#f0fff0'
                                : item.status === 'skipped'
                                  ? '#fffff0'
                                  : '#fff0f0',
                          }}
                        >
                          <td style={{ padding: '6px 12px' }}>
                            {item.title?.substring(0, 80)}
                            {item.title?.length > 80 ? '...' : ''}
                          </td>
                          <td style={{ padding: '6px 12px' }}>
                            <span
                              style={{
                                fontWeight: 600,
                                color:
                                  item.status === 'imported'
                                    ? '#28a745'
                                    : item.status === 'skipped'
                                      ? '#e6a817'
                                      : '#dc3545',
                              }}
                            >
                              {item.status}
                            </span>
                            {item.reason && (
                              <span style={{ color: '#999', marginLeft: '4px' }}>
                                ({item.reason})
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <button
                onClick={() => window.location.reload()}
                type="button"
                style={{
                  marginTop: '12px',
                  padding: '8px 16px',
                  backgroundColor: '#0066cc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Refresh List
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PublicationImportButton
