import React from "react";

interface ProfilePageProps {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: "Donor" | "Volunteer";
  memberSince: string;
  impactPoints: number;
  totalDonations?: number;
  itemsDonated?: number;
  onEditProfile: () => void;
  onAddDonation?: () => void;
  onViewAnalytics?: () => void;
  onViewBadges?: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  name,
  email,
  phone,
  address,
  role,
  memberSince,
  impactPoints,
  totalDonations,
  itemsDonated,
  onEditProfile,
  onAddDonation,
  onViewAnalytics,
  onViewBadges,
}) => {
  return (
    <div className="p-0">
      <h1 className="text-3xl font-bold mb-2">My Profile</h1>
      <p className="mb-6 text-gray-500">Manage your account information and view your donation statistics</p>
      <div className="flex flex-wrap gap-6">
        {/* Profile Info */}
        <div className="bg-white rounded-lg shadow p-6 flex-1 min-w-[320px]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-gray-200" />
            <div>
              <div className="text-xl font-semibold">{name}</div>
              <div className="text-blue-600 font-medium">Verified {role}</div>
            </div>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="material-icons">email: </span>
            <span>{email}</span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="material-icons">phone: </span>
            <span>{phone}</span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="material-icons">location: </span>
            <span>{address}</span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="material-icons">Donor since: </span>
            <span>{memberSince}</span>
          </div>
          <button className="mt-4 bg-black text-white px-4 py-2 rounded" onClick={onEditProfile}>Edit Profile</button>
        </div>
        {/* Account Status */}
        <div className="bg-white rounded-lg shadow p-6 min-w-[220px]">
          <div className="font-semibold mb-2">Account Status</div>
          <div className="mb-1">Account Type: <span className="font-medium">{role}</span></div>
          <div className="mb-1">Verification: <span className="text-green-600">{"✔ Verified"}</span></div>
          <div className="mb-1">Member Since: <span>{memberSince}</span></div>
          <div>Total Impact: <span className="text-purple-600 font-semibold">{impactPoints} pts</span></div>
        </div>
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 min-w-[220px] flex flex-col gap-2">
          <div className="font-semibold mb-2">Quick Actions</div>
          {onAddDonation && <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={onAddDonation}>Add New Donation</button>}
          {onViewAnalytics && <button className="bg-gray-200 px-4 py-2 rounded" onClick={onViewAnalytics}>View Analytics</button>}
          {onViewBadges && <button className="bg-gray-200 px-4 py-2 rounded" onClick={onViewBadges}>View Badges</button>}
        </div>
      </div>
      {/* Donation Statistics */}
      <div className="mt-8 grid grid-cols-3 gap-6">
        {typeof totalDonations === "number" && (
          <div className="bg-green-50 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold">{totalDonations}</div>
            <div className="text-gray-500">Total Donations</div>
          </div>
        )}
        {typeof itemsDonated === "number" && (
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold">{itemsDonated}</div>
            <div className="text-gray-500">Items Donated</div>
          </div>
        )}
        <div className="bg-purple-50 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold">{impactPoints}</div>
          <div className="text-gray-500">Impact Points</div>
        </div>
      </div>
      {/* Impact This Year */}
      <div className="mt-8 bg-green-100 rounded-lg p-6 text-center">
        <div className="font-semibold mb-2">Your Impact this year</div>
        <div>Keep up the amazing work!</div>
        {typeof itemsDonated === "number" && <div className="mt-2 text-green-700 text-xl font-bold">{itemsDonated} items</div>}
      </div>
    </div>
  );
};

export default ProfilePage;
