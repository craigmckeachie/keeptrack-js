import React from 'react';
import { MOCK_PROJECTS } from './MockProjects';
import ProjectList from './ProjectList';

function ProjectsPage() {
  const saveProject = (project) => {
    console.log('Saving project: ', project);
  };
  return (
    <>
      <h1>Projects</h1>
      <ProjectList projects={MOCK_PROJECTS} onSave={saveProject} />
    </>
  );
}

export default ProjectsPage;
