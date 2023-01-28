import React from "react";

export type ReplaceProps<Inner extends React.ElementType, P> = Omit<
    React.ComponentPropsWithRef<Inner>,
    P
> &
    P;

export interface AsProp<As extends React.ElementType = React.ElementType> {
    as?: As;
}

export interface RefForwardingComponent<
    TInitial extends React.ElementType,
    TProps = unknown,
> {
    <As extends React.ElementType = TInitial>(
        props: React.PropsWithChildren<ReplaceProps<As, AsProp<As> & TProps>>,
        // context?: any,
    ): React.ReactElement | null;
    // propTypes?: any;
    // contextTypes?: any;
    // defaultProps?: Partial<TProps>;
    displayName?: string;
}

/** Adds "as" prop and the passed HTML attributes */
export type PolymorphicProps<TAttributes = React.HTMLAttributes<HTMLElement>>
    = AsProp & TAttributes;