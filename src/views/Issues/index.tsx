import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import Search from '../../components/Search'
import { Issue } from '../../models/Issue'
import { formatDate } from '../../utils'
import { getIssues, getUrlData, IssuesResponse } from '../../utils/API'

const Issues = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [issues, setIssues] = useState<Issue[]>([])
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState<string>('')
  const [isFetching, setFetchingState] = useState(false)
  const properties = ['Title', 'Created On', 'User', 'Comments', 'Status']
  const handleMessaging = (message: string) => {
    setMessage(message)
    setIssues([])
  }
  const fetchIssues = (repo: string) => {
    handleMessaging('')
    setFetchingState(true)
    getIssues(repo).then((response: IssuesResponse) => {
      setFetchingState(false)
      if (response.status === 200 && response.data) {
        if (response.data.length > 0) {
          setIssues(response.data)
        } else {
          handleMessaging('This repository has no issues, try another one.')
        }
      } else {
        handleMessaging(response.errMessage || 'Error completing request')
      }
    })
  }
  const handleSearch = () => {
    fetchIssues(query)
    setSearchParams({ repo: query })
  }
  const goToIssue = (id: number) => {
    const { owner, repo } = getUrlData(query)
    navigate(`/issue/${owner}/${repo}/${id}`)
  }

  useEffect(() => {
    const repo = searchParams.get('repo')
    if (repo) {
      setQuery(repo)
      fetchIssues(repo)
    }
  }, [])

  return (
    <div className="issues">
      <div className="issues__container">
        <h1 className="issues__title">Github Issues</h1>
        <Search
          value={query}
          handleInput={(val) => setQuery(val)}
          handleSearch={handleSearch}
        />
        <div className="issues__content">
          {isFetching && <Loader />}
          {message !== '' && (
            <p>{message}</p>
          )}
          {issues.length > 0 && (
            <div className="issues__table-container">
              <table className="issues__table">
                <thead>
                  <tr>
                    {properties.map((item) => (
                      <th className="issues__table-header" key={item}>{item}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="issues__table-body">
                  {issues.map((issue: Issue) => (
                    <tr key={issue.id} onClick={() => goToIssue(issue.number)}>
                      <td className="issues__table-data">{issue.title}</td>
                      <td className="issues__table-data">{formatDate(issue.created_at)}</td>
                      <td className="issues__table-data">{issue.user.login}</td>
                      <td className="issues__table-data">{issue.comments}</td>
                      <td className={`issues__table-data issue__state issue__state--${issue.state}`}>{issue.state}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Issues
