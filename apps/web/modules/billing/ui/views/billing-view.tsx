"use client"

import { PricingTable } from "../components/pricing-table";


export const BillingView = () => {
    return (
        <div className="flex min-h-screen flex-col bg-muted p-8">
            <div className="mx-auto w-full max-w-screen-md">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-4xl">Plans & Billing</h1>
                <p className="text-muted-foreground">
                  Choose the plan that's right for you and your team.
                </p>
              </div>

              <div className="mt-8">
                <PricingTable />
              </div>
            </div>
        </div>
    );
};
