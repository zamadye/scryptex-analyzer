import React, { useState, useEffect } from "react";
import {
  Bell,
  CheckCircle,
  Info,
  AlertTriangle,
  X,
  XCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/cardui";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

const Notifications = () => {
  const { t } = useLanguage();
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "info",
      message: t("welcomeToScryptex"),
      timestamp: new Date(),
      read: false,
    },
    {
      id: "2",
      type: "success",
      message: t("firstAirdropClaimed"),
      timestamp: new Date(),
      read: false,
    },
    {
      id: "3",
      type: "warning",
      message: t("lowCreditsWarning"),
      timestamp: new Date(),
      read: false,
    },
    {
      id: "4",
      type: "error",
      message: t("twitterAccountSuspended"),
      timestamp: new Date(),
      read: false,
    },
    {
      id: "5",
      type: "info",
      message: t("newFeatureAvailable"),
      timestamp: new Date(),
      read: false,
    },
    {
      id: "6",
      type: "success",
      message: t("farmingAgentDeployed"),
      timestamp: new Date(),
      read: false,
    },
    {
      id: "7",
      type: "warning",
      message: t("portfolioAlert"),
      timestamp: new Date(),
      read: false,
    },
    {
      id: "8",
      type: "error",
      message: t("failedTransaction"),
      timestamp: new Date(),
      read: false,
    },
  ]);

  useEffect(() => {
    if (!isLoggedIn) {
      setNotifications([]);
    }
  }, [isLoggedIn]);

  const markAsRead = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    toast({
      title: "Notification marked as read",
      description: "The notification has been successfully marked as read",
    });
  };

  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({ ...notification, read: true }))
    );
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read",
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    toast({
      title: "Notifications cleared",
      description: "All notifications have been cleared from your inbox",
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div className="container py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">
            <Bell className="mr-2 h-5 w-5 inline-block align-middle" />
            {t("notifications")}
          </CardTitle>
          <div>
            <Button
              variant="secondary"
              size="sm"
              onClick={markAllAsRead}
              disabled={notifications.length === 0}
              className="mr-2"
            >
              {t("markAllRead")}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={clearAllNotifications}
              disabled={notifications.length === 0}
            >
              {t("clearAll")}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <div className="text-center py-6">
              <CardDescription>{t("noNotifications")}</CardDescription>
            </div>
          ) : (
            <ScrollArea className="h-[400px] w-full rounded-md pr-4">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="relative rounded-md border p-4"
                  >
                    {!notification.read && (
                      <Badge className="absolute top-2 right-2">
                        {t("unread")}
                      </Badge>
                    )}
                    <div className="flex items-start space-x-4">
                      {getIcon(notification.type)}
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {notification.message}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(notification.timestamp, {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Mark as read</span>
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
