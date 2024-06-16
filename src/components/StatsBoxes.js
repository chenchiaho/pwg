import React from 'react'

const StatsBoxes = ({ userRole, token, totalPosts, totalAccounts, myPosts }) => {
    return (
        <div className="stats-boxes">
            <div className="stats-boxes__box stats-boxes__box--total-accounts">
                <p className="stats-boxes__label">Total Account</p>
                <h3 className="stats-boxes__value">{totalAccounts}</h3>
            </div>
            <div className="stats-boxes__box stats-boxes__box--total-posts">
                <p className="stats-boxes__label">Total Post</p>
                <h3 className="stats-boxes__value">{totalPosts}</h3>
            </div>
            <div className="stats-boxes__box stats-boxes__box--my-posts">
                <p className="stats-boxes__label">My Post</p>
                <h3 className="stats-boxes__value">{myPosts}</h3>
            </div>
        </div>
    )
}

export default StatsBoxes
