
import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { TutorialProvider } from "@/context/TutorialContext";
import { TutorialOverlay } from "@/components/common/TutorialOverlay";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <TutorialProvider>
      <div className="flex flex-col min-h-screen font-inter">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <TutorialOverlay />
      </div>
    </TutorialProvider>
  );
};
