// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { projectAPI } from '../projectAPI';
// import { Project } from '../Project';

// export const loadProjects = createAsyncThunk(
//   'project/loadProjects',
//   async (page) => {
//     const projects = await projectAPI.get(page);
//     return { projects, page };
//   }
// );

// export const saveProject = createAsyncThunk(
//   'project/saveProject',
//   async (project) => {
//     return await projectAPI.put(project);
//   }
// );

// export const projectsSlice = createSlice({
//   name: 'projectState',
//   initialState: {
//     projects: [],
//     loading: false,
//     loadingError: undefined,
//     page: 1,
//     saving: false,
//     savingError: undefined,
//   },
//   reducers: {
//     // loadProjectsPending(state, action) {},
//     // loadProjectsFulfilled(state, action) {},
//     // loadProjectsRejected(state, action) {},
//     // saveProjectPending(state, action) {},
//     // saveProjectFulfilled(state, action) {},
//     // saveProjectRejected(state, action) {},
//   },
//   extraReducers: (builder) => {
//     builder.addCase(loadProjects.pending, (state, action) => {
//       state.loading = true;
//     });

//     builder.addCase(loadProjects.fulfilled, (state, action) => {
//       state.loading = false;
//       state.loadingError = undefined;
//       state.page = action.payload.page;
//       if (state.page === 1) {
//         state.projects = action.payload.projects;
//       } else {
//         state.projects = [...state.projects, ...action.payload.projects];
//       }
//     });

//     builder.addCase(loadProjects.rejected, (state, action) => {
//       state.loading = false;
//       state.loadingError = action.error.message;
//     });

//     builder.addCase(saveProject.pending, (state, action) => {
//       state.saving = true;
//     });

//     builder.addCase(saveProject.fulfilled, (state, action) => {
//       state.saving = false;
//       let updatedProject = new Project(action.payload);
//       if (updatedProject.isNew()) {
//         state.projects.push(updatedProject);
//       } else {
//         const index = state.projects.findIndex(
//           (project) => project.id === updatedProject.id
//         );
//         state.projects[index] = updatedProject;
//       }
//     });

//     builder.addCase(saveProject.rejected, (state, action) => {
//       state.saving = false;
//       state.savingError = action.payload.message;
//     });
//   },
// });
