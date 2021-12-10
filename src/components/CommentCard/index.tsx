import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'github-markdown-css/github-markdown-light.css'
import { formatDate } from '../../utils'

interface CommentCardProps {
  body: string
  user: string
  createdAt: string
}

const CommentCard = ({ body, user, createdAt }: CommentCardProps) => {
  return (
    <div className="comment">
      <div className="comment__header">
        <p className="comment__title">{user} <span>commented on: {formatDate(createdAt)}</span></p>
      </div>
      <div className="comment__body markdown-body">
        <ReactMarkdown children={body} rehypePlugins={[rehypeHighlight]} />
      </div>
    </div>
  )
}

export default CommentCard
