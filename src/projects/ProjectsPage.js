import React, { useState } from 'react';
import ProjectList from './ProjectList';

import { useGetProjectsQuery } from './projectAPI';

function ProjectsPage() {
  // const loading = useSelector((appState) => appState.projectState.loading);
  // const projects = useSelector((appState) => appState.projectState.projects);
  // const loadingError = useSelector(
  //   (appState) => appState.projectState.loadingError
  // );
  // const currentPage = useSelector((appState) => appState.projectState.page);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadProjects(1));
  // }, [dispatch]);

  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetProjectsQuery(page);

  const handleMoreClick = () => {
    setPage((previousPage) => previousPage + 1);
  };
  return (
    <>
      <h1>Projects</h1>

      {error ? (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      ) : isLoading ? (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      ) : data ? (
        <ProjectList projects={data} />
      ) : null}

      {!isLoading && !error && (
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
    </>
  );
}

export default ProjectsPage;
