import { ReactNode } from "react";
import { Metadata } from 'next';

type Props = {
    children: ReactNode
};

export const metadata: Metadata = {
    title: 'Pricing',
}

export default function layout({ children }: Props) {

    return children
}
