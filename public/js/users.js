$(document).ready(function () {
    getAllUsers();
});

function getAllUsers() {
    $.ajax({
        url: document.URL + "rest/users",
        method: "GET",
        success: function(result){
            displayUsers(result);
        },
        error: function (response) {
            let responseObj = response.responseJSON;
            alert("The called resource said: \"" + responseObj.message + "\" on " + responseObj.time);
        }
    });
}

function displayUsers(data) {
    if (data.length>0) {
        let placeholder = "";
        for(let i=0; i<data.length; i++) {
            placeholder += "<tr>";
            placeholder += "<input class='user-id' type='hidden' value='" + data[i].id + "'>";
            placeholder += "<td>" + (i+1) + "</td>";
            placeholder += "<td>" + data[i].name + " " + data[i].surname + " is " + data[i].age  + " years old</td>";
            placeholder += "<td><button class='update-user'>Update</button></td>";
            placeholder += "<td><button class='delete-user'>Delete</button></td>";
            placeholder += "</tr>";
        }
        $("#users-placeholder tbody").html(placeholder);
    } else {
        $("#users-div").html("<p>No users in the system.</p>");
    }
}
