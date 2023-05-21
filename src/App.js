import React, { useState } from "react";

const App = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:10000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: question }),
      });

      if (response.ok) {
        const data = await response.json();

        // Update the response state
        setResponse(data.message);

        // Store the question and response in the database
        await fetch("http://localhost:10000", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question, answer: data.message }),
        });
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // Clear the question input field
    setQuestion("");
  };

  return (
    <div>
      <h1>StudyGPT</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question"
        />
        <button type="submit">Submit</button>
      </form>
      <div>{response}</div>
    </div>
  );
};

export default App;
