import "./App.css";
import { Fragment, useState } from "react";
import { obj } from "./obj";

import { useAuth, useMember } from "./hooks";

function App() {
  // const [Token, setToken] = useState(null);
  const [errors, setErrors] = useState({})
  const { getToken, getSignature } = useAuth();
  const { createMember } = useMember();

  function validateForm() {
    let isValid = true;
    let newErrors = {};
  
    // Check the username field
    if (formData.username.length < 8) {
      newErrors.username = 'Username must be at least 8 characters long';
      isValid = false;
    }
  
    // Check the password field
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      isValid = false;
    }
  
    // Add more checks for other fields as needed
  
    setErrors(newErrors);
    return isValid;
  }
  

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
    tel: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Access the form data here
    // console.log(formData);

    if (!validateForm()){
      alert("Validation is not completed.\nYou should input min 8 chars with NUMBERS and CHARACTERS only!")
    }
  

    let sigData = await getSignature();
    let signature = sigData.result.uuid;
    let tokenData = await getToken({
      captcha: "",
      clientSignature: signature,
      password: "12345678",
      username: "zregister",
    });
    // console.log(formData)
    console.log(tokenData);
    let jwtToken = tokenData.data.token;
    console.log(jwtToken);
    const newObj = {
      ...obj,
      username: 'zregister'+formData.username,
      name: formData.name,
      password: formData.password,
      tel: formData.tel,
    };
    let memberData = await createMember(jwtToken, newObj);
    alert(memberData.msg)
    
    return;
  };

  return (
    <Fragment>
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            class="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register as a Member
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            class="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                for="username"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Username (min 8 characters and numbers)
              </label>
              <div class="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autocomplete="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                for="Name"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div class="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autocomplete="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Password (min 8 chars)
              </label>
              <div class="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="text"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                for="phone"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone
              </label>
              <div class="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  autocomplete="text"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
