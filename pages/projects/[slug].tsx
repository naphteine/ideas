import Head from "next/head";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getProjectBySlug, getAllProjects } from "../../lib/api";
import { SITE_NAME } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
import type ProjectType from "../../interfaces/project";

type Props = {
  project: ProjectType;
  moreProjects: ProjectType[];
  preview?: boolean;
};

export default function Post({ project }: Props) {
  const router = useRouter();
  const title = `${project.title} | ${SITE_NAME}`;

  if (!router.isFallback && !project?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        {project.title}

        {project.content}
      </main>
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const project = getProjectBySlug(params.slug, [
    "title",
    "created",
    "slug",
    "content",
  ]);
  const content = await markdownToHtml(project.content || "");

  return {
    props: {
      project: {
        ...project,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const projects = getAllProjects(["slug"]);

  return {
    paths: projects.map((project) => {
      return {
        params: {
          slug: project.slug,
        },
      };
    }),
    fallback: false,
  };
}
