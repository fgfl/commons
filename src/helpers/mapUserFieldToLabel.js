const mapUserFieldToLabel = (field) => {
  const mapping = {
    name: 'Name',
    username: 'Username',
    email: 'Email',
    password_digest: 'Password',
    phone_number: 'Phone number',
    postal_code: 'Postal code',
    email_notification: 'Email notification',
    sms_notification: 'SMS notification',
  };
  return mapping[field];
};

export default mapUserFieldToLabel;
