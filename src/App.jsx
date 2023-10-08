import React, { memo, useCallback, useState } from "react";
import { Toolbar } from "./components/Toolbar";
import { WorkingField } from "./components/WorkingField";
import { ResultField } from "./components/ResultField";
import { Header } from "./components/Header";

export const App = memo(() => {
  return (
    <>
      <Header />
      <div className="wrapper header-fixed">
        <Toolbar />
        <main className="content">
          <WorkingField />
          <ResultField />
        </main>
      </div>
    </>
  );
});
