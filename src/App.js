import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { Dashboard, SigninPage } from "./pages";
import { API } from "./util/util";


const queryClient = new QueryClient();
const App = () => {
  const [authentication, setAuthentication] = useState(false);
  // const [UserId, setUserId] = useState("");
  const [Loading, setIsLoading] = useState(true);

  function checkValidation(formData) {
    API.post(`/api/v1/users/login`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response)=>{

      if (response.status >= 200 && response.status < 300) {
        const token = response.data.data.token;
        const id = response.data.data.id

        // Save the token to local storage
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
    
        // You can perform additional actions after successful login here
        setAuthentication(true);
        // For example, redirect to a different page
        window.location.href = "/dashboard";
      } else {
        // If the response is not successful, throw an error
        throw new Error(`Failed to login: ${response.statusText}`);
      }

    })
    
    .catch((err)=>{
      alert(`Login failed: ${err.message}`);
    })

    

    setIsLoading(true);
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    // const token = null;
    if (token) {
      setAuthentication(true);
    }
    setIsLoading(false);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
          <div>
            {!authentication ? (
              <SigninPage checkValidation={checkValidation} />
            ) : (
              <Dashboard />
            )}
          </div>
          </QueryClientProvider>

  );
};

export default App;

