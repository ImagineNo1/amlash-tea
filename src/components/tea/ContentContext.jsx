"use client";

import { createContext, useContext } from "react";
import { defaultContent } from "@/lib/content-defaults";

const ContentContext = createContext(defaultContent);

export function ContentProvider({ content, children }) {
  return <ContentContext.Provider value={content || defaultContent}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext) || defaultContent;
}
