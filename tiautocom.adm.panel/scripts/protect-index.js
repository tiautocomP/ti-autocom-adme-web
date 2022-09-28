
getindexuser();

function getindexuser() {
    const respjson = localStorage.getItem("listusers");

    const user = JSON.parse(respjson);

    if (user === null) {
        window.location = "login.aspx";
    }
}