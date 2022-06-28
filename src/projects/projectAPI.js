import { Project } from './Project';

const url = `${process.env.REACT_APP_API_URL}/projects`;

function translateStatusToErrorMessage(status) {
  switch (status) {
    case 401:
      return 'Please login again.';
    case 403:
      return 'You do not have permission to view the project(s).';
    default:
      return 'There was an error retrieving the project(s). Please try again.';
  }
}

function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response) {
  return response.json();
}

// eslint-disable-next-line
function delay(ms) {
  return function (x) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

const projectAPI = {
  find(id, token) {
    const requestInit = {
      headers: { Authorization: 'Bearer ' + token },
    };
    return fetch(`${url}/${id}`, requestInit).then(checkStatus).then(parseJSON);
  },

  get(page = 1, limit = 20, token) {
    const requestInit = {
      headers: { Authorization: 'Bearer ' + token },
    };
    return (
      fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`, requestInit)
        // .then(delay(600))
        .then(checkStatus)
        .then(parseJSON)
        .then((projects) => {
          return projects.map((p) => {
            return new Project(p);
          });
        })
        .catch((error) => {
          console.log('log client error ' + error);
          throw new Error(
            'There was an error retrieving the projects. Please try again.'
          );
        })
    );
  },

  put(project, token) {
    return fetch(`${url}/${project.id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error) => {
        console.log('log client error ' + error);
        throw new Error(
          'There was an error updating the project. Please try again.'
        );
      });
  },
};

export { projectAPI };
