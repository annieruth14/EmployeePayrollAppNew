const stringifyDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    const newDate = date === undefined ? "date not defined" : 
                    new Date(Date.parse(date)).toLocaleDateString("en-US", options);
    return newDate;
}