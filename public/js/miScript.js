$(document).ready(function() {
    var progressbar = $("#progressbar");
    var progressLabel = $(".progress-label");
    inicializarProgressBar();
    inicializarContenedorDias();
    inicializarFranjas();

    $("input").checkboxradio();
    $(".controlgroup").controlgroup({"direction": "vertical"});
    $(".controlgroup-horizontal").controlgroup({"direction": "horizontal"});
    $("#dialog").dialog({
        autoOpen: false,
        modal: true
    });
});

function inicializarProgressBar() {
    $("#progressbar").progressbar({
        value: true,
        change: function() {
          progressLabel.text(progressbar.progressbar("value") + "%" );
        },
        complete: function() {
          progressLabel.text("Completado");
        }
    });
}

function inicializarContenedorDias() {
    var contenedorDias = $("#contenedorDias");
    for (var i = 1; i <= 7; i++) {
        var dia = new Date();
        dia.setDate(dia.getDate() + i);
        contenedorDias.append($("<label for=\"" + dia.getTime() + "\">"+ dia.toLocaleDateString() + "</label>"))
        contenedorDias.append($("<input type=\"checkbox\" name=\"" + dia.getTime() + "\" id=\"" + dia.getTime() + "\">"));
    }
}

function checkLimit(source) {
    if (source.checked) {
        var franjasSeleccionadas = $("#contenedorFranja input:checked");
        if (franjasSeleccionadas.length > 3) {
            $("#dialog").dialog("open");
            $(source).prop("checked", false);
        }
    }
}

function inicializarFranjas() {
    var franjas = ["Mañana", "Tarde", "Noche"];
    $("#contenedorDias input").on("change", function() {
        if (this.checked) {
            var contenedorFranja = $("#contenedorFranja");
            var wrapperDia = $("<div id=\"" + this.id + "-wrapper\" class=\"controlgroup-horizontal\"><label class='first-inner-label col-xs-12 col-sm-2'>" + this.labels[0].innerText + "</label></div>");
            for (var franja in franjas) {
                wrapperDia.append($("<label for=\"" + this.id + franja + "\">"+ franjas[franja] + "</label>"))
                wrapperDia.append($("<input onchange='checkLimit(this)' type=\"checkbox\" name=\"" + this.id + franja + "\" id=\"" + this.id + franja + "\">"));
            }
            contenedorFranja.append(wrapperDia);
            $("input").checkboxradio();
        } else {
            $("#" + this.id + "-wrapper").remove();
        }
    });
}
