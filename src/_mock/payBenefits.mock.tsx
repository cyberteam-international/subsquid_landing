export interface IPayBenefit{
    title: string,
    subtitle?: string,
    description: string,
    items: string[]
    button: {
        title: string,
        href: string,
    }
}


export default [
    {
        title: 'Playground',
        subtitle: 'Free',
        description: 'For development purposes',
        items: [
            'One collocated squid (API + processor + Postgres)',
            '10GB of database storage',
            '500k monthly RPC requests',
            'Community support',
        ],
        button: {
            title: 'Get started',
            href: 'https://docs.subsquid.io/deploy-squid/pricing/'
        },
    },
    {
        title: 'Premium',
        subtitle: 'Pay-as-you-go',
        description: 'Pay only for what you use',
        items: [
            'Unlimited number of pay-as-you-go dedicated squids',
            'Unlimited number of pay-as-you-go collocated squids',
            '2M monthly RPC requests',
            'Community support',
        ],
        button: {
            title: 'Get started',
            href: 'https://docs.subsquid.io/deploy-squid/pricing/#processor-only-squid'
        },
    },
    {
        title: 'Enterprise',
        description: 'Contact us for special conditions',
        items: [
            'Everything in Premium',
            'Individual SLAs and discounts',
        ],
        button: {
            title: 'Talk to us',
            href: 'https://docs.subsquid.io/deploy-squid/pricing/#slas'
        },
    },
] as IPayBenefit[]