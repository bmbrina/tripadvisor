import Axios from 'axios'
const BASE_URL = 'https://api.github.com'

const getUrlData = (url: string) => {
  const base = 'https://github.com/'
  const properties = url.replace(base, '').split('/')

  return { owner: properties[0], repo: properties[1] }
}

export const getIssues = (url: string) => {
  const properties = getUrlData(url)
  const { owner, repo } = properties
  return Axios({
      url: `${BASE_URL}/repos/${owner}/${repo}/issues`,
    })
    .then((response) => response.data)
    .catch((err) => {
      return { error: err.toJSON().message}
    });
}

// Example url --> https://github.com/bmbrina/rick-and-morty

