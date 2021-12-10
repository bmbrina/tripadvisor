import Axios from 'axios'
import { Issue } from '../models/Issue'

const BASE_URL = 'https://api.github.com'
const GITHUB_URL = 'https://github.com/'

interface APIResponse {
  status: number
  errMessage?: string
}

export interface IssuesResponse extends APIResponse {
  data?: Issue[]
}

export interface IssueResponse extends APIResponse {
  data?: Issue
}

export interface CommentsResponse extends APIResponse {
  data?: any
}

export const getUrlData = (url: string) => {
  const properties = url.replace(/\/$/, '').replace(GITHUB_URL, '').split('/')

  return { owner: properties[0], repo: properties[1] }
}

export const buildURL = (owner: string, repo: string) => {
  return `${GITHUB_URL}${owner}/${repo}`
}

const filterPullRequests = (issues: Issue[]) => {
  return issues.filter((issue: Issue) => !issue.pull_request)
}

export const getIssues = (url: string) => {
  const properties = getUrlData(url)
  const { owner, repo } = properties
  return Axios({
      url: `${BASE_URL}/repos/${owner}/${repo}/issues`,
    })
    .then((response) => {
      const filteredIssues = filterPullRequests(response.data)
      return { status: 200, data: filteredIssues}
    })
    .catch((err) => {
      return { status: 400, errMessage: err.toJSON().message }
    });
}

export const getIssue = (owner: string, repo: string, id: string) => {
  return Axios({
      url: `${BASE_URL}/repos/${owner}/${repo}/issues/${id}`,
    })
    .then((response) => {
      return { status: 200, data: response.data}
    })
    .catch((err) => {
      return { status: 400, errMessage: err.toJSON().message }
    });
}

export const getComments = (url: string) => {
  return Axios({
    url,
  })
  .then((response) => {
    return { status: 200, data: response.data}
  })
  .catch((err) => {
    return { status: 400, errMessage: err.toJSON().message }
  });
}

// Example url --> https://github.com/bmbrina/rick-and-morty

