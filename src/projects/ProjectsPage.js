import React, { useState, useEffect } from "react";
import ProjectList from "./ProjectList";
import { projectAPI } from "./projectAPI";
import { Project } from "./Project";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const data = await projectAPI.get(currentPage);
        if (currentPage === 1) {
          setProjects(data);
        } else {
          setProjects((projects) => [...projects, ...data]);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, [currentPage]);

  const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const saveProject = (project) => {
    projectAPI
      .put(project)
      .then((updatedProject) => {
        let updatedProjects = projects.map((p) => {
          return p.id === project.id ? new Project(updatedProject) : p;
        });
        setProjects(updatedProjects);
      })
      .catch((e) => {
        setError(e.message);
      });
  };
  return (
    <>
      <h1>Projects</h1>
      <section className="panel">
        {error && (
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
        )}

        <ProjectList projects={projects} onSave={saveProject} />

        {!loading && !error && (
          <div className="center">
            <button className="large" onClick={handleMoreClick}>
              More...
            </button>
          </div>
        )}

        {loading && (
          <div className="center-page">
            <span className="spinner primary"></span>
            <p>Loading...</p>
          </div>
        )}
      </section>
    </>
  );
}

export default ProjectsPage;
