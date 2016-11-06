$(document).ready(function() {
    inicializarContenedorDias();
    inicializarFranjas();

    $("input").checkboxradio();
    $(".controlgroup").controlgroup({"direction": "vertical"});
    $("button").button({
        icon: "ui-icon-check",
        iconPosition: "left"
    });
    $(".controlgroup-horizontal").controlgroup({"direction": "horizontal"});
    $("#dialog").dialog({
        autoOpen: false,
        modal: true
    });
});

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
            $("#msg").text("Está intentando marcar más opciones de las permitidas. Por favor, seleccione dos o tres únicamente");
            $("#dialog").dialog( "option", "title", "Límite de opciones" );
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

function checkTerminar() {
    var franjasSeleccionadas = $("#contenedorFranja input:checked");
    if (franjasSeleccionadas.length < 2) {
        $("#msg").text("Está intentando marcar menos opciones de las permitidas. Por favor, seleccione dos o tres");
        $("#dialog").dialog( "option", "title", "Límite de opciones" );
        $("#dialog").dialog("open");
    } else {
        $("#msg").text("Todo correcto");
        $("#dialog").dialog( "option", "title", "OK" );
        $("#dialog").dialog("open");
    }
}
