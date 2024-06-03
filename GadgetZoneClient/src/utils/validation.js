// utils/validation.js

export const isValidPhoneNumber = (phoneNumber) => {
  const regex = /^(?:\+880|0)(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{8}$/;

  return regex.test(phoneNumber);
};

export const formatPhoneNumber = (phoneNumber) => {
  // Assuming a Bangladeshi phone number format: +8801XXXXXXXXX
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
  const match = cleanedPhoneNumber.match(/^(\d{1})(\d{3})(\d{4})(\d{4})$/);

  if (match) {
    // Format as +8801-XXX-XXXX-XXXX
    return `+${match[1]}${match[2]}-${match[3]}-${match[4]}`;
  }

  // Return original value if it doesn't match the expected format
  return phoneNumber;
};

export const formatAndValidatePhoneNumber = (phoneNumber) => {
  // Remove non-numeric characters
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

  // Validate the cleaned phone number (customize the validation logic as needed)
  const isValidPhoneNumber = /^[0-9]{11}$/.test(cleanedPhoneNumber);

  if (isValidPhoneNumber) {
    // Format the valid phone number with spaces
    return `+${cleanedPhoneNumber.slice(0, 3)} ${cleanedPhoneNumber.slice(
      3,
      7
    )} ${cleanedPhoneNumber.slice(7)}`;
  }

  // Return original value if it's not a valid phone number
  return phoneNumber;
};
