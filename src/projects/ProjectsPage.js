import React, { useState } from 'react';
import { MOCK_PROJECTS } from './MockProjects';
import ProjectList from './ProjectList';

function ProjectsPage() {
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const saveProject = (project) => {
    let updatedProjects = projects.map((p) => {
      return p.id === project.id ? project : p;
    });
    setProjects(updatedProjects);
  };
  return (
    <>
      <h1>Projects</h1>
      <ProjectList projects={projects} onSave={saveProject} />
    </>
  );
}

export default ProjectsPage;
