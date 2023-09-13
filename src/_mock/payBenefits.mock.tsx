import { IPayBenefit } from "@/components/PayBenefits/PayBenefits";


export default [
    {
        title: 'Playground',
        subtitle: 'Free',
        description: 'For development purposes.',
        items: [
            'One collocated squid (API + processor + Postgres)',
            '10GB of database storage',
            '500k monthly RPC requests',
            'Community support',
        ],
        buttonText: 'Get started',
    },
    {
        title: 'Premium',
        subtitle: 'Pay-as-you-go',
        description: 'Flexible billing: pay only for what you really use.',
        items: [
            'Unlimited number of pay-as-you-go dedicated squids',
            'Unlimited number of pay-as-you-go collocated squids',
            '2M monthly RPC requests',
            'Community support',
        ],
        buttonText: 'Get started',
    },
    {
        title: 'Enterprise',
        description: 'Flexible billing: pay only for what you really use.',
        items: [
            'Everything in Premium',
            'Individual SLAs and discounts',
        ],
        buttonText: 'Talk to us',
    },
] as IPayBenefit[]