import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../config'

const StatsBoxes = ({ userRole, token, totalPosts }) => {
    const [totalAccounts, setTotalAccounts] = useState(0)
    const [myPosts, setMyPosts] = useState(0)

    useEffect(() => {
        if (userRole === 'admin') {
            fetchTotalAccounts()
            fetchMyPosts()
        }
    }, [userRole])

    const fetchTotalAccounts = async () => {
        try {
            const response = await axios.get(`${config.baseUrl}/api/accounts`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(response)
            setTotalAccounts(response.data.accounts.length)
        } catch (err) {
            console.error('API Error:', err)
        }
    }

    const fetchMyPosts = async () => {
        try {
            const response = await axios.post(`${config.baseUrl}/api/posts/mypost`, { page: 1, limit: 1 }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setMyPosts(response.data.totalPosts)
        } catch (err) {
            console.error('API Error:', err)
        }
    }

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
