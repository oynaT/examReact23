export default function convertTimestamptoTime(unixTimestamp) {
    const dateObj = new Date(unixTimestamp); // convert to milliseconds
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // add 1, since the first month is 0
    const day = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const newMinutes = minutes > 9 ? minutes : '0' + minutes;
    const seconds = dateObj.getSeconds();
  
    // return in a formatted string  return `${day}/${month}/${year} ${hours}:${newMinutes}:${seconds}`;
    return `${day}/${month}/${year}`;
  }