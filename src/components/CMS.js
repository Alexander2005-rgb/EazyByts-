import React, { useState } from 'react';
import axios from 'axios';

const CMS = () => {
const [formData, setFormData] = useState({
    projectTitle: '',
    projectDescription: '',
    projectImage: '',
    projectTags: '',
    githubUrl: '',
    liveUrl: '',
    adminEmail: '',
    adminPassword: '',
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const [token, setToken] = useState(null);
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      let authToken = token;
      if (!authToken) {
        // Authenticate admin user to get token
        const authResponse = await axios.post('/api/auth/login', {
          email: formData.adminEmail,
          password: formData.adminPassword,
        });

        authToken = authResponse.data.token;
        if (!authToken) {
          setError('Authentication failed: No token received');
          return;
        }
        setToken(authToken);
      }

      // Prepare project data
      const projectData = {
        title: formData.projectTitle,
        description: formData.projectDescription,
        imageUrl: formData.projectImage,
        technologies: formData.projectTags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        githubUrl: formData.githubUrl,
        projectUrl: formData.liveUrl,
      };

      if (editingProjectId) {
        // Update existing project
        await axios.patch(`/api/projects/${editingProjectId}`, projectData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setMessage('Project updated successfully! The portfolio will update momentarily.');
      } else {
        // Submit new project to backend API
        await axios.post('/api/projects', projectData, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setMessage('Project added successfully! The portfolio will update momentarily.');
      }

      // Reset form and editing state
      setFormData({
        projectTitle: '',
        projectDescription: '',
        projectImage: '',
        projectTags: '',
        githubUrl: '',
        liveUrl: '',
        adminEmail: '',
        adminPassword: '',
      });
      setEditingProjectId(null);

      // Refresh projects list
      fetchProjects(authToken);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(`Error: ${err.response.data.message}`);
      } else {
        setError('An error occurred while saving the project.');
      }
    }
  };

  // Fetch projects list
  const fetchProjects = async (authToken) => {
    try {
      const response = await axios.get('/api/projects', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setProjects(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch projects.');
    }
  };

  // Fetch projects when token is set
  React.useEffect(() => {
    if (token) {
      fetchProjects(token);
    }
  }, [token]);

  // Handle edit button click
  const handleEditClick = (project) => {
    setEditingProjectId(project._id);
    setFormData({
      projectTitle: project.title || '',
      projectDescription: project.description || '',
      projectImage: project.imageUrl || '',
      projectTags: (project.technologies || []).join(', '),
      githubUrl: project.githubUrl || '',
      liveUrl: project.projectUrl || '',
      adminEmail: formData.adminEmail,
      adminPassword: formData.adminPassword,
    });
    setMessage(null);
    setError(null);
  };

  // Handle delete button click
  const handleDeleteClick = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    setMessage(null);
    setError(null);
    try {
      await axios.delete(`/api/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Project deleted successfully! The portfolio will update momentarily.');
      // Refresh projects list
      fetchProjects(token);
    } catch (err) {
      console.error(err);
      setError('Failed to delete project.');
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingProjectId(null);
    setFormData({
      projectTitle: '',
      projectDescription: '',
      projectImage: '',
      projectTags: '',
      githubUrl: '',
      liveUrl: '',
      adminEmail: formData.adminEmail,
      adminPassword: formData.adminPassword,
    });
    setMessage(null);
    setError(null);
  };

  return (
    <section id="cms" className="cms-section">
      <div className="container">
        <div className="cms-container">
          <div className="cms-header">
            <h2><i className="fas fa-cogs"></i> Content Management System</h2>
            <p>Update your portfolio content easily</p>
          </div>
          <form className="cms-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="projectTitle">Project Title</label>
              <input type="text" id="projectTitle" name="projectTitle" value={formData.projectTitle} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="projectDescription">Project Description</label>
              <textarea id="projectDescription" name="projectDescription" value={formData.projectDescription} onChange={handleChange} required></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="projectImage">Image URL</label>
              <input type="text" id="projectImage" name="projectImage" value={formData.projectImage} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="projectTags">Technologies (comma separated)</label>
              <input type="text" id="projectTags" name="projectTags" value={formData.projectTags} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="githubUrl">GitHub URL</label>
              <input type="url" id="githubUrl" name="githubUrl" value={formData.githubUrl} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="liveUrl">Live Demo URL</label>
              <input type="url" id="liveUrl" name="liveUrl" value={formData.liveUrl} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="adminEmail">Admin Email</label>
              <input type="email" id="adminEmail" name="adminEmail" value={formData.adminEmail} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="adminPassword">Admin Password</label>
              <input type="password" id="adminPassword" name="adminPassword" value={formData.adminPassword} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn">{editingProjectId ? 'Update Project' : 'Add Project'}</button>
            {editingProjectId && <button type="button" className="btn btn-secondary" onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>Cancel Edit</button>}
          </form>

          {projects.length > 0 && (
            <div className="project-list" style={{ marginTop: '20px' }}>
              <h3>Existing Projects</h3>
              <ul>
                {projects.map((project) => (
                  <li key={project._id} style={{ marginBottom: '10px' }}>
                    <strong>{project.title}</strong> - {project.description}
                    <button onClick={() => handleEditClick(project)} style={{ marginLeft: '10px' }}>Edit</button>
                    <button onClick={() => handleDeleteClick(project._id)} style={{ marginLeft: '10px' }}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default CMS;
