import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AllProjectsPage from "./pages/AllProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import AllCaseStudiesPage from "./pages/AllCaseStudiesPage";
import CaseStudyPage from "./pages/ProjectCaseStudyPage";
import ContactPage from "./pages/ContactPage";
import Services from "./pages/Services";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "projects", element: <AllProjectsPage /> },
      {
        path: "projects/:id",
        element: <ProjectDetailPage />,
      },
      { path: "case-studies", element: <AllCaseStudiesPage /> },
      { path: "case-studies/:id", element: <CaseStudyPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "services", element: <Services /> },
    ],
  },
]);

export default router;
