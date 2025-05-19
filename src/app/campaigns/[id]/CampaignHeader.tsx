import { Campaign } from "@/app/types/Campaign";
import Link from "next/link";

export default function CampaignHeader({ campaign }: { campaign: Campaign }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-2">{campaign.name}</h1>
        <Link
          href={`/campaigns/${campaign._id}/edit`}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
        >
          Edit Campaign
        </Link>
      </div>
      {/* ...other header info */}
    </div>
  );
}
