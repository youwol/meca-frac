import React, { ReactNode } from "react";
import { ThemeProvider } from "./theme-context";
import { DockApiProvider } from "./dock-api-context";
import { ToggleViewsProvider } from "./toggle-views-context";
import { WindowProvider } from "./window-context";
import { CombinedBasicProviders } from "./display-panel/basic/combined-basic-provider";
import { CombinedControlProviders } from "./control-panel/combined-control-provided";
import { DataFrameProvider } from "./data-frames/data-frame-context";

export function CombinedProviders(props: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <DockApiProvider>
        <ToggleViewsProvider>
          <WindowProvider>
            <CombinedControlProviders>
              <DataFrameProvider>
                <CombinedBasicProviders>
                  {props.children}
                </CombinedBasicProviders>
              </DataFrameProvider>
            </CombinedControlProviders>
          </WindowProvider>
        </ToggleViewsProvider>
      </DockApiProvider>
    </ThemeProvider>
  );
}
