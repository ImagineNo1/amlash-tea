import Home from "@/src/pages/Home";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Page() {
  const content = await getSiteContent();
  return <Home content={content} />;
}
