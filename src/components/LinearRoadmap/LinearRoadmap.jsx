import React, { useState, useEffect } from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import './LinearRoadmap.css'

const LinearRoadmap = () => {
  const [initiatives, setInitiatives] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { siteConfig } = useDocusaurusContext()
  const LINEAR_API_KEY = siteConfig.customFields?.LINEAR_API_KEY
  const LINEAR_API_URL = 'https://api.linear.app/graphql'

  const fetchInitiatives = async () => {
    if (!LINEAR_API_KEY) {
      setError(
        'Linear API key not found. Please set LINEAR_API_KEY environment variable.',
      )
      setLoading(false)
      return
    }

    // First, find the 2025 Roadmap initiative
    const findInitiativeQuery = `
      query {
        initiatives(first: 20) {
          nodes {
            id
            name
          }
        }
      }
    `

    try {
      // Find the 2025 Roadmap initiative ID
      const findResponse = await fetch(LINEAR_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: LINEAR_API_KEY,
        },
        body: JSON.stringify({
          query: findInitiativeQuery,
        }),
      })

      const findData = await findResponse.json()
      const roadmapInitiative = findData.data.initiatives.nodes.find(
        (init) => init.name === '2025 Roadmap',
      )

      if (!roadmapInitiative) {
        throw new Error('2025 Roadmap initiative not found')
      }

      // Now fetch the full initiative with projects
      const fullQuery = `
        query GetInitiativeProjects($id: String!) {
          initiative(id: $id) {
            id
            name
            description
            projects {
              nodes {
                id
                name
                description
                status {
                  name
                  type
                }
                state
                progress
                targetDate
                completedAt
                createdAt
                teams {
                  nodes {
                    name
                  }
                }
                labels {
                  nodes {
                    name
                    color
                    parent {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      `

      // Fetch the full initiative with projects
      const response = await fetch(LINEAR_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: LINEAR_API_KEY,
        },
        body: JSON.stringify({
          query: fullQuery,
          variables: { id: roadmapInitiative.id },
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.errors) {
        throw new Error(data.errors[0].message)
      }

      // Set the projects from the 2025 Roadmap initiative as our "initiatives" for display
      const projects = data.data.initiative.projects.nodes

      // Filter to only show projects with "Public Roadmap" label
      const publicRoadmapProjects = projects.filter((project) => {
        if (!project.labels || !project.labels.nodes) return false
        return project.labels.nodes.some(
          (label) => label.name.toLowerCase() === 'public roadmap',
        )
      })

      setInitiatives(publicRoadmapProjects)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching initiatives:', err)
      setError(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInitiatives()
  }, [])

  const openModal = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedProject(null)
    setIsModalOpen(false)
  }

  const categorizeProject = (project) => {
    // Check if project is completed
    if (
      project.completedAt ||
      (project.state && project.state.toLowerCase().includes('completed')) ||
      (project.state && project.state.toLowerCase().includes('complete')) ||
      (project.status &&
        project.status.name &&
        project.status.name.toLowerCase().includes('complete'))
    ) {
      return 'completed'
    }

    // Check if project is currently active/in progress
    if (
      project.state &&
      (project.state.toLowerCase().includes('started') ||
        project.state.toLowerCase().includes('progress') ||
        project.state.toLowerCase().includes('active') ||
        project.state.toLowerCase().includes('in progress'))
    ) {
      return 'in-progress'
    }

    // Everything else is planned
    return 'planned'
  }

  // Sort planned projects to put items with target dates first
  const sortPlannedProjects = (projects) => {
    return projects.sort((a, b) => {
      // Items with target dates come first
      if (a.targetDate && !b.targetDate) return -1
      if (!a.targetDate && b.targetDate) return 1

      // If both have target dates, sort by date (earliest first)
      if (a.targetDate && b.targetDate) {
        return new Date(a.targetDate) - new Date(b.targetDate)
      }

      // If neither has target dates, maintain original order
      return 0
    })
  }

  const groupedProjects = {
    planned: sortPlannedProjects(
      initiatives.filter((project) => categorizeProject(project) === 'planned'),
    ),
    inProgress: initiatives.filter(
      (project) => categorizeProject(project) === 'in-progress',
    ),
    completed: initiatives
      .filter((project) => categorizeProject(project) === 'completed')
      .slice(0, 8), // Show more completed items
  }

  const calculateProgress = (project) => {
    if (!project.progress) return 0

    // Linear returns progress as a decimal (0.0 to 1.0), convert to percentage
    const progressValue = project.progress

    // If it's already a percentage (> 1), return as is
    if (progressValue > 1) {
      return Math.round(progressValue)
    }

    // If it's a decimal (0.0 to 1.0), convert to percentage
    return Math.round(progressValue * 100)
  }

  const formatDate = (dateString) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getPlatformLabels = (project) => {
    const labels = []
    // Projects have labels directly - filter to only show Platform labels, exclude Public Roadmap
    if (project.labels && project.labels.nodes) {
      project.labels.nodes.forEach((label) => {
        // Skip the "Public Roadmap" label (used only for filtering)
        if (label.name.toLowerCase() === 'public roadmap') {
          return
        }

        // Only include labels that are in the "Platforms" group
        if (label.parent && label.parent.name.toLowerCase() === 'platforms') {
          labels.push({
            name: label.name,
            color: label.color,
          })
        }
      })
    }
    return labels
  }

  const ProjectCard = ({ project }) => {
    const progress = calculateProgress(project)
    const platformLabels = getPlatformLabels(project)
    const projectCategory = categorizeProject(project)
    const isInProgress = projectCategory === 'in-progress'

    return (
      <div className="initiative-card" onClick={() => openModal(project)}>
        <div className="initiative-header">
          <h3 className="initiative-title">{project.name}</h3>
          {platformLabels.length > 0 && (
            <div className="initiative-teams">
              {platformLabels.slice(0, 2).map((label) => (
                <span
                  key={label.name}
                  className="initiative-team"
                  style={{
                    backgroundColor:
                      label.color || 'var(--ifm-color-primary-lightest)',
                    color: 'var(--ifm-color-primary-darkest)',
                  }}
                >
                  {label.name}
                </span>
              ))}
              {platformLabels.length > 2 && (
                <span className="initiative-team">
                  +{platformLabels.length - 2}
                </span>
              )}
            </div>
          )}
        </div>

        {project.description && (
          <p className="initiative-description">{project.description}</p>
        )}

        <div className="initiative-meta">
          {project.targetDate && projectCategory !== 'completed' && (
            <div className="initiative-date">
              📅 Target: {formatDate(project.targetDate)}
            </div>
          )}

          {project.completedAt && (
            <div className="initiative-date">
              ✅ Completed: {formatDate(project.completedAt)}
            </div>
          )}

          {isInProgress && progress > 0 && (
            <div className="initiative-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="progress-text">{progress}%</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  const ProjectModal = ({ project, isOpen, onClose }) => {
    if (!isOpen || !project) return null

    const progress = calculateProgress(project)
    const platformLabels = getPlatformLabels(project)
    const projectCategory = categorizeProject(project)
    const isInProgress = projectCategory === 'in-progress'

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-title-section">
              <h2 className="modal-title">{project.name}</h2>
              <div
                className={`modal-status-badge modal-status-${projectCategory}`}
              >
                {projectCategory === 'in-progress'
                  ? 'In Progress'
                  : projectCategory === 'planned'
                  ? 'Planned'
                  : 'Completed'}
              </div>
            </div>
            <button className="modal-close" onClick={onClose}>
              ×
            </button>
          </div>

          <div className="modal-body">
            {platformLabels.length > 0 && (
              <div className="modal-labels">
                <h4>Platform Labels</h4>
                <div className="label-list">
                  {platformLabels.map((label) => (
                    <span
                      key={label.name}
                      className="modal-label"
                      style={{
                        backgroundColor:
                          label.color || 'var(--ifm-color-primary-lightest)',
                        color: 'var(--ifm-color-primary-darkest)',
                      }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.description && (
              <div className="modal-description">
                <h4>Description</h4>
                <p>{project.description}</p>
              </div>
            )}

            <div className="modal-details">
              <div className="detail-row">
                <div className="detail-item">
                  <h4>Created</h4>
                  <p>{formatDate(project.createdAt)}</p>
                </div>
              </div>

              {project.targetDate && (
                <div className="detail-item">
                  <h4>Target Date</h4>
                  <p>📅 {formatDate(project.targetDate)}</p>
                </div>
              )}

              {project.completedAt && (
                <div className="detail-item">
                  <h4>Completed</h4>
                  <p>✅ {formatDate(project.completedAt)}</p>
                </div>
              )}

              {isInProgress && (
                <div className="detail-item">
                  <h4>Progress</h4>
                  <div className="modal-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{progress}%</span>
                  </div>
                </div>
              )}

              {project.state && (
                <div className="detail-item">
                  <h4>Current Status</h4>
                  <p>{project.state}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const RoadmapColumn = ({ title, projects, className }) => (
    <div className={`roadmap-column ${className}`}>
      <div className="column-header">
        <h2 className="column-title">{title}</h2>
        <span className="column-count">({projects.length})</span>
      </div>
      <div className="column-content">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {projects.length === 0 && (
          <div className="empty-column">No projects</div>
        )}
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="roadmap-container">
        <div className="loading">Loading roadmap...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="roadmap-container">
        <div className="error">
          <h3>Error loading roadmap</h3>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="roadmap-container">
      <div className="roadmap-header">
        <h1>2025 Roadmap Projects</h1>
        <p>Projects from our 2025 Roadmap initiative organized by status</p>
      </div>

      <div className="roadmap-grid">
        <RoadmapColumn
          title="Planned"
          projects={groupedProjects.planned}
          className="column-planned"
        />
        <RoadmapColumn
          title="In Progress"
          projects={groupedProjects.inProgress}
          className="column-in-progress"
        />
        <RoadmapColumn
          title="Completed"
          projects={groupedProjects.completed}
          className="column-completed"
        />
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  )
}

export default LinearRoadmap
