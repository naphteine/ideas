import Head from "next/head";
import { SITE_NAME } from "../lib/constants";
import { getAllProjects } from "../lib/api";
import Project from "../interfaces/project";

type Props = {
  allProjects: Project[];
};

export default function Index({ allProjects }: Props) {
  const heroProject = allProjects[0];
  const moreProjects = allProjects.slice(1);
  return (
    <>
      <Head>
        <title>{SITE_NAME}</title>
      </Head>

      <main>
        {heroProject && heroProject.title}
        {moreProjects.length > 0 &&
          moreProjects.map((project) => {
            return <li key={project.title}>{project.title}</li>;
          })}
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const allProjects = getAllProjects(["title", "created"]);

  return {
    props: { allProjects },
  };
};
