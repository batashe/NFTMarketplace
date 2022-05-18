/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';

const LoginForm = () => {
  const [loginFormObject, setLoginFormObject] = useState({
    image: '',
    name: '',
    description: '',
    price: 0,
  });
  const [submitted, setSubmitted] = useState(false);

  const onHandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginFormObject({
      ...loginFormObject,
      [name]: value,
    });
  };

  const onSubmitLoginForm = () => {
    console.log('clicked on submit button', loginFormObject);
    setSubmitted(true);
  };
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(false);
  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      console.log('selected');
      let reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      console.log('not selected');
      setError(true);
    }
  };

  return (
    <>
      <div className="h-screen  flex justify-center items-center">
        <div className="lg:w-2/5 md:w-1/2 w-2/3">
          <div className="w-full bg-gray-800 h-screen">
            <div className="bg-gray-900 w-full shadow rounded p-8 sm:p-12 ">
              <p className="text-3xl font-bold leading-7 text-center text-white">
                Contact me
              </p>
              {/* <form> */}

              <div
                className=" imagePreview flex-initial w-1/2 pb-1/2  mt-12 h-40"
                style={{
                  background: imagePreview
                    ? `url('${imagePreview}') no-repeat center/cover`
                    : 'rgb(31 41 55)',
                }}
              >
                {!imagePreview && (
                  <>
                    {/* <label
                      htmlFor="FileUpload"
                      className="customFileUpload text-gray-300"
                    >
                      choose file
                    </label> */}
                    <input
                      type="file"
                      id="FileUpload"
                      onChange={handleImageChange}
                      name="image"
                    />
                    <span></span>
                  </>
                )}
              </div>
              {imagePreview && (
                <button
                  className="text-red-600"
                  onClick={() => setImagePreview(null)}
                >
                  Remove image
                </button>
              )}
              <div className="md:flex items-center mt-12">
                <div className="w-full  flex flex-col">
                  <label className="font-semibold leading-none text-gray-300">
                    Name
                  </label>

                  <input
                    type="text"
                    className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded"
                    value={loginFormObject.name}
                    onChange={onHandleChange}
                    name="name"
                  />
                  {submitted && !loginFormObject.name ? (
                    <span className="text-red-600">Please enter your name</span>
                  ) : null}
                </div>
              </div>
              <div className="md:flex items-center mt-8">
                <div className="w-full flex flex-col">
                  <label className="font-semibold leading-none text-gray-300">
                    description
                  </label>
                  <input
                    type="text"
                    className="h-40 text-base leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-800 border-0 rounded"
                    value={loginFormObject.description}
                    onChange={onHandleChange}
                    name="description"
                  />
                  {submitted && !loginFormObject.description ? (
                    <span className="text-red-600">
                      Please enter your description
                    </span>
                  ) : null}
                </div>
              </div>
              <div>
                <div className="w-full flex flex-col mt-8">
                  <label className="font-semibold leading-none text-gray-300">
                    price
                  </label>
                  <input
                    type="number"
                    className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded"
                    value={loginFormObject.price}
                    onChange={onHandleChange}
                    name="price"
                  />
                  {submitted && !loginFormObject.price ? (
                    <span className="text-red-600">
                      Please enter your price
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="flex items-center justify-center w-full">
                <button
                  className="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none"
                  onClick={onSubmitLoginForm}
                >
                  Submit
                </button>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
