"use client";

import { GetCountryFlagUrl, GetCountryFromTimezone } from "@/lib/country-utils";
import { api } from "@workspace/backend/_generated/api";
import { Id } from "@workspace/backend/_generated/dataModel";
import { Button } from "@workspace/ui/components/button";
import { DicebearAvatar } from "@workspace/ui/components/dicebearAvatar";
import { useQuery } from "convex/react";
import { ClockIcon, GlobeIcon, MailIcon, MonitorIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import bowser from "bowser";

type InfoItem = {
  label: string;
  value: string | React.ReactNode;
  className?: string;
};

type InfoSection = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: InfoItem[];
};

export const ContactPanel = () => {
  const params = useParams();
  const conversationId = params.conversationId as Id<"conversations">;

  const contactSession = useQuery(
    api.private.contactSessions.getOneByConversationId,
    conversationId
      ? {
          conversationId,
        }
      : "skip"
  );

  const parseUserAgent = useMemo(() => {
    return (userAgent?: string) => {
      if (!userAgent)
        return { browser: "Unknown", os: "Unknown", device: "Unknown" };

      const browser = bowser.getParser(userAgent);
      const result = browser.getResult();

      return {
        browser: result.browser.name || "Unknown",
        browserVersion: result.browser.version || "",
        os: result.os.name || "Unknown",
        osVersion: result.os.version || "",
        device: result.platform.type || "desktop",
        deviceVendor: result.platform.vendor || "",
        deviceModel: result.platform.model || "",
      };
    };
  }, []);

  const userAgentInfo = useMemo(
    () => parseUserAgent(contactSession?.metaData?.userAgent),
    [contactSession?.metaData?.userAgent, parseUserAgent]
  );

  const countryInfo = useMemo(() => {
    return GetCountryFromTimezone(contactSession?.metaData?.timezone);
  }, [contactSession?.metaData?.timezone]);

  const accordionSections = useMemo<InfoSection[]>(() => {
    if (!contactSession?.metaData) {
      return [];
    }

    return [
      {
        id: "device-info",
        icon: MonitorIcon,
        title: "Device Information",
        items: [
          {
            label: "Browser",
            value:
              userAgentInfo.browser +
              (userAgentInfo.browserVersion
                ? ` ${userAgentInfo.browserVersion}`
                : ""),
          },
          {
            label: "OS",
            value:
              userAgentInfo.os +
              (userAgentInfo.osVersion ? ` ${userAgentInfo.osVersion}` : ""),
          },
          {
            label: "Device",
            value:
              userAgentInfo.device +
              (userAgentInfo.deviceModel
                ? ` ${userAgentInfo.deviceModel}`
                : "") +
              (userAgentInfo.deviceVendor
                ? ` ${userAgentInfo.deviceVendor}`
                : ""),
              className: "capitalize",
          },
          {
            label: "screen",
            value: contactSession.metaData.screenResolution
          },
          {
            label: "viewport",
            value: contactSession.metaData.viewportSize
          },
          {
            label: "Cookies",
            value: contactSession.metaData.cookieEnabled ? "Enabled" : "Disabled",
          },
        ],
      },
      {
        id: "location-info",
        icon: GlobeIcon,
        title: "Location & Language",
        items: [
          ...(countryInfo
            ? [
              {
                  label: "Country",
                  value: (
                  <span>
                    {countryInfo.name}
                  </span>
                  )
              }
            ]
            : []
          ),
          {
            label: "Language",
            value: contactSession.metaData.language,
          },
          {
            label: "Timezone",
            value: contactSession.metaData.timezone,
          },
          // {
          //   label: "UTC Offset",
          //   value: {`${-contactSession.metaData.timezoneOffset / 60} hours`},
          // }
        ]
      },
      {
        id: "session-details",
        icon: ClockIcon,
        title: "Session Details",
        items: [
          {
            label: "Session Started",
            value: new Date(contactSession._creationTime).toLocaleString(),
          }
        ]
      }
    ];
  }, [contactSession, countryInfo, userAgentInfo]);

  if (contactSession === undefined || contactSession === null) {
    return null;
  }

  return (
    <div className="flex h-full w-full flex-col bg-background text-foreground">
      <div className="flex flex-col gap-y-4 p-4">
        <div className="flex items-center gap-x-2">
          <DicebearAvatar
            badgeImageUrl={
              countryInfo?.code
                ? GetCountryFlagUrl(countryInfo.code)
                : undefined
            }
            seed={contactSession?._id}
            size={42}
          />
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-x-2">
              <h4 className="line-clamp-1">{contactSession.name}</h4>
            </div>
            <p className="line-clamp-1 text-muted-foreground text-sm">
              {contactSession.email}
            </p>
          </div>
        </div>
        <Button asChild className="w-full" size="lg">
          <Link href={`mailto:${contactSession.email}`}>
            <MailIcon />
            <span>Send Email</span>
          </Link>
        </Button>
      </div>
      {contactSession.metaData && (
        <Accordion
          className="w-full rounded-none border-y"
          collapsible
          type="single"
        >
          {accordionSections.map((section) => (
            <AccordionItem
              className="rounded-none outline-none has-focus-visible:z-10 has-focus-visible:border-ring has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50"
              key={section.id}
              value={section.id}
            >
              <AccordionTrigger className="flex w-full flex-1 items-start justify-between gap-4 rounded-none bg-accent px-5 py-4 text-left font-medium text-sm outline-none transition-all hover:no-underline disabled:pointer-events-none disabled:opacity-50">
                <div className="flex items-center gap-4">
                  <section.icon className="size-4 shrink-0" />
                  <span>{section.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 py-4">
                <div className="space-y-2 text-sm">
                  {section.items.map((item) => (
                    <div
                      className="flex justify-between"
                      key={`${section.id}-${item.label}`}
                    >
                      <span className="text-muted-foreground">
                        {item.label}:
                      </span>
                      <span className={item.className}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};
