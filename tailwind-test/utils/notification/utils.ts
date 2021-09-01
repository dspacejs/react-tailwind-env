import React from "react";
import { createNotificationContext } from "react-notification-provider";

interface Notification {
  children: React.ReactNode;
  title: string;
}

export const {
  NotificationProvider,
  useNotificationQueue,
  createMockNotificationQueue,
} = createNotificationContext<Notification>();
