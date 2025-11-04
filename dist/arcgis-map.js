var ke = typeof window < "u";
const fe = {
  Promise: ke ? window.Promise : void 0
};
var ge = "4.25", J = "next";
function he(e) {
  if (e.toLowerCase() === J)
    return J;
  var o = e && e.match(/^(\d)\.(\d+)/);
  return o && {
    major: parseInt(o[1], 10),
    minor: parseInt(o[2], 10)
  };
}
function be(e) {
  return e === void 0 && (e = ge), "https://js.arcgis.com/".concat(e, "/");
}
function Ne(e) {
  e === void 0 && (e = ge);
  var o = be(e), t = he(e);
  if (t !== J && t.major === 3) {
    var n = t.minor <= 10 ? "js/" : "";
    return "".concat(o).concat(n, "esri/css/esri.css");
  } else
    return "".concat(o, "esri/themes/light/main.css");
}
function Te(e) {
  var o = document.createElement("link");
  return o.rel = "stylesheet", o.href = e, o;
}
function Ee(e, o) {
  if (o) {
    var t = document.querySelector(o);
    t.parentNode.insertBefore(e, t);
  } else
    document.head.appendChild(e);
}
function Me(e) {
  return document.querySelector('link[href*="'.concat(e, '"]'));
}
function je(e) {
  return !e || he(e) ? Ne(e) : e;
}
function He(e, o) {
  var t = je(e), n = Me(t);
  return n || (n = Te(t), Ee(n, o)), n;
}
var Ge = {};
function Pe(e) {
  var o = document.createElement("script");
  return o.type = "text/javascript", o.src = e, o.setAttribute("data-esri-loader", "loading"), o;
}
function ce(e, o, t) {
  var n;
  t && (n = Ue(e, t));
  var a = function() {
    o(e), e.removeEventListener("load", a, !1), n && e.removeEventListener("error", n, !1);
  };
  e.addEventListener("load", a, !1);
}
function Ue(e, o) {
  var t = function(n) {
    o(n.error || new Error("There was an error attempting to load ".concat(e.src))), e.removeEventListener("error", t, !1);
  };
  return e.addEventListener("error", t, !1), t;
}
function ve() {
  return document.querySelector("script[data-esri-loader]");
}
function I() {
  var e = window.require;
  return e && e.on;
}
function Ze(e) {
  e === void 0 && (e = {});
  var o = {};
  [Ge, e].forEach(function(a) {
    for (var d in a)
      Object.prototype.hasOwnProperty.call(a, d) && (o[d] = a[d]);
  });
  var t = o.version, n = o.url || be(t);
  return new fe.Promise(function(a, d) {
    var h = ve();
    if (h) {
      var y = h.getAttribute("src");
      y !== n ? d(new Error("The ArcGIS API for JavaScript is already loaded (".concat(y, ")."))) : I() ? a(h) : ce(h, a, d);
    } else if (I())
      d(new Error("The ArcGIS API for JavaScript is already loaded."));
    else {
      var v = o.css;
      if (v) {
        var H = v === !0;
        He(H ? t : v, o.insertCssBefore);
      }
      h = Pe(n), ce(h, function() {
        h.setAttribute("data-esri-loader", "loaded"), a(h);
      }, d), document.body.appendChild(h);
    }
  });
}
function le(e) {
  return new fe.Promise(function(o, t) {
    var n = window.require.on("error", t);
    window.require(e, function() {
      for (var a = [], d = 0; d < arguments.length; d++)
        a[d] = arguments[d];
      n.remove(), o(a);
    });
  });
}
function Oe(e, o) {
  if (o === void 0 && (o = {}), I())
    return le(e);
  var t = ve(), n = t && t.getAttribute("src");
  return !o.url && n && (o.url = n), Ze(o).then(function() {
    return le(e);
  });
}
const Ve = (e, o) => e.replace(/\(\?\<(.+?)\>[^)]*\)/g, (t, n) => o[n]);
Number.prototype.toRad = function() {
  return this * (Math.PI / 180);
};
Number.prototype.toDeg = function() {
  return this * (180 / Math.PI);
};
Number.prototype.to2DP = function() {
  return parseFloat(this.toFixed(2));
};
const ue = function(e) {
  return Array.isArray(e) ? e : [
    e.longitude || (e.coords ? e.coords.longitude : e.geometry ? e.geometry.longitude : null),
    e.latitude || (e.coords ? e.coords.latitude : e.geometry ? e.geometry.latitude : null)
  ];
}, de = function(e, o) {
  const [t, n] = ue(e), [a, d] = ue(o), h = a.toRad(), y = d.toRad(), v = t.toRad(), H = n.toRad(), G = Math.sin(h - v) * Math.cos(y), P = Math.cos(H) * Math.sin(y) - Math.sin(H) * Math.cos(y) * Math.cos(h - v);
  return (Math.atan2(G, P).toDeg() + 360) % 360;
}, E = (e, o = {}, t = "") => {
  const n = document.createElement(e);
  for (let a in o)
    n.setAttribute(a, o[a]);
  return n.innerHTML = t, n;
}, Ye = (e, o) => (document.getElementById(e) || document.getElementsByTagName("head")[0].prepend(E("STYLE", { type: "text/css" }, o)), !0), We = 600, Re = 8, me = (e, o) => {
  const t = Number(e);
  return Number.isFinite(t) && t > 0 ? t : o;
}, S = (e, o) => {
  if (Array.isArray(e))
    return [0, 1, 2].map((t) => me(e[t], o));
  if (typeof e == "string")
    try {
      const t = JSON.parse(e);
      return Array.isArray(t) ? S(t, o) : S([t, t, t], o);
    } catch {
      return [o, o, o];
    }
  if (typeof e == "number") {
    const t = me(e, o);
    return [t, t, t];
  }
  return [o, o, o];
}, qe = "data:image/png;base64,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", Be = function(e = {}) {
  Ye("geocam-argis-map", `
      .geocam-auto-rotate-checkbox, .geocam-auto-brightness-checkbox {
        display: none;
      }

      .geocam-auto-rotate-span {
        background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24'  viewBox='0 0 24 24' fill='currentColor'><rect fill='none' height='24' width='24'/><path d='M7.94,5.12L6.49,3.66C8.07,2.61,9.96,2,12,2c5.52,0,10,4.48,10,10c0,2.04-0.61,3.93-1.66,5.51l-1.46-1.46 C19.59,14.86,20,13.48,20,12c0-4.41-3.59-8-8-8C10.52,4,9.14,4.41,7.94,5.12z M17.66,9.53l-1.41-1.41l-2.65,2.65l1.41,1.41 L17.66,9.53z M19.78,22.61l-2.27-2.27C15.93,21.39,14.04,22,12,22C6.48,22,2,17.52,2,12c0-2.04,0.61-3.93,1.66-5.51L1.39,4.22 l1.41-1.41l18.38,18.38L19.78,22.61z M16.06,18.88l-3.88-3.88l-1.59,1.59l-4.24-4.24l1.41-1.41l2.83,2.83l0.18-0.18L5.12,7.94 C4.41,9.14,4,10.52,4,12c0,4.41,3.59,8,8,8C13.48,20,14.86,19.59,16.06,18.88z'/></svg>")
      }

      .geocam-auto-rotate-checkbox:checked +.geocam-auto-rotate-span {
          background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' viewBox='0 0 24 24' fill='currentColor'><rect fill='none' height='24' width='24'/><path d='M18.6,19.5H21v2h-6v-6h2v2.73c1.83-1.47,3-3.71,3-6.23c0-4.07-3.06-7.44-7-7.93V2.05c5.05,0.5,9,4.76,9,9.95 C22,14.99,20.68,17.67,18.6,19.5z M4,12c0-2.52,1.17-4.77,3-6.23V8.5h2v-6H3v2h2.4C3.32,6.33,2,9.01,2,12c0,5.19,3.95,9.45,9,9.95 v-2.02C7.06,19.44,4,16.07,4,12z M16.24,8.11l-5.66,5.66l-2.83-2.83l-1.41,1.41l4.24,4.24l7.07-7.07L16.24,8.11z'/></svg>")
      }

      .geocam-auto-brightness-span {
          background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'  enable-background='new 0 0 24 24' viewBox='0 0 24 24'  fill='currentColor'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48zM12 6.5c-3.03 0-5.5 2.47-5.5 5.5s2.47 5.5 5.5 5.5 5.5-2.47 5.5-5.5-2.47-5.5-5.5-5.5zm0 9c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z'/></svg>");
      }

      .geocam-auto-brightness-checkbox:checked +.geocam-auto-brightness-span {
          background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' viewBox='0 0 24 24' fill='currentColor'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M11 7l-3.2 9h1.9l.7-2h3.2l.7 2h1.9L13 7h-2zm-.15 5.65L12 9l1.15 3.65h-2.3zM20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48z'/></svg>")
      }

     .geocam-auto-brightness-checkbox:disabled +.geocam-auto-brightness-span {
          opacity: 50%;
          cursor: auto;
          background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'  enable-background='new 0 0 24 24' viewBox='0 0 24 24'  fill='currentColor'><path d='M0 0h24v24H0V0z' fill='none'/><path d='M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48zM12 6.5c-3.03 0-5.5 2.47-5.5 5.5s2.47 5.5 5.5 5.5 5.5-2.47 5.5-5.5-2.47-5.5-5.5-5.5zm0 9c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z'/></svg>");
      }

    `);
  let t, n, a = [], d, h, y, v, H, G, P, O, V, F, Y, Q, R, pe, K, we, $ = !0, _;
  const { mapView: s, prevNextPlugin: C, widgets: Ce, expands: Xe, src: q } = e, U = document.createElement("div"), ee = function(r, u, i) {
    return {
      geometry: {
        type: "point",
        latitude: i,
        longitude: u
      },
      symbol: {
        type: "picture-marker",
        // autocasts as new PictureMarkerSymbol()
        url: qe,
        width: "56",
        height: "101",
        angle: r
      }
    };
  };
  let z = ee(0, 0, 0);
  const ye = function(r) {
    return {
      attributes: {
        id: "lock"
      },
      geometry: {
        type: "point",
        latitude: r.latitude,
        longitude: r.longitude
      },
      symbol: {
        type: "simple-marker",
        // autocasts as new SimpleMarkerSymbol()
        path: "M12 4C7.31 4 3.07 5.9 0 8.98L12 21l5-5.01V8h5.92C19.97 5.51 16.16 4 12 4zm7 14h2v2h-2z M19 10h2v6h-2z",
        color: [255, 0, 0, 0.8],
        //"rgba(0,0,0,0)", for some reason if color isn't changed then outline colour doesn't change either.
        size: 24,
        // pixels
        xoffset: 0,
        yoffset: 12,
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255, 1],
          width: 0
          // points
        }
      }
    };
  };
  let X = null;
  const W = function(r, u, i) {
    d && (d.removeAll(), t.visible() ? (U.classList.remove("esri-disabled"), r !== null && (P() ? (s.rotation = r * -1, r = 0, (i || i === 0) && s.goTo({
      center: [u, i]
    })) : s.rotation = 0, z = ee(
      r || 0,
      u || z.geometry.longitude,
      i || z.geometry.latitude
    ), d.add(z), (i || i === 0) && _([u, i]))) : U.classList.add("esri-disabled"));
  }, te = function(r, u, i = {}) {
    const c = new RegExp(u, "i");
    let f = c.test(r.name) || c.test(r.alias);
    return f && i.description && (f = !!r.description), f;
  }, oe = function(r) {
    if (r) {
      var u = document.createElement("textarea");
      return u.innerHTML = r, u.value;
    } else
      return "";
  }, xe = (r, u) => {
    const i = r.base;
    if (r.filenames)
      return JSON.parse(u[r.filenames]).map((c) => Array.isArray(c) ? c.map((f) => /^https?:\/\//i.test(f) ? c : `${i}${f}`) : /^https?:\/\//i.test(c) ? c : `${i}${c}`);
    {
      const c = u[r.capture].split(".")[0], f = c.split("/").pop(), M = JSON.parse(u[r.lengths]), x = JSON.parse(u[r.offsets]);
      return M.map((w, m) => {
        const k = encodeURIComponent(
          `https://s3.us-west-004.backblazeb2.com/gc-raw-surveys-archive/${c}_${m}.tar`
        );
        return `${i}${f}/${m}/${u[r.shot]}.jpg?offset=${x[m]}&length=${w}&container=${k}`;
      });
    }
  }, Ae = function(r) {
    return a.findIndex((u) => u.layer == r.layer);
  }, Le = function(r) {
    if (t.label) {
      const { capture: u, utc_time: i, shot: c } = r, f = new Date(i);
      t.label(`${f.toLocaleString()}`);
    }
  };
  let re;
  const D = function(r, u) {
    const i = R();
    console.log("shotclick with viewlock", i);
    const c = a[u], f = r.attributes[c.shot];
    re = f, t.shot(f), C && (C.prev(r.attributes.prev), C.next(r.attributes.next));
    const M = [0, 1, 2].map(
      (T) => Ve(c.calibrationBase, {
        camera: T,
        rig_id: r.attributes[c.rigId],
        calibration: r.attributes[c.calibration]
      })
    ), x = r.attributes[c.yaw], Z = r.attributes[c.rotation], w = V() && c.brightness ? r.attributes[c.brightness] : null;
    F = w;
    const m = S(
      r.attributes.exposure_us,
      We
    ), k = S(
      r.attributes.gain_boost,
      Re
    ), j = {
      id: f,
      latitude: r.geometry && typeof r.geometry.latitude == "number" ? r.geometry.latitude : null,
      longitude: r.geometry && typeof r.geometry.longitude == "number" ? r.geometry.longitude : null,
      utc_time: r.attributes.utc_time || null,
      capture: r.attributes[c.capture] || null,
      exposure_us: m,
      gain_boost: k
    }, N = xe(c, r.attributes);
    if (i) {
      const T = de(r.geometry, i);
      t.facing(T);
    }
    t.show(N, x, M, Z, w, j), W(
      t.facing(),
      r.geometry.longitude,
      r.geometry.latitude
    ), Le(r.attributes);
  };
  let ne;
  const se = function(r, u, i, c) {
    clearTimeout(ne), ne = setTimeout(() => {
      const M = Math.ceil(r / 500), x = s.extent, Z = `${x.xmin},${x.ymin},${x.xmax},${x.ymax},${x.spatialReference.wkid}`, w = `mod(id,${M}) = 0 AND extent = ${Z}`;
      a.forEach((m) => {
        m.layer.definitionExpression !== w && (m.layer.definitionExpression = w, console.log(
          "definition expression changed for",
          m.layer,
          w
        ));
      }), Q(s.zoom), W(t.facing());
    }, 500);
  }, ze = function(r, u, i, c) {
    K([s.center.longitude, s.center.latitude]);
  };
  this.init = async function(r) {
    t = r, _ = t.store("marker"), Q = t.store("zoom"), K = t.store("center"), R = t.store("viewlock"), P = t.store("autorotate"), G = E("DIV", { class: "geocam-auto-rotate" });
    const u = E("LABEL", { class: "geocam-auto-rotate-label" }), i = E("INPUT", {
      type: "checkbox",
      class: "geocam-auto-rotate-checkbox"
    }), c = E(
      "SPAN",
      { class: "geocam-auto-rotate-span geocam-viewer-control-button" },
      " Autorotate"
    );
    i.checked = P(), i.addEventListener("change", () => {
      P(i.checked);
    }), u.appendChild(i), u.appendChild(c), G.appendChild(u), t.addControl(G, "left-top"), y = P((m) => {
      G.setAttribute(
        "title",
        m ? "turn auto-rotate off" : "turn auto-rotate on"
      ), W(
        t.facing(),
        z.geometry.longitude,
        z.geometry.latitude
      );
    }), V = t.store("autobrightness"), O = E("DIV", { class: "geocam-auto-brightness" });
    const f = E("LABEL", { class: "geocam-auto-brightness-label" });
    Y = E("INPUT", {
      type: "checkbox",
      class: "geocam-auto-brightness-checkbox"
    });
    const M = E(
      "SPAN",
      { class: "geocam-auto-brightness-span geocam-viewer-control-button" },
      " Autobrightness"
    );
    Y.disabled = !0, Y.checked = V(), Y.addEventListener("change", () => {
      V(Y.checked);
    }), f.appendChild(Y), f.appendChild(M), O.appendChild(f), t.addControl(O, "left-top"), v = V((m) => {
      O.setAttribute(
        "title",
        m ? "turn auto-brightness off" : "turn auto-brightness on"
      ), t.reload(V() ? F : "[1,1,1]");
    }), H = t.visible((m) => W(t.facing()));
    const [x, Z, w] = await Oe([
      "esri/layers/GraphicsLayer",
      "esri/core/watchUtils",
      "esri/layers/FeatureLayer"
    ]);
    if (s.when(async () => {
      s.on("clickable", (l) => {
        $ = l;
      }), s.on("key-down", (l) => {
        if (l && l.target && l.target.closest("input,calcite-input")) return;
        const b = [
          "ArrowUp",
          "ArrowDown",
          "ArrowRight",
          "ArrowLeft",
          "a",
          "d",
          "w",
          "s"
          // w and s don't seem to be used for map actions but just in case that changes in the future.
        ], g = l && l.key;
        t.visible() && b.indexOf(g) !== -1 && l.stopPropagation();
      }), s.on("immediate-click", (l) => {
        if (!$) return;
        const b = {
          x: l.x,
          y: l.y
        };
        if (console.log("immediate-click", l, b), n) {
          console.log("space wqas down");
          const g = s.toMap(b);
          if (R(g), X && s.graphics.removeAll(), X = ye(g), s.graphics.add(X), t.visible()) {
            const L = de(z.geometry, g);
            t.facing(L);
          }
        } else
          s.hitTest(b).then((g) => {
            if (g.results && g.results.length > 0)
              for (var L = 0; L < g.results.length; L++) {
                const p = g.results[L].graphic, A = Ae(p);
                if (A >= 0) {
                  Object.entries(p.attributes).length < 2 ? p.layer.queryFeatures({
                    objectIds: [p.attributes.id],
                    returnGeometry: !0,
                    outFields: "*",
                    where: p.layer.definitionExpression
                  }).then((B) => {
                    B.features.length > 0 && D(B.features[0], A);
                  }) : D(p, A);
                  break;
                }
              }
          });
      });
      const m = document.createElement("div");
      m.className = "esri-widget--button", m.title = "Copy short URL to clipboad", m.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M23 15H11.707l2.646 2.646-.707.707L9.793 14.5l3.854-3.854.707.707L11.707 14H23zm-13-5H6v1h4zm-4 5h2v-1H6zM3 4h3V3h3a2 2 0 0 1 4 0h3v1h3v9h-1V5h-2v2H6V5H4v16h14v-5h1v6H3zm4 2h8V4h-3V2.615A.615.615 0 0 0 11.386 2h-.771a.615.615 0 0 0-.615.615V4H7zM6 19h4v-1H6z"></path></svg>
    <span class="esri-icon-font-fallback-text">Copy short URL to clipboad</span>`, m.addEventListener("click", async () => {
        const l = `${document.location.origin}/🔗`;
        try {
          const g = await (await fetch(l, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              link: { url: document.location.toString() }
            })
          })).json();
          await navigator.clipboard.writeText(g.link), alert(`Url copied to clipboard: ${g.link}`);
        } catch (b) {
          alert(
            `Sorry, the short URL could not be copied to the clipboard: ${b}`
          );
        }
      }), s.ui.add(m, "top-right"), U.className = "esri-widget--button", U.title = "Recenter map on selected shot", U.innerHTML = '<span aria-hidden="true" class="esri-icon-zoom-to-object"></span><span class="esri-icon-font-fallback-text">Expand</span>', U.addEventListener("click", () => {
        s.goTo({
          center: [z.geometry.longitude, z.geometry.latitude]
        });
      }), s.ui.add(U, "top-right"), h = t.facing((l) => {
        W(l);
      });
      const k = new URLSearchParams(window.location.hash.substr(1)), j = k.get("center");
      j && (s.center = JSON.parse(j));
      const N = k.get("zoom");
      N && (s.zoom = JSON.parse(N));
      const T = k.get("marker");
      if (T) {
        const l = JSON.parse(T);
        if (l) {
          const [b, g] = l;
          W(t.facing(), b, g);
        }
      }
      Z.watch(s, "scale", se), se(s.scale), Z.watch(s, "center", ze), t.shot((l) => {
        const b = parseInt(
          typeof l == "object" && l !== null ? l.id : l
        );
        b && b !== re ? (console.log("Got shot", l, "layers", a.length), a.forEach((g, L) => {
          const p = g.layer;
          t.resetProgress(), console.log("Querying layer for shot", p, b), p.queryFeatures({
            objectIds: [b],
            returnGeometry: !0,
            outFields: "*",
            where: p.definitionExpression
          }).then((A) => {
            if (console.log("Got results for layer", p, A), A.features.length > 0) {
              const B = A.features[0];
              D(B, L);
            }
          });
        })) : l || t.hide();
      });
    }), q) {
      const m = `${q}/2`, k = new w({
        url: m,
        visible: !1,
        outFields: ["*"],
        editingEnabled: !0
      });
      s.map.add(k);
      const j = `${q}/0`;
      console.log("shots url is", j);
      const N = new w({
        url: j,
        definitionExpression: "mod(id,100) = 0"
        // start with agressive simplifaction - view should get scale change early on to override this
      });
      s.map.add(N), N.when((b) => {
        const g = b.fields, L = g.find((A) => te(A, "filenames")), p = g.find((A) => te(A, "calibration"));
        a.push({
          layer: N,
          shot: "id",
          filenames: "filenames",
          yaw: "yaw",
          rotation: "rotation_matrix",
          datetime: "utc_time",
          brightness: null,
          base: oe(L && L.description),
          calibration: "calibration",
          rigId: null,
          calibrationBase: oe(p.description),
          capture: "capture"
        }), s.extent = b.fullExtent;
      });
      const T = `${q}/1`;
      console.log("points features url is", T);
      const l = new w({
        url: T,
        popupEnabled: !0,
        popupTemplate: {
          title: "{reference}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "embed",
                  label: "content"
                }
              ]
            }
          ]
        }
      });
      s.map.add(l), d = new x({
        title: "GeoCam Field of View",
        geometryType: "point",
        spatialReference: {
          wkid: 4326
        }
      }), s.map.layers.add(d), s.when(() => {
        s.map.reorder(d, 1e3), s.map.reorder(N, 1e3), s.map.reorder(l, 1e3);
      });
    }
  };
  var ae = function(r) {
    switch (r.key, r.key) {
      case "Escape": {
        R(null), s.graphics.removeAll();
        break;
      }
      case " ":
        n = !0;
    }
  }, ie = function(r) {
    switch (r.key, r.key) {
      case " ":
        n = !1;
    }
  };
  document.addEventListener("keydown", ae), document.addEventListener("keyup", ie), this.destroy = function() {
    document.removeEventListener("keydown", ae), document.removeEventListener("keyup", ie), h(), y(), v(), pe(), we(), H(), s.map.removeLayer(d), t.wrapper.removeChild(G), t.wrapper.removeChild(O);
  };
};
class Se extends HTMLElement {
  constructor() {
    super(), this.plugin = null, console.log("GeocamViewerArcgisMap init");
  }
  connectedCallback() {
    const o = this.closest("geocam-viewer");
    if (!o) {
      console.error("GeocamViewerArcgisMap must be a child of GeocamViewer");
      return;
    }
    const t = (n) => {
      const a = o.viewer;
      a && typeof a.plugin == "function" ? n(a) : setTimeout(() => t(n), 50);
    };
    this.link = (n) => {
      console.log("linking to ", n);
      const a = this.getAttribute("src");
      a || console.warn("No src attribute on geocam-viewer-arcgis-map"), t((d) => {
        if (this.plugin)
          return;
        this.viewer = d, this.mapView = n;
        const h = o.querySelector("geocam-viewer-prev-next-control"), y = h && h.plugin;
        this.plugin = new Be({ mapView: n, prevNextPlugin: y, src: a }), this.viewer.plugin(this.plugin);
        const v = o.querySelector("geocam-viewer-screen-shot");
        v && v.plugin && v.plugin.arcgisView(n);
      });
    }, console.log("GeocamViewerArcgisMap connected");
  }
  disconnectedCallback() {
    this.plugin = null, this.viewer = null, this.mapView = null, console.log("GeocamViewerArcgisMap disconnected");
  }
}
window.customElements.define("geocam-viewer-arcgis-map", Se);
export {
  Se as GeocamViewerArcgisMap
};
