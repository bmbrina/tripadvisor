import { useEffect, useState } from "react"
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import Loader from "../../components/Loader"
import { Issue, IssueComment } from "../../models/Issue"
import { buildURL, CommentsResponse, getComments, getIssue, IssueResponse } from "../../utils/API"
import 'github-markdown-css/github-markdown-light.css'
import CommentCard from "../../components/CommentCard"
import { formatDate } from "../../utils"

const Issue = () => {
  const params = useParams()
  const [issue, setIssue] = useState<Issue | undefined>(undefined)
  const [isFetching, setFetchingState] = useState(true)
  const [message, setMessage] = useState('')
  const [comments, setComments] = useState<IssueComment[] | undefined>(undefined)
  const [repoUrl, setRepoUrl] = useState('')

  const handleError = (message?: string) => {
    setMessage((message || 'Error completing request'))
  }

  useEffect(() => {
    if (params && params.owner && params.repo && params.id) {
      const { owner, repo, id } = params
      setRepoUrl(buildURL(owner, repo))
      getIssue(owner, repo, id).then((response: IssueResponse) => {
        setFetchingState(false)
        if (response.status === 200) {
          setIssue(response.data)

          if (response.data && response.data.comments > 0) {
            const { comments_url } = response.data
            getComments(comments_url).then((res: CommentsResponse) => {
              if (res.status === 200 && res.data) {
                setComments(res.data)
              }
            })
          }
        } else {
          handleError(response.errMessage)
        }
      })
    } else {
      setFetchingState(false)
      handleError()
    }
  }, [])

  return (
    <div className={`issue ${isFetching && 'issue--fetching'}`}>
      {isFetching && <Loader />}
      <div className="issue__container">
        {message !== '' && (
          <p>{message}</p>
        )}
        {issue && (
          <>
            <Link to={`/issues?repo=${repoUrl}`} className="issue__link">Go to Issues List</Link>
            <h1 className="issue__title">{issue.title}</h1>
            <p className="issue__text"><span>Created On:</span> {formatDate(issue.created_at)}</p>
            <p className={`issue__text issue__state issue__state--${issue.state}`}><span>Status:</span> {issue.state}</p>
            <hr className="issue__divider" />
            <section className="issue__content markdown-body">
              <ReactMarkdown children={issue.body} rehypePlugins={[rehypeHighlight]} />
            </section>
            <section className="issue__comments">
              <p className="issue__subtitle">Comments</p>
              {comments && (
                <div className="issue__comments-container">
                  {comments.map((comment: IssueComment) => (
                    <CommentCard
                      body={comment.body}
                      user={comment.user.login}
                      createdAt={comment.created_at}
                      key={comment.id}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
        {!comments && !isFetching && <p>This issue has no comments.</p>}
      </div>
    </div>
  )
}

export default Issue
