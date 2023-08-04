import './error404.scss';

function NotFound404() {
    return (
        <div className='error-not-found-404'>
            <div className='error-not-found-container'>
                <div className='gif-video-404'>
                    <img src='/assets/images/dino.gif' alt='dino-error'/>
                </div>
                <div className='text-404'>
                    <h1>404</h1>
                    <h2>Oops, This page not found!</h2>
                </div>
            </div>
        </div>
    )
}

export default NotFound404;