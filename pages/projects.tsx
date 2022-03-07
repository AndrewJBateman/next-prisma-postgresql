import { Project } from "@prisma/client";
import Head from "next/head";
import React from "react";
import prisma from "../lib/prisma";

interface Props {
  projects: Project[];
}
const Projects = (props: Props) => {
  const { projects } = props;

  return (
    <>
      <Head>
        <title>Projects List</title>
      </Head>
      <div className="container">
        <h1>Projects List</h1>
        {projects.map((project) => (
          <div key={project.name} style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 20, margin: 0, padding: 0 }}>
              {project.name}
            </p>
            <p style={{ margin: 0, padding: 0 }}>
              Country: {project.country}
            </p>
            <p style={{ margin: 0, padding: 0 }}>
              Project ID: {project.id}
            </p>
          </div>
        ))}
      </div>
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
    </>
  );
};

export const getServerSideProps = async () => {
  const projects = await prisma.project.findMany();
  return { props: { projects } };
};

export default Projects;
