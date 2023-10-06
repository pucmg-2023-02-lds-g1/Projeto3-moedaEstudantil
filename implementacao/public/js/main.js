function visibilidadeDaSenha() {
    var input = document.getElementById("senha");
    var icon = document.getElementById("senhaIcon");
    if (input.type === "password") {
        icon.classList.remove("bi-eye-slash");
        input.type = "text";
        icon.classList.add("bi-eye-fill");
    } else {
        icon.classList.remove("bi-eye-fill");
        input.type = "password";
        icon.classList.add("bi-eye-slash");
    }
}