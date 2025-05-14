import { Campaign } from "@/app/types/Campaign";


export default function CampaignHeader({ campaign }: { campaign: Campaign }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">{campaign.name}</h1>
      {/* ...other header info */}
    </div>
  );
}
