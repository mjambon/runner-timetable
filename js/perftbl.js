var perftbl = (function() {
  var mod = {};

  function refresh(x) {
    var view = $("#results");
    view.children().remove();

    var table = $("<table class='table'/>");
    function row(label, value) {
      var tr = $("<tr/>")
        .append($("<td/>").text(label))
        .append($("<td/>").text(value));
      table.append(tr);
    };
    row("100m", x.t100m);
    row("200m", x.t200m);
    row("400m", x.t400m);
    row("800m", x.t800m);
    row("5K", x.t5km);
    row("10K", x.t10km);
    row("Half-marathon", x.tHalfMarathon);
    row("Marathon", x.tMarathon);
    row("50K", x.t50km);
    row("50M", x.t50mi);
    row("100K", x.t100km);
    row("100M", x.t100mi);
    row("km/h", x.speedKm);
    row("mph", x.speedMi);
    view.append(table);
  }

  function setSpeed(sp) {
    var x = speed.format(sp);
    $("#input-pace-km").val(x.paceKm);
    $("#input-pace-mi").val(x.paceMi);
    refresh(x);
  }

  function initKmInput() {
    var elt = $("#input-pace-km");
    elt.keydown(function (event) {
      var key = event.which;
      var sp = speed.readPaceKm(elt.val());
      var x = speed.format(sp);
      if (key === 38 /* up arrow */) {
        var paceKm = speed.formatTime(x.paceKmNum + 1);
        sp = speed.readPaceKm(paceKm);
        setSpeed(sp);
        return false;
      } else if (key === 40 /* down arrow */) {
        var paceKm = speed.formatTime(x.paceKmNum - 1);
        sp = speed.readPaceKm(paceKm);
        setSpeed(sp);
        return false;
      }
      else {
        $("#input-pace-mi").val(x.paceMi);
        refresh(x);
      }
    });
  }

  function initMiInput() {
    var elt = $("#input-pace-mi");
    elt.keydown(function (event) {
      var key = event.which;
      var sp = speed.readPaceMi(elt.val());
      var x = speed.format(sp);
      if (key === 38 /* up arrow */) {
        var paceMi = speed.formatTime(x.paceMiNum + 1);
        sp = speed.readPaceMi(paceMi);
        setSpeed(sp);
        return false;
      } else if (key === 40 /* down arrow */) {
        var paceMi = speed.formatTime(x.paceMiNum - 1);
        sp = speed.readPaceMi(paceMi);
        setSpeed(sp);
        return false;
      }
      else {
        $("#input-pace-km").val(x.paceKm);
        refresh(x);
      }
    });
  }

  mod.init = function() {
    initKmInput();
    initMiInput();
    $("#input-pace-km")
      .val("5:00")
      .trigger("keydown")
      .focus();
  };

  return mod;
})();
