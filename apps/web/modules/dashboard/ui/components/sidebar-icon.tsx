"use server";

import { auth } from '@clerk/nextjs/server'
import { type LucideIcon } from 'lucide-react';

interface SidebarIconProps {
  Icon: LucideIcon;
  LockIcon: LucideIcon;
}

export const SidebarIcon = async ({ Icon, LockIcon }: SidebarIconProps) => {
   const { has } = await auth()
  const hasPremiumAccess = has({ plan: 'pro' })
  return (
    <div>
      {hasPremiumAccess ? <Icon className="size-4" /> : <LockIcon className="size-4" />}
    </div>
  )
}
