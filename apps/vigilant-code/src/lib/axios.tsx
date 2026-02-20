import axios from 'axios';

async function getIsDev() {
  const { isDev } = await window.api.isDev();
  return isDev;
}
function getBaseUrl(): string {
  const isDev = getIsDev();

  return isDev ? 'http://localhost:3333/api/v1' : '';
}

export const apiClient = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setBaseURL = (workspaceName: string) => {
  if (!getIsDev()) {
    const reversedDomain = workspaceName.split('.').reverse().join('.');
    apiClient.defaults.baseURL = `https://${reversedDomain}/api/v1`;
  } else {
    apiClient.defaults.baseURL = `http://localhost:3333/api/v1`;
  }
};

