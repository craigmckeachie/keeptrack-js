import React from 'react';
import ProjectList from './ProjectList';

import { useProjects } from './projectHooks';

function ProjectsPage() {
  const { data, isLoading, error, isFetching, page, setPage, isPreviousData } =
    useProjects();

  return (
    <>
      <h1>Projects</h1>
      {isLoading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
      {isFetching && <span className="toast">Refreshing...</span>}
      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error.message}
              </p>
            </section>
          </div>
        </div>
      )}
      {!isLoading && !error && <ProjectList projects={data} />}
      <div>Current Page: {page + 1}</div>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>{' '}
      <button
        onClick={() => {
          setPage((old) => old + 1);
        }}
        disabled={isPreviousData}
      >
        Next Page
      </button>
    </>
  );
}

export default ProjectsPage;
