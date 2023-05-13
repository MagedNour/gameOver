import React from 'react';

function LoadingScreen(props) {
    return (
        <>
        <div className="vh-100 d-flex justify-content-center align-items-center bg-primary bg-opacity-50">
            <i className="fa-solid fa-spinner fa-spin fa-7x"></i>
        </div>
        </>
    );
}

export default LoadingScreen;