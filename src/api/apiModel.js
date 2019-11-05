const apiModel = {
  // Auth
  signIn: {
    url: 'auth',
    options: {
      method: 'POST',
    },
  },
  signUp: {
    url: 'auth/signUp',
    options: {
      method: 'POST',
    },
  },
  signUpEmail: {
    url: 'auth/signUp/resend',
    options: {
      method: 'POST',
    },
  },
  confirmEmail: {
    url: 'auth/confirmEmail/{code}',
  },
  resetPasswordEmail: {
    url: 'auth/reset/request',
    options: {
      method: 'POST',
    },
  },
  resetPassword: {
    url: 'auth/reset',
    options: {
      method: 'POST',
    },
  },
  // Contact us
  contactUs: {
    url: '/contactUs',
    options: {
      method: 'POST',
    },
  },
  // Profile
  getProfile: {
    url: 'users/profile',
  },
  putProfile: {
    url: 'users/profile',
    options: {
      method: 'PUT',
    },
  },
  deleteProfile: {
    url: 'users/profile',
    options: {
      method: 'DELETE',
    },
  },
  // Projects
  createProject: {
    url: 'projects',
    options: {
      method: 'POST',
    },
  },
  getProjects: {
    url: 'projects',
  },
  refreshKey: {
    url: 'projects/{projectID}/refreshAPIKey',
  },
  setSpendingLimit: {
    url: 'projects/{projectID}/{limit}',
  },
  withdraw: {
    url: 'projects/{projectID}/transactions',
  },
  deleteProject: {
    url: '/projects/{projectID}',
    options: {
      method: 'DELETE',
    },
  },
};

export default apiModel;
