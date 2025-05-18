import React from "react";

const RecentActivity = () => {
  const activities = [
    {
      user: "Sarah Johnson",
      action: "borrowed",
      book: "The Silent Patient",
      time: "2 hours ago",
    },
    {
      user: "Michael Chen",
      action: "returned",
      book: "Atomic Habits",
      time: "5 hours ago",
    },
    {
      user: "Admin",
      action: "added",
      book: "New book: 'Project Hail Mary'",
      time: "Yesterday",
    },
    {
      user: "Emma Wilson",
      action: "renewed",
      book: "Educated",
      time: "Yesterday",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="pb-4 border-b border-gray-100 last:border-0 last:pb-0"
          >
            <p className="text-gray-700">
              <span className="font-medium">{activity.user}</span>{" "}
              {activity.action}{" "}
              <span className="font-medium">{activity.book}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
          </div>
        ))}
      </div>
      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-4">
        View all activity →
      </button>
    </div>
  );
};
export default RecentActivity;
