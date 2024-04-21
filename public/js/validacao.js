
    document.getElementById("nome").addEventListener("input", function () {
        var nomeInput = this.value.trim();
        var nomeError = document.getElementById("nomeError");
        if (nomeInput.length < 3 || nomeInput.length > 30) {
            nomeError.textContent = "O nome deve ter entre 3 e 30 caracteres.";
        } else {
            nomeError.textContent = "";
        }
    });

       