// import { Project } from '../Project';
// import {
//   LOAD_PROJECTS_REQUEST,
//   LOAD_PROJECTS_SUCCESS,
//   LOAD_PROJECTS_FAILURE,
//   DELETE_PROJECT_REQUEST,
//   DELETE_PROJECT_SUCCESS,
//   DELETE_PROJECT_FAILURE,
//   SAVE_PROJECT_REQUEST,
//   SAVE_PROJECT_SUCCESS,
//   SAVE_PROJECT_FAILURE,
// } from './projectTypes';

// export const initialProjectState = {
//   projects: [],
//   loading: false,
//   error: undefined,
//   page: 1,
// };

// export function projectReducer(state = initialProjectState, action) {
//   switch (action.type) {
//     case LOAD_PROJECTS_REQUEST:
//       return { ...state, loading: true, error: '' };
//     case LOAD_PROJECTS_SUCCESS:
//       let projects;
//       const { page } = action.payload;
//       if (page === 1) {
//         projects = action.payload.projects;
//       } else {
//         projects = [...state.projects, ...action.payload.projects];
//       }
//       return {
//         ...state,
//         loading: false,
//         page,
//         projects,
//         error: '',
//       };
//     case LOAD_PROJECTS_FAILURE:
//       return { ...state, loading: false, error: action.payload.message };
//     case SAVE_PROJECT_REQUEST:
//       return { ...state };
//     case SAVE_PROJECT_SUCCESS:
//       let updatedProject = new Project(action.payload);
//       if (updatedProject.isNew()) {
//         return {
//           ...state,
//           projects: [...state.projects, updatedProject],
//         };
//       } else {
//         return {
//           ...state,
//           projects: state.projects.map((project) => {
//             return project.id === action.payload.id
//               ? Object.assign(new Project(), project, updatedProject)
//               : project;
//           }),
//         };
//       }
//     case SAVE_PROJECT_FAILURE:
//       return { ...state, error: action.payload.message };
//     case DELETE_PROJECT_REQUEST:
//       return { ...state };
//     case DELETE_PROJECT_SUCCESS:
//       return {
//         ...state,
//         projects: state.projects.filter(
//           (project) => project.id !== action.payload.id
//         ),
//       };
//     case DELETE_PROJECT_FAILURE:
//       return { ...state, error: action.payload.message };
//     default:
//       return state;
//   }
// }
