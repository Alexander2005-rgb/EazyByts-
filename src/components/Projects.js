import React from 'react';

const Projects = ({ projects, onEdit, onDelete }) => {
  if (!projects) {
    return (
      <section id="projects" className="projects">
        <div className="container">
          <div className="section-title">
            <h2>My Projects</h2>
          </div>
          <p>Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-title">
          <h2>My Projects</h2>
        </div>
        <div className="projects-grid">
          {projects.length === 0 ? (
            <p>No projects to display.</p>
          ) : (
            projects.map((project) => (
              <div key={project._id} className="project-card">
                <div className="project-img">
                  <img src={project.imageUrl} alt={project.title} />
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
{Array.isArray(project.technologies) ? project.technologies.map((tech, index) => (
  <span key={index} className="project-tag">{tech.trim()}</span>
)) : project.technologies.split(',').map((tech, index) => (
  <span key={index} className="project-tag">{tech.trim()}</span>
))}
                  </div>
                  <div className="project-links">
                    {project.projectUrl && (
                      <a href={project.projectUrl} className="btn" target="_blank" rel="noopener noreferrer">Live Demo</a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} className="btn btn-outline" target="_blank" rel="noopener noreferrer">GitHub</a>
                    )}
                  </div>
                  <button
                    onClick={() => onEdit(project)}
                    style={{
                      marginTop: '8px',
                      padding: '6px 12px',
                      backgroundColor: '#1976d2',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '8px',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(project)}
                    style={{
                      marginTop: '8px',
                      padding: '6px 12px',
                      backgroundColor: '#d32f2f',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
