import { useState, useEffect } from 'react'

const useLoading = (isLoading) => {
    const [dots, setDots] = useState('')

    useEffect(() => {
        let interval
        if (isLoading) {
            interval = setInterval(() => {
                setDots((prev) => (prev.length < 3 ? prev + '.' : ''))
            }, 500)
        } else {
            setDots('')
        }
        return () => clearInterval(interval)
    }, [isLoading])

    return dots
}

export default useLoading
