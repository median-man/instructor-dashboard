import { useEffect } from "react";

const APP_TITLE = process.env.REACT_APP_TITLE;
const DEFAULT_DESCRIPTION = process.env.REACT_APP_DOC_DESCRIPTION;

const descriptionMeta = () => document.querySelector("meta[name=description]");

/**
 * Updates the document title and meta tag. Always appends app title from
 * REACT_APP_TITLE env var to the title.
 *
 * @param {{title: string|undefined, description: string|undefined}} param0
 */
export const useDocumentMeta = ({
  title = APP_TITLE,
  description = DEFAULT_DESCRIPTION,
}) => {
  useEffect(() => {
    document.title = `${title} | ${APP_TITLE}`;
  }, [title]);

  useEffect(() => {
    descriptionMeta().setAttribute("content", description);
  }, [description]);
};
