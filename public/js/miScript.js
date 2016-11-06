$(document).ready(function() {
    var progressbar = $("#progressbar");
      progressLabel = $(".progress-label");
      $("#progressbar").progressbar({
          value: true,
          change: function() {
            progressLabel.text(progressbar.progressbar("value") + "%" );
          },
          complete: function() {
            progressLabel.text("Completado");
          }
      });

      var contenedorDias = $("#contenedorDias");
      for (var i = 1; i <= 7; i++) {
          var dia = new Date();
          dia.setDate(dia.getDate() + i);
          contenedorDias.append($("<label for=\"" + dia.getTime() + "\">"+ dia.toLocaleDateString() + "</label>"))
          contenedorDias.append($("<input type=\"checkbox\" name=\"" + dia.getTime() + "\" id=\"" + dia.getTime() + "\">"));
      }
      var franjas = ["Mañana", "Tarde", "Noche"];
      $("#contenedorDias input").on("change", function() {
          if (this.checked) {
              var contenedorFranja = $("#contenedorFranja");
              var wrapperDia = $("<div id=\"" + this.id + "-wrapper\" class=\"controlgroup-horizontal\"><label class='first-inner-label'>" + this.labels[0].innerText + "</label></div>");
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

      $("input").checkboxradio();
      $(".controlgroup").controlgroup({"direction": "vertical"});
      $(".controlgroup-horizontal").controlgroup({"direction": "horizontal"});
      $("#dialog").dialog({
          autoOpen: false,
          modal: true
      });
});

function checkLimit(source) {
    if (source.checked) {
        var franjasSeleccionadas = $("#contenedorFranja input:checked");
        if (franjasSeleccionadas.length > 3) {
            $("#dialog").dialog("open");
            $(source).prop("checked", false);
        }
    }
}
