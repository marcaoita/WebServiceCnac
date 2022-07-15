 $(document).ready(function() {
    $('input[type="file"]').change(function(e) {
        let arquivo = e.target.files[0].name;
        $("#nome-arquivo").text(arquivo + ' foi selecionado.');

    });
});
