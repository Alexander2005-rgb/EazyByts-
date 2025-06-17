import React from 'react';

const Skills = () => {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-title">
          <h2>My Skills</h2>
        </div>
        <div className="skills-container">
          <div className="skill-card">
            <i className="fab fa-html5"></i>
            <h3>Frontend Development</h3>
            <p>HTML5, CSS3, JavaScript, React, Vue.js, Responsive Design, Accessibility</p>
          </div>
          <div className="skill-card">
            <i className="fas fa-server"></i>
            <h3>Backend Development</h3>
            <p>Node.js, Express, Python, Django, REST APIs, GraphQL, Authentication</p>
          </div>
          <div className="skill-card">
            <i className="fas fa-database"></i>
            <h3>Database Management</h3>
            <p>MongoDB, MySQL, PostgreSQL, Firebase, ORM/ODM, Data Modeling</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
