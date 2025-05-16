import React from 'react';

type Applicant = {
  _id: string;
  name: string;
  email: string;
  // Add more fields as needed
};

type Props = {
  applicants: Applicant[];
  onApprove: (userId: string) => void;
  onReject?: (userId: string) => void;
  approvedIds: string[];
};

export default function CampaignApprovalsTab({ applicants, onApprove, onReject, approvedIds }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Creator Approvals</h2>
      {applicants.length === 0 ? (
        <div className="text-gray-500">No creators have applied yet.</div>
      ) : (
        <ul className="space-y-4">
          {applicants.map(applicant => (
            <li key={applicant._id} className="flex items-center justify-between bg-gray-50 p-4 rounded">
              <div>
                <div className="font-bold">{applicant.name}</div>
                <div className="text-sm text-gray-500">{applicant.email}</div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => onApprove(applicant._id)}
                  disabled={approvedIds.includes(applicant._id)}
                >
                  {approvedIds.includes(applicant._id) ? 'Approved' : 'Approve'}
                </button>
                {onReject && (
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => onReject(applicant._id)}
                  >
                    Reject
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
