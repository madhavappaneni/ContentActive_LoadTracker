export const getLoadData = ({ loadSearchQuery, pageSize, currentPage }) => {
    const URL = '/api/loads';
    const body = JSON.stringify({
        "filter": [
            "loadnumber",
            "contains",
            loadSearchQuery
        ],
        "select": [
            "id",
            "loadNumber",
            "product",
            "origin",
            "destination",
            "driver.name",
            "driver.carrier.name",
            "customer.name",
            "createdDateTime",
            "modifiedDateTime"
        ],
        "take": pageSize,
        "skip": pageSize * currentPage,
        "requireTotalCount": true,
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'POST',
        body: body,
        redirect: 'follow',
        headers: myHeaders
    };
    return fetch(URL, requestOptions)
        .then(response => response.json())
        .catch((error) => { console.log(error) });
};