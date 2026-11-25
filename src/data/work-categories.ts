import { EVANDER, MANTIC, PODCAST, SKEPTICISM } from "../config";
import senate from "./senate-record.json";

export const workCategories = {
  research: {
    title: "Research & Programs",
    href: "https://innovatingfuture.com/research-and-programs/",
    summary: "Research and convenings for policymakers and leaders deciding how to respond to AI and automation.",
    intro: "CIF studies how emerging technologies change work and society. Its programs bring researchers, practitioners, and policymakers together to examine what is changing and what decisions follow.",
    projects: [
      { title: SKEPTICISM.name, href: SKEPTICISM.page, summary: SKEPTICISM.blurb },
      { title: "CIF Before the Senate", href: "https://innovatingfuture.com/senate-2017/", summary: senate.summary },
    ],
  },
  media: {
    title: "Media & Publishing",
    href: "https://innovatingfuture.com/media-and-publishing/",
    summary: "Books and long-form conversations for readers and listeners exploring how science and technology shape human life.",
    intro: "CIF publishes conversations and books about how science and technology shape human experience. Its work includes long-form interviews, books developed with authors, and commentary from the Center.",
    projects: [
      { title: PODCAST.name, href: PODCAST.page, summary: PODCAST.blurb },
      { title: MANTIC.name, href: MANTIC.page, summary: MANTIC.blurb },
      { title: "CIF In The Press", href: "https://innovatingfuture.com/media/", summary: "Articles, interviews, and appearances featuring the Center’s work." },
    ],
  },
  ventures: {
    title: "Ventures",
    href: "https://innovatingfuture.com/ventures/",
    summary: "Companies built to solve problems emerging technology creates, starting with how people govern AI agents.",
    intro: "CIF builds ventures that put its research into practice. Evander is developing technology to govern what AI agents do.",
    projects: [
      {
        title: EVANDER.name,
        href: EVANDER.page,
        summary: `${EVANDER.name} is focused on making it easier to delegate consequential work to AI agents. It is developing ${EVANDER.technology} to reduce the time people spend verifying and correcting agent work.`,
      },
    ],
  },
};

export const workCategoryLinks = Object.values(workCategories);
