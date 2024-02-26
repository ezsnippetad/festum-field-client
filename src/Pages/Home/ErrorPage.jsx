import React from 'react'
import { Link } from 'react-router-dom'
import Error from "../../../src/assets/images/svg/ErrorPage.svg"

const ErrorPage = () => {
    return (
        <div><div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
            <div className="rounded-lg bg-white p-8 text-center shadow-xl">
                {/* <h1 className="mb-4 text-4xl font-bold">404</h1> */}
                <div className=' w-full flex items-center justify-center'>
                    <img className='w-48 my-3' src={Error} alt="" />
                </div>
                <p className="text-gray-600 text-3xl">Oops! <br /> The page you are looking for could not be found.</p>
                <Link to="/" className="mt-4 inline-block rounded bg-chatlook-sky px-8 py-4 font-semibold duration-300 text-white "> Go back to Home </Link>
            </div>
        </div></div>
    )
}

export default ErrorPage