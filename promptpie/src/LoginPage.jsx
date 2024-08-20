import React from "react";
import LoginImage from './Images/login2.png'
import googleicon from './Images/googleicon.png'
import robo from './Images/robota.png'

const Login2 = () => {
  return (
    <div className="bg-slate-300 w-full h-full">
      <div className="text-xl  ml-4 pt-2">Signup</div>
      <div className="flex flexrow border bg-white m-8 mx-12 border-bg-black rounded-lg pb-20">
        <div className="basis-1/2 scale-125 mt-20 ml-20 ">
          <img src={LoginImage} className=""></img>
        </div>
        
        <div className="basis-1/2 text-6xl font-bold static">
        <img src={robo} className="w-44 h-44 mt-5 ml-10 absolute top-12  "></img>
          <div className="mt-32">PROMPTPIE</div>
          <div class="mt-6">
            <label
              for="last-name"
              class="block text-lg mr-60 mb-2 font-normal leading-6 text-gray-900"
            >
              First name
            </label>
            <input
              placeholder=""
              type="text"
              name="last-name"
              id="last-name"
              autocomplete="family-name"
              class="outline-none font-thin text-base block w-7/12 rounded-md border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition ease-in-out hover:ring-blue-300 duration-300 delay-300 placeholder:text-gray-400 "
            ></input>
          </div>
          <div class="mt-4">
            <label
              for="last-name"
              class="block text-lg mr-60 mb-2 font-normal leading-6 text-gray-900"
            >
              Email Address
            </label>
            <input
              placeholder=""
              type="text"
              name="last-name"
              id="last-name"
              autocomplete="family-name"
              class="outline-none font-thin text-base block w-7/12 rounded-md border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition ease-in-out hover:ring-blue-300 duration-300 delay-300 placeholder:text-gray-400 "
            ></input>
          </div>
          <div class="mt-4">
            <label
              for="last-name"
              class="block text-lg mr-60 mb-2 font-normal leading-6 text-gray-900"
            >
              Password
            </label>
            <input
              placeholder=""
              type="text"
              name="last-name"
              id="last-name"
              class="outline-none font-thin text-base block w-7/12 rounded-md border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition ease-in-out hover:ring-blue-300 duration-300 delay-300 placeholder:text-gray-400 "
            ></input>
          </div>
          <button className="rounded-md bg-cyan-300 text-black w-44 h-10 ml-3 mt-6 ml-32 mb-2 text-sm font-medium">
            Sign Up
          </button>
          <div className="flex flexrow">
            <div className="text-sm font-bold mt-6 ml-24 text-right">
              Already Have an Account ?
            </div>
            <button className="text-sm font-bold mt-6 text-left text-blue-600 ml-4">
              Login
            </button>
          </div>
          <div className="border border-slate-200 border-0.5 mt-6 w-7/12"></div>
          <button
            href="#"
            className="rounded-md flex ml-28 mt-8 bg-white border border-black border-1 px-4 py-1.5 text-base font-semibold text-black shadow-sm "
          >
            <img src={googleicon} className="w-6 h-6 mr-3"></img> Sign in with Google
          </button>

        </div>
      </div>
      <div className="text-slate-300">
        promptpie
      </div>
    </div>
  );
};

export default Login2;
