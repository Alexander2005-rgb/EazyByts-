import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import axios from 'axios';

const Home = () => {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      {loading ? <p>Loading projects...</p> : <Projects projects={projects} />}
      <Contact />
    </>
  );
};

export default Home;
