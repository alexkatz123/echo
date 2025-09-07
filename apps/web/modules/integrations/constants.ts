export const INTEGRATIONS = [
  {
    id: "html",
    name: "HTML",
    icon: "/languages/html5.svg",
  },
  {
    id: "react",
    name: "React",
    icon: "/languages/react.svg",
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "/languages/javascript.svg",
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: "/languages/nextjs.svg",
  },
]

export type IntegrationId = (typeof INTEGRATIONS)[number]["id"];

export const HTML_SCRIPT = `<script data-organization-id="{{ORGANIZATION_ID}}">html</script>`;
export const REACT_SCRIPT = `<script data-organization-id="{{ORGANIZATION_ID}}">react</script>`;
export const JAVASCRIPT_SCRIPT = `<script data-organization-id="{{ORGANIZATION_ID}}">javascript</script>`;
export const NEXTJS_SCRIPT = `<script data-organization-id="{{ORGANIZATION_ID}}">nextjs</script>`;