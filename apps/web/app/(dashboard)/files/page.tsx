import { Protect } from "@clerk/nextjs";

import { FilesView } from "@/modules/files/ui/views/files-view";
import { PremiumFeatureOverlay } from "@/modules/billing/ui/components/premium-feature-overlay";

const Page = () => {
    return (
        <Protect
            condition={(has) => has({ plan: "pro" })}
            fallback={<PremiumFeatureOverlay><FilesView /></PremiumFeatureOverlay>}
        >
            <FilesView />
        </Protect>
    );
}
 
export default Page;