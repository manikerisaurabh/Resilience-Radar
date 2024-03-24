import React from 'react'
import viteLogo from "/vite.svg";
import th from "/th.jpeg"

const Cards = () => {
  console.log("cards");
  return (
    <div className='my-4'>
              {/* card style 1 */}
      {/* <div className="card-group">
        <div className="card ">
          <img
            className="card-img-top"
            src="holder.js/100x180/"
            alt="Card image cap"
          />
          <div className="card-body">
            <h4 className="card-title">Title</h4>
            <p className="card-text">Text</p>
          </div>
        </div>
        <div className="card ">
          <img
            className="card-img-top"
            src="holder.js/100x180/"
            alt="Card image cap"
          />
          <div className="card-body">
            <h4 className="card-title">Title</h4>
            <p className="card-text">Text</p>
          </div>
        </div>
      </div> */}

      {/* <br /><br /><br /> */}

      {/* card style 2 */}
      {/* <div className="flex flex-row flex-wrap gap-4 row w-[100vw] bg-black py-10 px-4 text-nowrap">
        <div className="col-4">
          <div className="card max-w-[300px] min-h-[200px] max-h-[200px] shadow-md shadow-blue-600 hover:shadow-xl hover:shadow-purple-600 transition duration-500 ease-in-out hover:scale-105 p-0 ">
            <div className="card-body">
              <h3 className="card-title">Title</h3>
              <p className="card-text">Text</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card max-w-[300px] min-h-[200px] max-h-[200px] shadow-md shadow-blue-600 hover:shadow-xl hover:shadow-pink-600 transition duration-500 ease-in-out hover:scale-105 p-0">
            <div className="card-body">
              <h3 className="card-title">Title</h3>
              <p className="card-text">Text</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card max-w-[300px] min-h-[200px] max-h-[200px] shadow-md shadow-blue-700 hover:shadow-xl hover:shadow-rose-600 transition duration-500 ease-in-out hover:scale-105 p-0">
            <div className="card-body">
              <h3 className="card-title">Title</h3>
              <p className="card-text">Text</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card max-w-[300px] min-h-[200px] max-h-[200px] shadow-md shadow-blue-700 hover:shadow-xl hover:shadow-rose-600 transition duration-500 ease-in-out hover:scale-105 p-0">
            <div className="card-body">
              <h3 className="card-title">Title</h3>
              <p className="card-text">Text</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card max-w-[300px] min-h-[200px] max-h-[200px] shadow-md shadow-blue-700 hover:shadow-xl hover:shadow-rose-600 transition duration-500 ease-in-out hover:scale-105 p-0">
            <div className="card-body">
              <h3 className="card-title">Title</h3>
              <p className="card-text">Text</p>
            </div>
          </div>
        </div>
      </div> 

      /* <br /><br /><br /> */}

      {/* card style 3 */}
      <div className="flex flex-row flex-wrap row w-[100vw] py-10 px-4 text-nowrap">
        <div className="col-4">
          <div className="card max-w-[300px] min-h-[200px] max-h-[200px] shadow-md shadow-blue-600 hover:shadow-xl hover:shadow-purple-600 transition duration-500 ease-in-out hover:scale-105 p-0 ">
            <div className="card-body">
              <h3 className="card-title">Title</h3>
              <p className="card-text">Text</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card max-w-[300px] min-h-[200px] max-h-[200px] shadow-md shadow-blue-600 hover:shadow-xl hover:shadow-pink-600 transition duration-500 ease-in-out hover:scale-105 p-0">
            <div className="card-body">
              <h3 className="card-title">Title</h3>
              <p className="card-text">Text</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card max-w-[300px] min-h-[200px] max-h-[200px] shadow-md shadow-blue-700 hover:shadow-xl hover:shadow-rose-600 transition duration-500 ease-in-out hover:scale-105 p-0">
            <div className="card-body">
              <h3 className="card-title">Title</h3>
              <p className="card-text">Text</p>
            </div>
          </div>
        </div>
      </div>

      <br /><br /><br />

      {/* card model 4 */}

      <div className="flex flex-row flex-wrap gap-4  items-center justify-center">
        <div className="card max-md:w-[80vw] max-w-sm rounded-lg overflow-hidden shadow-sm shadow-black hover:shadow-md transition duration-500 ease-in-out transform hover:-translate-y-5 hover:scale-105">
          <img
            className="w-full"
            src={viteLogo}
            height={100}
            width={100}
            alt="Image description"
            />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-gray-700 text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

        <div className="card max-md:w-[80vw] max-w-sm rounded-lg overflow-hidden shadow-black shadow-md hover: transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
          <img
            className="w-full"
            src={viteLogo}
            height={100}
            width={100}
            alt="Image description"
            />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-gray-700 text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

        <div className="card max-md:w-[80vw] max-w-sm rounded-lg overflow-hidden shadow-md shadow-blue-600 hover:shadow-xl hover:shadow-green-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
          <img
            className="w-full"
            src={viteLogo}
            height={100}
            width={100}
            alt="Image description"
            />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-gray-700 text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

      </div>

      <br /><br /><br />

      {/* card model 5 */}

      <div className="flex flex-row flex-wrap gap-4  items-center justify-center">
        <div className="card max-md:w-[80vw] max-w-sm rounded-lg overflow-hidden shadow-md shadow-blue-600 hover:shadow-xl hover:shadow-purple-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
          <img
            className="w-full"
            src={viteLogo}
            height={100}
            width={100}
            alt="Image description"
            />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-gray-700 text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

        <div className="card max-md:w-[80vw] max-w-sm rounded-lg overflow-hidden shadow-md shadow-blue-600 hover:shadow-xl hover:shadow-amber-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
          <img
            className="w-full"
            src={viteLogo}
            height={100}
            width={100}
            alt="Image description"
            />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-gray-700 text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

        <div className="card max-md:w-[80vw] max-w-sm rounded-lg overflow-hidden shadow-md shadow-blue-600 hover:shadow-xl hover:shadow-green-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
          <img
            className="w-full"
            src={viteLogo}
            height={100}
            width={100}
            alt="Image description"
            />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-gray-700 text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

      </div>

      <br /><br /><br />

      {/* card model 6 */}

      <div className="flex flex-row flex-wrap gap-4  items-center justify-center">
        <div className="card max-md:w-[80vw] max-w-sm rounded-lg overflow-hidden shadow-md shadow-[#114232] hover:shadow-xl hover:shadow-yellow-500 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-gradient-to-r from-[#87A922] to-[#87A922]">
          <img
            className="w-full"
            src={viteLogo}
            height={100}
            width={100}
            alt="Image description"
            />
          <div className="px-6 py-4 text-[#F7F6BB]">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-gray-700 text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

        <div className="card max-md:w-[80vw] max-w-sm rounded-lg overflow-hidden shadow-md shadow-blue-600 hover:shadow-xl hover:shadow-amber-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-gradient-to-r from-[#EC8F5E] to-[#F3B664] ">
          <img
            className="w-full"
            src={viteLogo}
            height={100}
            width={100}
            alt="Image description"
            />
          <div className="px-6 py-4 text-[#F1EB90]">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-[#EEE] text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

        <div className="card max-md:w-[80vw] max-w-sm rounded-lg overflow-hidden shadow-md shadow-blue-600 hover:shadow-xl hover:shadow-green-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-gradient-to-r from-[#070F2B] to-[#1B1A55] text-white">
          <img
            className="w-full"
            src={viteLogo}
            height={100}
            width={100}
            alt="Image description"
            />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-[#9290C3] text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

      </div>

      <br /><br /><br />

      {/* card model 7 */}

      <div className="flex flex-row flex-wrap gap-4  items-center justify-center">
        <div className="card p-0 max-md:w-[80vw] max-w-sm rounded-lg overflow-hidden shadow-md shadow-[#9400FF] hover:shadow-xl hover:shadow-[#49108B] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-[#1e0345ea]">
          <img
            className="w-full"
            src={th}
            height={100}
            width={100}
            alt="Image description"
            />
          <div className="px-6 py-4 text-[#000]">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-[#000] text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

        <div className="card max-md:w-[80vw] max-w-sm rounded-lg overflow-hidden shadow-md shadow-blue-600 hover:shadow-xl hover:shadow-amber-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-gradient-to-r from-[#EC8F5E] to-[#F3B664] ">
          <img
            className="w-full"
            src={viteLogo}
            height={100}
            width={100}
            alt="Image description"
            />
          <div className="px-6 py-4 text-[#F1EB90]">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-[#EEE] text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

        <div className="card max-md:w-[80vw] max-w-sm rounded-lg overflow-hidden shadow-md shadow-blue-600 hover:shadow-xl hover:shadow-green-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-gradient-to-r from-[#070F2B] to-[#1B1A55] text-white p-0">
          <img
            className="w-full"
            src={viteLogo}
            height={100}
            width={100}
            alt="Image description"
            />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-[#9290C3] text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

      </div>

      <br /><br /><br />

      {/* card model 8 */}

      <div className="flex flex-row flex-wrap gap-4  items-center justify-center">
        <div className="card p-0  max-w-sm max-md:max-w-xs rounded-lg overflow-hidden shadow-md shadow-[#9400FF] hover:shadow-xl hover:shadow-[#49108B] transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-[#1e0345ea]">
          <img
            className="w-full"
            src={th}
            height={100}
            width={100}
            alt="Image description"
            />
          <div className="px-6 py-4 text-[#000]">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-[#000] text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

        <div className="card max-md:w-[80vw] max-w-sm rounded-lg overflow-hidden shadow-md shadow-blue-600 hover:shadow-xl hover:shadow-amber-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-gradient-to-r from-[#EC8F5E] to-[#F3B664] ">
          <img
            className="w-full"
            src={viteLogo}
            height={100}
            width={100}
            alt="Image description"
            />
          <div className="px-6 py-4 text-[#F1EB90]">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-[#EEE] text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

        <div className="card max-md:w-[80vw] max-w-sm rounded-lg overflow-hidden shadow-md shadow-blue-600 hover:shadow-xl hover:shadow-green-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 bg-gradient-to-r from-[#070F2B] to-[#1B1A55] text-white p-0">
          <img
            className="w-full"
            src={viteLogo}
            height={100}
            width={100}
            alt="Image description"
            />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Card Title</div>
            <p className="text-[#9290C3] text-base">
              Your description goes here. It can be as long or as short as you
              want it to be.
            </p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Cards