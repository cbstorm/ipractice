export const countNewNotification = (notificationList) => {
    if (!notificationList.length) {
        return 0;
    }
    return notificationList.filter((item) => !item.isRead).length;
};
