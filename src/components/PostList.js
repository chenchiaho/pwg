import PropTypes from 'prop-types'
import PostCard from './PostCard'
import Pagination from './Pagination'

const PostList = ({ posts, onViewPost, onEditPost, onDeletePost, currentPage, postsPerPage, totalPosts, onPageChange }) => {
    return (
        <div className="post-list-container">
            <div className="post-list">
                {posts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        onViewPost={onViewPost}
                        onEditPost={onEditPost}
                        onDeletePost={onDeletePost}
                    />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                postsPerPage={postsPerPage}
                totalPosts={totalPosts}
                onPageChange={onPageChange}
            />
        </div>
    )
}

PostList.propTypes = {
    posts: PropTypes.array.isRequired,
    onViewPost: PropTypes.func.isRequired,
    onEditPost: PropTypes.func.isRequired,
    onDeletePost: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    postsPerPage: PropTypes.number.isRequired,
    totalPosts: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
}

export default PostList
