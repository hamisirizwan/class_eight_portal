const currentDate = () =>{
    // Array of month names
const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
  ];
  
  // Array of day names
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Get the current date
  const currentDate = new Date();
  
  // Get the day, month, and year components
  const dayName = dayNames[currentDate.getDay()];
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  
  // Construct the formatted date string
  return `${dayName}, ${month} ${year}`;

}


export default currentDate