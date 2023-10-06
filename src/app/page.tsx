import Typography from "@/components/Typography";
import { Metadata } from "next";
import HomeScreenActions from "./HomeScreenActions";

export const metadata: Metadata = {
  title: "Jotter",
  description: "Collaborative editor",
};

export default function Home() {
  // TODO: Design starting page when no notebook is open
  return (
    <div className="flex justify-center">
      <div className="mt-36">
        <div>
          <Typography variant="h2" as="h1" className="mb-2">
            Jotter
          </Typography>
          <Typography
            variant="h4"
            as="h2"
            className="dark:text-gray-400 text-gray-600"
          >
            Text editing reimagined
          </Typography>
        </div>
        <div className="py-8">
          <Typography as="h3" variant="h5" className="mb-3">
            Get started
          </Typography>
          <HomeScreenActions />
        </div>
      </div>
    </div>
  );
}
