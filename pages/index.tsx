import { Button, TextField } from "@material-ui/core";
import Head from "next/head";
import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addProject = async () => {
    setIsLoading(true);
    var response = await axios.post("/api/project", {
      name,
      value,
      country,
    });

    if (response.status === 200) {
      window.location.href = "/projects";
    }

    setIsLoading(false);
  };
  return (
    <>
      <Head>
        <title>Add a Project</title>
      </Head>
      <div className="container">
        <h1>Project Details</h1>
        {/* <TextField
          fullWidth
          label="Project ID"
          variant="outlined"
          value={projectId}
          onChange={(e: any) => setProjectId(e.target.value)}
          style={{ marginTop: 10 }}
        /> */}
        <TextField
          fullWidth
          label="Project Name"
          variant="outlined"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          style={{ marginTop: 10 }}
        />

        <TextField
          fullWidth
          label="Project Value"
          variant="outlined"
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          style={{ marginTop: 10 }}
        />

        <TextField
          fullWidth
          label="Project Country"
          variant="outlined"
          value={country}
          onChange={(e: any) => setCountry(e.target.value)}
          style={{ marginTop: 10 }}
        />

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 10 }}
          onClick={addProject}
          disabled={
            isLoading || name === "" || value === ""
          }
        >
          {isLoading ? "Loading..." : "Submit"}
        </Button>

        <style jsx>{`
          @media only screen and (max-width: 600px) {
            h1 {
              font-size: 30px;
            }
          }
        `}</style>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }

          .container {
            margin-right: auto; /* 1 */
            margin-left: auto; /* 1 */

            max-width: 960px; /* 2 */

            padding-right: 10px; /* 3 */
            padding-left: 10px; /* 3 */
          }
        `}</style>
      </div>
    </>
  );
}
