export const assignDriver = (selectedDriverId, loadId) => {
    var myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "driverId": selectedDriverId,
        "loadId": loadId
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://localhost:44430/api/loads/assignDriver", requestOptions)
        .then(response => response.text())
        .catch(error => console.log('error', error));
}