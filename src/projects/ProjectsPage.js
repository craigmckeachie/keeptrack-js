import React, { useEffect } from 'react';
import ProjectList from './ProjectList';
import { useSelector, useDispatch } from 'react-redux';
import { loadProjects } from './state/projectsSlice';

function ProjectsPage() {
  const loading = useSelector((appState) => appState.projectState.loading);
  const projects = useSelector((appState) => appState.projectState.projects);
  const loadingError = useSelector(
    (appState) => appState.projectState.loadingError
  );
  const currentPage = useSelector((appState) => appState.projectState.page);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProjects(1));
  }, [dispatch]);

  const handleMoreClick = () => {
    dispatch(loadProjects(currentPage + 1));
  };

  return (
    <>
      <h1>Projects</h1>

      {loadingError && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {loadingError}
              </p>
            </section>
          </div>
        </div>
      )}

      <ProjectList projects={projects} />

      {!loading && !loadingError && (
        <div className="row">
          <div className="col-sm-12">
            <div className="button-group fluid">
              <button className="button default" onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

export default ProjectsPage;
