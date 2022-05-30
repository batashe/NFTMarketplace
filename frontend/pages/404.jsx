import React from 'react'
import NotFound from '../components/ui/NotFound';

const NotFoundPage = () => {
    return (
        <div>
            <NotFound status="404" name="Page Not Found" description="The page you are looking for doesn't exist" />
        </div>
    )
}

export default NotFoundPage;