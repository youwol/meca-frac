import React, { ReactNode } from 'react'
import { ShapeProvider } from './shape'
import { SurfaceColorProvider, TransparencyProvider } from './surface'
import { NodeColorProvider, SizeProvider } from './nodes'

export function CombinedBasicProviders({ children }: { children: ReactNode }) {
    return (
        <SizeProvider>
            <ShapeProvider>
                <SurfaceColorProvider>
                    <NodeColorProvider>
                        <TransparencyProvider>{children}</TransparencyProvider>
                    </NodeColorProvider>
                </SurfaceColorProvider>
            </ShapeProvider>
        </SizeProvider>
    )
}
