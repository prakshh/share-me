import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import {FcGoogle } from 'react-icons/fc'; 
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';

import { client } from '../client';

const Login = () => {

    const navigate = useNavigate();
    const responseGoogle = (response) => {

      // console.log(response); in console, it displays all info of account that is logged in, like access token, google id, profileObj, tokenId, tokenObj

      // making use of above info  in localStorage. Why? Because we want to create a new Sanity document
      localStorage.setItem('user', JSON.stringify(response.profileObj));
      // destructuring some of the documents
      const { name, googleId, imageUrl } = response.profileObj;
      // new Sanity document
      const doc = {
        _id: googleId,
        _type: 'user',
        userName: name,
        image: imageUrl,
      };

      // to connect the frontend to Sanity, to populate the database,
      // create a file for Sanity client side - src/client.js
      // take projectId and token from backend->sanity manage
      // import the client here 
      // add CORS origins in backend->sanity manage
      // recreate sanity token that has Editor permissions 

      client.createIfNotExists(doc).then(() => {
        navigate('/', { replace: true });
      });
    };

    return (
        <div className="flex justify-start items-center flex-col h-screen">
        <div className=" relative w-full h-full">
          <video
            src={shareVideo}
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            className="w-full h-full object-cover"
          />

<div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
          </div>


          </div>
          </div>
    )
}

export default Login
