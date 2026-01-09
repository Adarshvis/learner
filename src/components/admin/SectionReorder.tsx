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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="section-reorder-item"
    >
      <div className="drag-handle" {...attributes} {...listeners}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <circle cx="6" cy="4" r="1.5" />
          <circle cx="14" cy="4" r="1.5" />
          <circle cx="6" cy="10" r="1.5" />
          <circle cx="14" cy="10" r="1.5" />
          <circle cx="6" cy="16" r="1.5" />
          <circle cx="14" cy="16" r="1.5" />
        </svg>
      </div>
      <div className="section-info">
        <span className="section-name">{section.sectionName || section.sectionType || 'Unnamed Section'}</span>
        <span className="section-type">{section.sectionType}</span>
      </div>
      <div className="section-actions">
        <a
          href={`/admin/collections/${collectionSlug}/${section.id}`}
          className="edit-btn"
        >
          Edit
        </a>
        <span className={`status-badge ${section.status}`}>
          {section.status || 'active'}
        </span>
      </div>
    </div>
  )
}

interface SectionReorderProps {
  collectionSlug: string
  title?: string
}

export const SectionReorder: React.FC<SectionReorderProps> = ({ 
  collectionSlug,
  title = 'Reorder Sections'
}) => {
  const [sections, setSections] = useState<Section[]>([])
  const [originalSections, setOriginalSections] = useState<Section[]>([])
  const [loading, setLoading] = useState(true)
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
    fetchSections()
  }, [fetchSections])

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
      // Update each section's order field
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

  if (loading) {
    return (
      <div className="section-reorder-container">
        <div className="loading">Loading sections...</div>
      </div>
    )
  }

  return (
    <div className="section-reorder-container">
      <style>{`
        .section-reorder-container {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        .section-reorder-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .section-reorder-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #333;
        }
        .section-reorder-hint {
          color: #666;
          font-size: 0.875rem;
          margin-bottom: 16px;
        }
        .section-reorder-list {
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .section-reorder-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          border-bottom: 1px solid #eee;
          background: #fff;
          gap: 12px;
        }
        .section-reorder-item:last-child {
          border-bottom: none;
        }
        .section-reorder-item:hover {
          background: #f9f9f9;
        }
        .drag-handle {
          cursor: grab;
          color: #999;
          padding: 4px;
          display: flex;
          align-items: center;
        }
        .drag-handle:hover {
          color: #666;
        }
        .drag-handle:active {
          cursor: grabbing;
        }
        .section-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .section-name {
          font-weight: 500;
          color: #333;
        }
        .section-type {
          font-size: 0.75rem;
          color: #888;
          text-transform: capitalize;
        }
        .section-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .edit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 70px;
          padding: 8px 16px;
          background: #0066cc;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          box-sizing: border-box;
        }
        .edit-btn:hover {
          background: #0052a3;
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 70px;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          text-transform: capitalize;
          box-sizing: border-box;
        }
        .status-badge.active {
          background: #e6f4ea;
          color: #1e7e34;
        }
        .status-badge.draft {
          background: #fff3cd;
          color: #856404;
        }
        .status-badge.inactive {
          background: #fef2f2;
          color: #dc2626;
        }
        .loading, .error-message, .success-message {
          padding: 16px;
          border-radius: 8px;
          text-align: center;
        }
        .error-message {
          background: #f8d7da;
          color: #721c24;
          margin-bottom: 16px;
        }
        .success-message {
          background: #d4edda;
          color: #155724;
          margin-bottom: 16px;
        }
        .saving-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #666;
          font-size: 0.875rem;
        }
        .empty-state {
          padding: 40px;
          text-align: center;
          color: #666;
        }
        .action-buttons {
          display: flex;
          gap: 12px;
          margin-top: 20px;
          justify-content: flex-end;
        }
        .save-btn {
          padding: 10px 24px;
          background: #22c55e;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        .save-btn:hover:not(:disabled) {
          background: #16a34a;
        }
        .save-btn:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }
        .reset-btn {
          padding: 10px 24px;
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        .reset-btn:hover:not(:disabled) {
          background: #e5e7eb;
        }
        .reset-btn:disabled {
          color: #9ca3af;
          cursor: not-allowed;
        }
        .unsaved-badge {
          background: #fef3c7;
          color: #92400e;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.875rem;
          font-weight: 500;
        }
      `}</style>

      <div className="section-reorder-header">
        <h2>{title}</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {hasChanges && <span className="unsaved-badge">Unsaved changes</span>}
          {saving && (
            <div className="saving-indicator">
              <span>Saving...</span>
            </div>
          )}
        </div>
      </div>

      <p className="section-reorder-hint">
        Drag and drop to reorder sections. The order here determines the order on the frontend.
      </p>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {sections.length === 0 ? (
        <div className="empty-state">
          <p>No sections found. Add sections to this collection first.</p>
        </div>
      ) : (
        <>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sections.map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="section-reorder-list">
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

          <div className="action-buttons">
            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
              disabled={!hasChanges || saving}
            >
              Reset
            </button>
            <button
              type="button"
              className="save-btn"
              onClick={handleSave}
              disabled={!hasChanges || saving}
            >
              {saving ? 'Saving...' : 'Save Order'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default SectionReorder
