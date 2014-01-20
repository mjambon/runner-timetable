/*
  Parsing and formatting of speed, using units and formats commonly
  used by distance runners.

  The internal representation is a speed in meters per seconds.
*/

var speed = (function() {
  var mod = {};

  var mile = 1609.34;
  var km = 1000;
  var min = 60;
  var hour = 3600;

  /* parse the format h:m:s or m:s */
  function parseTime(s) {
    var a = s.split(":");
    switch (a.length) {
    case 1:
      return parseFloat(a[0]);
    case 2:
      return 60 * parseFloat(a[0]) + parseFloat(a[1]);
    case 3:
      return 3600 * parseFloat(a[0]) + 60 * parseFloat(a[1]) + parseFloat(a[0]);
    default:
      return NaN;
    }
  }

  function pad2(n) {
    var s = n.toString();
    if (s.length > 1)
      return s;
    else
      return "0" + s;
  }

  /* 4:01 3:08:12 */
  mod.formatTime = function(t) {
    var hours = Math.floor(t/3600);
    t = t - hours * 3600;
    var min = Math.floor(t/60);
    t = t - min * 60;
    var sec = Math.round(t);

    if (hours === 0)
      return min.toString() + ":" + pad2(sec);
    else
      return hours.toString() + ":" + pad2(min) + ":" + pad2(sec);
  }

  /* 12.34 */
  function formatSpeed(x) {
    return (Math.round(x * 100) / 100).toString();
  }

  /* convert speed in meters per seconds into various units and formats */
  mod.format = function(speed) {
    var pace = 1 / speed;

    /* kilometers per hour */
    var speedKm = formatSpeed(speed * hour / km);

    /* h:mm:ss per kilometer */
    var paceKmNum = pace * km;
    var paceKm = mod.formatTime(paceKmNum);

    /* miles per hour */
    var speedMi = formatSpeed(speed * hour / mile);

    /* h:mm:ss per mile */
    var paceMiNum = pace * mile;
    var paceMi = mod.formatTime(paceMiNum);

    function perfKm(distKm) {
      var t = distKm / speedKm * hour;
      return mod.formatTime(t);
    }

    function perfMi(distMi) {
      var t = distMi / speedMi * hour;
      return mod.formatTime(t);
    }

    return {
      /* numbers */
      speed: speed,
      pace: pace,
      paceKmNum: paceKmNum,
      paceMiNum: paceMiNum,

      /* strings */
      speedKm: speedKm,
      paceKm: paceKm,
      speedMi: speedMi,
      paceMi: paceMi,

      t100m: perfKm(0.1),
      t200m: perfKm(0.2),
      t400m: perfKm(0.4),
      t800m: perfKm(0.8),
      t1500m: perfKm(1.5),
      t1mi: perfMi(1),
      t3000m: perfKm(3),
      t2mi: perfMi(2),
      t5km: perfKm(5),
      t5mi: perfMi(5),
      t10km: perfKm(10),
      t15km: perfKm(15),
      t10mi: perfMi(10),
      t20km: perfKm(20),
      tHalfMarathon: perfKm(21.0975),
      t15mi: perfMi(15),
      t25km: perfKm(25),
      t30km: perfKm(30),
      t20mi: perfMi(20),
      t40km: perfKm(40),
      tMarathon: perfKm(42.195),
      t30mi: perfMi(30),
      t50km: perfKm(50),
      t75km: perfKm(75),
      t50mi: perfMi(50),
      t100km: perfKm(100),
      t150km: perfKm(150),
      t100mi: perfMi(100),
      t200km: perfKm(200)
    };
  };

  mod.readSpeedKm = function(s) {
    var speedKm = parseFloat(s);
    var speed = speedKm * km / hour;
  };

  mod.readSpeedMi = function(s) {
    var speedMi = parseFloat(s);
    var speed = speedMi * mile / hour;
  };

  mod.readPaceKm = function(s) {
    var paceKm = parseTime(s);
    var speed = km / paceKm;
    return speed;
  };

  mod.readPaceMi = function(s) {
    var paceMi = parseTime(s);
    var speed = mile / paceMi;
    return speed;
  };

  mod.readPerfKm = function(distKmStr, timeStr) {
    var d = parseFloat(distKmStr) * km;
    var t = parseTime(timeStr);
    var speed = d / t;
    return speed;
  };

  mod.readPerfMi = function(distMiStr, timeStr) {
    var d = parseFloat(distMiStr) * mile;
    var t = parseTime(timeStr);
    var speed = d / t;
    return speed;
  };

  return mod;
})();
