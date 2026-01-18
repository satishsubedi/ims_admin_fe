
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Check, Clock } from "lucide-react";

// Mock data for now if no API exists
const mockNotifications = [
  {
    id: 1,
    title: "Account Verified",
    message: "Your email has been successfully verified. You can now access all features.",
    type: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: false,
  },
  {
    id: 2,
    title: "Welcome to IMS",
    message: "Welcome to the Internship Management System! Complete your profile to get started.",
    type: "info",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: true,
  },
];

const NotificationPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  // In real app, fetch from API
  // useEffect(() => { dispatch(getNotificationsAction()) }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-6 p-6 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
        <p className="text-muted-foreground">
          Stay updated with important alerts and announcements.
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={markAllAsRead}
          className="text-sm text-primary hover:underline font-medium"
        >
          Mark all as read
        </button>
      </div>

      <div className="grid gap-4">
        {notifications.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Bell className="mx-auto h-12 w-12 opacity-50 mb-3" />
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-colors ${
                !notification.read ? "bg-accent/50 border-primary/20" : ""
              }`}
            >
              <CardContent className="p-4 flex gap-4 items-start">
                <div
                  className={`mt-1 p-2 rounded-full ${
                    notification.type === "success"
                      ? "bg-green-100 text-green-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {notification.type === "success" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Bell className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <p
                      className={`font-medium leading-none ${
                        !notification.read ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {notification.title}
                    </p>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(notification.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                </div>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="h-2 w-2 mt-2 rounded-full bg-primary"
                    title="Mark as read"
                  ></button>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
