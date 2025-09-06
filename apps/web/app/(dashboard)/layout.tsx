import { DashboardLayout } from "@/modules/dashboard/ui/layouts/dashboard-layout";
import { auth } from '@clerk/nextjs/server'


const Layout = async ({ children}: { children: React.ReactNode }) => {
    const { has } = await auth()
    const hasPremiumAccess = has({ plan: 'pro' })
    return (
        <DashboardLayout pro={hasPremiumAccess}>
            {children}
        </DashboardLayout>
    );
}
 
export default Layout;