interface User {
  login: string
  [k: string]: any
}

type IssueState = 'open' | 'closed' | 'all'

export interface Issue {
  title: string
  id: number
  number: number
  state: IssueState
  user: User
  comments: number
  created_at: string
  pull_request?: any
  comments_url: string
  body: string
  [k: string]: any
}

export interface IssueComment {
  id: number
  body: string
  user: User
  created_at: string
}


