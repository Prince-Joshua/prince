import ApiDesign from "@/sections/projectCaseStudyPage/ApiDesign";
import Architecture from "@/sections/projectCaseStudyPage/Architecture";
import Challenges from "@/sections/projectCaseStudyPage/Challenges";
import DeepDives from "@/sections/projectCaseStudyPage/DeepDives";
import Deployment from "@/sections/projectCaseStudyPage/Deployment";
import ExecSummary from "@/sections/projectCaseStudyPage/ExecSummary";
import Hero from "@/sections/projectCaseStudyPage/Hero";
import Metrics from "@/sections/projectCaseStudyPage/Metrics";
import Stack from "@/sections/projectCaseStudyPage/Stack";
import Tradeoffs from "@/sections/projectCaseStudyPage/Tradeoffs";
import { tokens } from "@/utils/tokens";
import { Box } from "@chakra-ui/react";
import Observability from "../sections/projectCaseStudyPage/Observability";
import Limitations from "../sections/projectCaseStudyPage/Limitations";
import Lessons from "../sections/projectCaseStudyPage/Lessons";
import Roadmap from "../sections/projectCaseStudyPage/Roadmap";
import Footer from "@/sections/projectCaseStudyPage/Footer";
import SubNav from "@/components/custom/SubNav";

const CaseStudyPage = () => {
  const sections = [
    ExecSummary,
    Stack,
    Architecture,
    DeepDives,
    Tradeoffs,
    Metrics,
    ApiDesign,
    Challenges,
    Deployment,
    Observability,
    Limitations,
    Lessons,
    Roadmap,
  ];

  return (
    <Box minH="100vh" bg={tokens.bg}>
      <SubNav
        subLinks={[
          { label: "Summary", id: "summary" },
          { label: "Architecture", id: "architecture" },
          { label: "Deep Dives", id: "dives" },
          { label: "API Design", id: "api" },
          { label: "Deployment", id: "deployment" },
          { label: "Limitations", id: "limitations" },
        ]}
      />
      <Hero />
      {sections?.map((Section, i) => (
        <Box key={i} maxW="1100px" mx="auto" px={{ base: "24px", md: "60px" }}>
          <Section />
        </Box>
      ))}
      <Footer />
    </Box>
  );
};

export default CaseStudyPage;
