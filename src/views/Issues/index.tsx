import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Search from '../../components/Search'
import { getIssues } from '../../utils/API'

const Issues = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [issues, setIssues] = useState([])
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState<string>('')
  const properties = ['Title', 'Created At', 'User', 'Comments', 'Status']
  const handleMessaging = (message: string) => {
    setMessage(message)
    setIssues([])
  }
  const fetchIssues = (repo: string, manualSearch?: boolean) => {
    getIssues(repo).then((response) => {
      if (response.error) {
        handleMessaging(response.error)
      } else {
        if (response.length > 0) {
          setMessage('')
          setIssues(response)
          if (manualSearch) {
            setSearchParams({ repo })
          }
        } else {
          handleMessaging('This repository has no issues, try another one.')
        }
      }
    })
  }
  const handleSearch = () => {
    fetchIssues(query, true)
  }
  const goToIssue = (id: number) => {
    navigate(`/issues/${id}`)
  }

  useEffect(() => {
    const repo = searchParams.get('repo')
    if (repo) {
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
          {message !== '' && (
            <p>{message}</p>
          )}
          {issues.length > 0 && (
            <table className="issues__table">
              <thead>
                <tr>
                  {properties.map((item) => (
                    <th className="issues__table-header" key={item}>{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="issues__table-body">
                {issues.map((issue: any) => (
                  <tr key={issue.id} onClick={() => goToIssue(issue.id)}>
                    <td className="issues__table-data">{issue.title}</td>
                    <td className="issues__table-data">{issue.created_at}</td>
                    <td className="issues__table-data">{issue.user.login}</td>
                    <td className="issues__table-data">{issue.comments}</td>
                    <td className="issues__table-data">{issue.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default Issues
