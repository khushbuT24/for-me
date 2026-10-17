import { FormeApp } from "@/components/forme-app";
import { screens } from "@/lib/data";
import { notFound } from "next/navigation";
export function generateStaticParams() {
  return screens.map((screen) => ({ screen }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ screen: string }>;
}) {
  const { screen } = await params;
  if (!screens.includes(screen)) notFound();
  return <FormeApp screen={screen} />;
}
