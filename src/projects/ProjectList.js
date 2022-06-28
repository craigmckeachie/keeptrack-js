import React from 'react';
import { MOCK_PROJECTS } from './MockProjects';
import PropTypes from 'prop-types';
import { Project } from './Project';

function ProjectList({ projects }) {
  return <pre>{JSON.stringify(MOCK_PROJECTS, null, ' ')}</pre>;
}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired,
};

export default ProjectList;
