"use client";
import React from "react";
import { ReactFlowProvider } from "reactflow";
import { View } from "./view";

export default function Home() {
  return (
    <ReactFlowProvider>
      <div className="bg-white h-[100vh] flex flex-col">
        <View />
      </div>
    </ReactFlowProvider>
  );
}
