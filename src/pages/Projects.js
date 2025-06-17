import React, { useState, useEffect } from 'react';
import Projects from '../components/Projects';
import ProjectForm from '../components/ProjectForm';
import axios from 'axios';
import { Button, Box, Modal, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddClick = () => {
    setEditingProject(null);
    setModalOpen(true);
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Convert technologies string to array
      const projectData = {
        ...values,
        technologies: values.technologies.split(',').map(tech => tech.trim()).filter(tech => tech.length > 0),
      };

      if (editingProject) {
        // Update existing project
        await axios.patch(`/api/projects/${editingProject._id}`, projectData, config);
      } else {
        // Create new project
        await axios.post('/api/projects', projectData, config);
      }
      fetchProjects();
      setModalOpen(false);
    } catch (error) {
      console.error('Failed to save project:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormCancel = () => {
    setModalOpen(false);
  };

  const handleDeleteClick = async (projectId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`/api/projects/${projectId}`, config);
      fetchProjects(); // Refresh the project list
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>
      {/* <Button variant="contained" onClick={handleAddClick} sx={{ mb: 2 }}>
        Add New Project
      </Button> */}
      {loading ? (
        <Typography>Loading projects...</Typography>
      ) : (
        <Projects projects={projects} onEdit={handleEditClick} onDelete={handleDeleteClick} />
      )}
      <Modal open={modalOpen} onClose={handleFormCancel}>
        <Box sx={style}>
          <ProjectForm
            initialValues={
              editingProject || {
                title: '',
                description: '',
                technologies: '',
                imageUrl: '',
                projectUrl: '',
                githubUrl: '',
              }
            }
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default ProjectsPage;
