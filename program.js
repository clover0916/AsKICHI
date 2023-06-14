function updateRoom(roomName) {
    if (!isLoggedIn()) {
        alert("管理者としてログインしてください。");
        return;
    }
    var selectedCon = document.getElementById(roomName+"-status").value;
    var cells = document.getElementById(roomName+"-con");
    cells.style.backgroundColor = selectedCon;
}

function isLoggedIn() {
    var adminId="admin";
    var password="password";
    var inputId = document.getElementById("admin-id").value;
    var inputPassword = document.getElementById("admin-password").value;
    if (adminId == inputId && password == inputPassword) {
        return true;
    } else {
        return false;
    }
}