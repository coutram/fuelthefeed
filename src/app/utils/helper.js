export function generateTwitterPost(campaign) {
  return (
    `🚀 We're looking for creators! \n\n` +
    `💡 ${campaign.name}\n` +
    `💰 Budget: $${campaign.budget}\n` +
    `📅 ${new Date(campaign.flightStart).toLocaleDateString()} - ${new Date(campaign.flightEnd).toLocaleDateString()}\n` +
    `✨ DM us to join! #CreatorOpportunity #Collab`
  );
}

export function formatBriefForEmail(campaign) {
  return campaign.campaignBrief
    ? `Campaign: ${campaign.name}\n\n${campaign.campaignBrief}\n\nFor more info, contact us.`
    : '';
}
