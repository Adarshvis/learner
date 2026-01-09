'use client'

import React, { useEffect, useState, useCallback } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Section {
  id: string
  sectionName?: string
  sectionType?: string
  order?: number
  status?: string
}

interface SortableItemProps {
  section: Section
  collectionSlug: string
}

const SortableItem: React.FC<SortableItemProps> = ({ section, collectionSlug }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #eee',
    background: isDragging ? '#f0f9ff' : '#fff',
    gap: '12px',
  }

  return (
    <div ref={setNodeRef} style={style}>
      <div
        {...attributes}
        {...listeners}
        style={{
          cursor: 'grab',
          color: '#999',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <circle cx="6" cy="4" r="1.5" />
          <circle cx="14" cy="4" r="1.5" />
          <circle cx="6" cy="10" r="1.5" />
          <circle cx="14" cy="10" r="1.5" />
          <circle cx="6" cy="16" r="1.5" />
          <circle cx="14" cy="16" r="1.5" />
        </svg>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span style={{ fontWeight: 500, color: '#333' }}>
          {section.sectionName || section.sectionType || 'Unnamed Section'}
        </span>
        <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'capitalize' }}>
          {section.sectionType}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <a
          href={`/admin/collections/${collectionSlug}/${section.id}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '70px',
            padding: '8px 16px',
            background: '#0066cc',
            color: 'white',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
        >
          Edit
        </a>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '70px',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '0.875rem',
            fontWeight: 500,
            textTransform: 'capitalize',
            background: section.status === 'inactive' ? '#fef2f2' : '#e6f4ea',
            color: section.status === 'inactive' ? '#dc2626' : '#1e7e34',
          }}
        >
          {section.status || 'active'}
        </span>
      </div>
    </div>
  )
}

interface InlineSectionReorderProps {
  collectionSlug: string
}

export const InlineSectionReorder: React.FC<InlineSectionReorderProps> = ({ collectionSlug }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [sections, setSections] = useState<Section[]>([])
  const [originalSections, setOriginalSections] = useState<Section[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [hasChanges, setHasChanges] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const fetchSections = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/${collectionSlug}?sort=order&limit=100`)
      const data = await response.json()
      const docs = data.docs || []
      setSections(docs)
      setOriginalSections(docs)
      setHasChanges(false)
    } catch (err) {
      setError('Failed to load sections')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [collectionSlug])

  useEffect(() => {
    if (isOpen && sections.length === 0) {
      fetchSections()
    }
  }, [isOpen, sections.length, fetchSections])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = sections.findIndex((s) => s.id === active.id)
    const newIndex = sections.findIndex((s) => s.id === over.id)

    const newSections = arrayMove(sections, oldIndex, newIndex)
    setSections(newSections)
    setHasChanges(true)
    setSuccess(null)
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const updatePromises = sections.map((section: Section, index: number) =>
        fetch(`/api/${collectionSlug}/${section.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ order: index + 1 }),
        })
      )

      await Promise.all(updatePromises)
      setOriginalSections([...sections])
      setHasChanges(false)
      setSuccess('Order saved successfully!')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError('Failed to save order')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    setSections([...originalSections])
    setHasChanges(false)
    setError(null)
    setSuccess(null)
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setError(null)
      setSuccess(null)
    }
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          backgroundColor: isOpen ? '#4ade80' : '#5fcf80',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M3 2h10v1H3V2zm0 4h10v1H3V6zm0 4h10v1H3v-1zm0 4h10v1H3v-1z"/>
        </svg>
        {isOpen ? 'Close Reorder' : 'Reorder Sections'}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="currentColor"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        >
          <path d="M2 4l4 4 4-4H2z" />
        </svg>
      </button>

      {/* Inline Reorder Panel */}
      {isOpen && (
        <div
          style={{
            marginTop: '16px',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              borderBottom: '1px solid #eee',
              background: '#f9fafb',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontWeight: 600, color: '#333' }}>Drag to reorder sections</span>
              {hasChanges && (
                <span
                  style={{
                    background: '#fef3c7',
                    color: '#92400e',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  Unsaved changes
                </span>
              )}
            </div>
            {saving && <span style={{ color: '#666', fontSize: '0.875rem' }}>Saving...</span>}
          </div>

          {/* Messages */}
          {error && (
            <div
              style={{
                padding: '12px 16px',
                background: '#fef2f2',
                color: '#dc2626',
                borderBottom: '1px solid #fecaca',
              }}
            >
              {error}
            </div>
          )}
          {success && (
            <div
              style={{
                padding: '12px 16px',
                background: '#f0fdf4',
                color: '#16a34a',
                borderBottom: '1px solid #bbf7d0',
              }}
            >
              {success}
            </div>
          )}

          {/* Content */}
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
              Loading sections...
            </div>
          ) : sections.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
              No sections found. Add sections to this collection first.
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sections.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <div>
                  {sections.map((section) => (
                    <SortableItem
                      key={section.id}
                      section={section}
                      collectionSlug={collectionSlug}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}

          {/* Footer with buttons */}
          {sections.length > 0 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
                padding: '16px',
                borderTop: '1px solid #eee',
                background: '#f9fafb',
              }}
            >
              <button
                onClick={handleReset}
                disabled={!hasChanges || saving}
                style={{
                  padding: '10px 24px',
                  background: !hasChanges || saving ? '#e5e7eb' : '#f3f4f6',
                  color: !hasChanges || saving ? '#9ca3af' : '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: 500,
                  cursor: !hasChanges || saving ? 'not-allowed' : 'pointer',
                }}
              >
                Reset
              </button>
              <button
                onClick={handleSave}
                disabled={!hasChanges || saving}
                style={{
                  padding: '10px 24px',
                  background: !hasChanges || saving ? '#9ca3af' : '#22c55e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: 500,
                  cursor: !hasChanges || saving ? 'not-allowed' : 'pointer',
                }}
              >
                {saving ? 'Saving...' : 'Save Order'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default InlineSectionReorder
