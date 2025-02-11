import axios from "axios";
import { useState } from "react";

const PostDataExample = () => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const postData = async () => {
    try {
      const response = await axios.post(
        "http://139.162.134.90:8000/api/competition/",
        {
          competition_id: 219744, // Example payload (adjust as needed)
        },
        {
          headers: {
            "Content-Type": "application/json", // Important for JSON payload
            Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Add token if required
          },
        }
      );
      setResponseData(response.data);
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <button onClick={postData}>Send POST Request</button>
      {responseData && (
        <pre>{JSON.stringify(responseData, null, 2)}</pre>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default PostDataExample;