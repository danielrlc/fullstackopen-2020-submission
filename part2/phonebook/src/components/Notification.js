import React, { useState } from 'react';

function Notification({ notificationMsg, notificationType }) {
  if (notificationMsg === '') {
    return null;
  }
  return (
    <p
      className={`${
        notificationType === 'success' ? 'success-msg' : 'error-msg'
      }`}
    >
      {notificationMsg}
    </p>
  );
}

export default Notification;
