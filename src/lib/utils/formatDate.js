
export default function formatDate(dateStr){
    const date = new Date(dateStr);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[date.getMonth()]; // Get the month as a string
    const day = date.getDate(); // Get the day of the month
    const year = date.getFullYear(); // Get the full year
    const currentYear = new Date().getFullYear();
    if(year === currentYear){
        return `${day} of ${month}`
    }
    return `${day} of ${month}, ${year}`;
};
