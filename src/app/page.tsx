"use client";

import { useState } from "react";
import { VerticalFeed } from "@/components/VerticalFeed";
import { Landing } from "@/components/Landing";
import { Toaster } from "@/components/ui/feedback";

export default function Home() {
  const [currentView, setCurrentView] = useState<"landing" | "menu">("landing");

  return (
    <>
      {currentView === "landing" ? (
        <Landing onNavigate={setCurrentView} />
      ) : (
        <VerticalFeed onNavigate={setCurrentView} />
      )}
      <Toaster position="top-center" />
    </>
  );
}