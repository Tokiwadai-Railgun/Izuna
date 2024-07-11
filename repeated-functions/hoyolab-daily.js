function claim() {
    setInterval(() => {console.log("hey, repeated every 2 seconds")}, 2000);
}

module.exports = async () => {
    claim();
}