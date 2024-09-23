import React, { ReactNode } from 'react'
import { SigmaProvider } from './control-panel-sigma-context'
import { KHProvider } from './control-panel-KH-context'
import { KhProvider } from './control-panel-Kh2-context'
import { ThetaProvider } from './control-panel-theta-context'
import { RValueProvider } from './control-panel-Rvalue-context'

export function CombinedControlProviders({
    children,
}: {
    children: ReactNode
}) {
    return (
        <KHProvider>
            <KhProvider>
                <SigmaProvider>
                    <ThetaProvider>
                        <RValueProvider>{children}</RValueProvider>
                    </ThetaProvider>
                </SigmaProvider>
            </KhProvider>
        </KHProvider>
    )
}
