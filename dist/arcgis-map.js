var ze = typeof window < "u";
const de = {
  Promise: ze ? window.Promise : void 0
};
var me = "4.25", D = "next";
function he(e) {
  if (e.toLowerCase() === D)
    return D;
  var n = e && e.match(/^(\d)\.(\d+)/);
  return n && {
    major: parseInt(n[1], 10),
    minor: parseInt(n[2], 10)
  };
}
function fe(e) {
  return e === void 0 && (e = me), "https://js.arcgis.com/".concat(e, "/");
}
function Le(e) {
  e === void 0 && (e = me);
  var n = fe(e), t = he(e);
  if (t !== D && t.major === 3) {
    var r = t.minor <= 10 ? "js/" : "";
    return "".concat(n).concat(r, "esri/css/esri.css");
  } else
    return "".concat(n, "esri/themes/light/main.css");
}
function ke(e) {
  var n = document.createElement("link");
  return n.rel = "stylesheet", n.href = e, n;
}
function Ne(e, n) {
  if (n) {
    var t = document.querySelector(n);
    t.parentNode.insertBefore(e, t);
  } else
    document.head.appendChild(e);
}
function Te(e) {
  return document.querySelector('link[href*="'.concat(e, '"]'));
}
function Ee(e) {
  return !e || he(e) ? Le(e) : e;
}
function Me(e, n) {
  var t = Ee(e), r = Te(t);
  return r || (r = ke(t), Ne(r, n)), r;
}
var je = {};
function He(e) {
  var n = document.createElement("script");
  return n.type = "text/javascript", n.src = e, n.setAttribute("data-esri-loader", "loading"), n;
}
function ce(e, n, t) {
  var r;
  t && (r = Ge(e, t));
  var c = function() {
    n(e), e.removeEventListener("load", c, !1), r && e.removeEventListener("error", r, !1);
  };
  e.addEventListener("load", c, !1);
}
function Ge(e, n) {
  var t = function(r) {
    n(r.error || new Error("There was an error attempting to load ".concat(e.src))), e.removeEventListener("error", t, !1);
  };
  return e.addEventListener("error", t, !1), t;
}
function ge() {
  return document.querySelector("script[data-esri-loader]");
}
function J() {
  var e = window.require;
  return e && e.on;
}
function Pe(e) {
  e === void 0 && (e = {});
  var n = {};
  [je, e].forEach(function(c) {
    for (var d in c)
      Object.prototype.hasOwnProperty.call(c, d) && (n[d] = c[d]);
  });
  var t = n.version, r = n.url || fe(t);
  return new de.Promise(function(c, d) {
    var v = ge();
    if (v) {
      var L = v.getAttribute("src");
      L !== r ? d(new Error("The ArcGIS API for JavaScript is already loaded (".concat(L, ")."))) : J() ? c(v) : ce(v, c, d);
    } else if (J())
      d(new Error("The ArcGIS API for JavaScript is already loaded."));
    else {
      var k = n.css;
      if (k) {
        var M = k === !0;
        Me(M ? t : k, n.insertCssBefore);
      }
      v = He(r), ce(v, function() {
        v.setAttribute("data-esri-loader", "loaded"), c(v);
      }, d), document.body.appendChild(v);
    }
  });
}
function ie(e) {
  return new de.Promise(function(n, t) {
    var r = window.require.on("error", t);
    window.require(e, function() {
      for (var c = [], d = 0; d < arguments.length; d++)
        c[d] = arguments[d];
      r.remove(), n(c);
    });
  });
}
function Ze(e, n) {
  if (n === void 0 && (n = {}), J())
    return ie(e);
  var t = ge(), r = t && t.getAttribute("src");
  return !n.url && r && (n.url = r), Pe(n).then(function() {
    return ie(e);
  });
}
const Ye = (e, n) => e.replace(/\(\?\<(.+?)\>[^)]*\)/g, (t, r) => n[r]);
Number.prototype.toRad = function() {
  return this * (Math.PI / 180);
};
Number.prototype.toDeg = function() {
  return this * (180 / Math.PI);
};
Number.prototype.to2DP = function() {
  return parseFloat(this.toFixed(2));
};
const le = function(e) {
  return Array.isArray(e) ? e : [
    e.longitude || (e.coords ? e.coords.longitude : e.geometry ? e.geometry.longitude : null),
    e.latitude || (e.coords ? e.coords.latitude : e.geometry ? e.geometry.latitude : null)
  ];
}, ue = function(e, n) {
  const [t, r] = le(e), [c, d] = le(n), v = c.toRad(), L = d.toRad(), k = t.toRad(), M = r.toRad(), j = Math.sin(v - k) * Math.cos(L), H = Math.cos(M) * Math.sin(L) - Math.sin(M) * Math.cos(L) * Math.cos(v - k);
  return (Math.atan2(j, H).toDeg() + 360) % 360;
}, T = (e, n = {}, t = "") => {
  const r = document.createElement(e);
  for (let c in n)
    r.setAttribute(c, n[c]);
  return r.innerHTML = t, r;
}, Ue = (e, n) => (document.getElementById(e) || document.getElementsByTagName("head")[0].prepend(T("STYLE", { type: "text/css" }, n)), !0), Oe = "data:image/png;base64,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", Ve = function(e = {}) {
  Ue("geocam-argis-map", `
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
  let t, r, c = [], d, v, L, k, M, j, H, Z, Y, I, U, F, R, be, Q, ve, K = !0, $;
  const { mapView: a, prevNextPlugin: q, widgets: Re, expands: Be, src: C } = e, G = document.createElement("div"), _ = function(o, l, s) {
    return {
      geometry: {
        type: "point",
        latitude: s,
        longitude: l
      },
      symbol: {
        type: "picture-marker",
        // autocasts as new PictureMarkerSymbol()
        url: Oe,
        width: "56",
        height: "101",
        angle: o
      }
    };
  };
  let N = _(0, 0, 0);
  const pe = function(o) {
    return {
      attributes: {
        id: "lock"
      },
      geometry: {
        type: "point",
        latitude: o.latitude,
        longitude: o.longitude
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
  let S = null;
  const O = function(o, l, s) {
    d && (d.removeAll(), t.visible() ? (G.classList.remove("esri-disabled"), o !== null && (H() ? (a.rotation = o * -1, o = 0, (s || s === 0) && a.goTo({
      center: [l, s]
    })) : a.rotation = 0, N = _(
      o || 0,
      l || N.geometry.longitude,
      s || N.geometry.latitude
    ), d.add(N), (s || s === 0) && $([l, s]))) : G.classList.add("esri-disabled"));
  }, ee = function(o, l, s = {}) {
    const i = new RegExp(l, "i");
    let h = i.test(o.name) || i.test(o.alias);
    return h && s.description && (h = !!o.description), h;
  }, te = function(o) {
    if (o) {
      var l = document.createElement("textarea");
      return l.innerHTML = o, l.value;
    } else
      return ""; // "https://image.geocam.xyz/";
  }, we = (o, l) => {
    const s = o.base;
    if (o.filenames)
      return JSON.parse(l[o.filenames]).map((i) => Array.isArray(i) ? i.map((h) => /^https?:\/\//i.test(h) ? i : `${s}${h}`) : /^https?:\/\//i.test(i) ? i : `${s}${i}`);
    {
      const i = l[o.capture].split(".")[0], h = i.split("/").pop(), E = JSON.parse(l[o.lengths]), x = JSON.parse(l[o.offsets]);
      return E.map((y, m) => {
        const w = encodeURIComponent(
          `https://s3.us-west-004.backblazeb2.com/gc-raw-surveys-archive/${i}_${m}.tar`
        );
        return `${s}${h}/${m}/${l[o.shot]}.jpg?offset=${x[m]}&length=${y}&container=${w}`;
      });
    }
  }, xe = function(o) {
    return c.findIndex((l) => l.layer == o.layer);
  }, ye = function(o) {
    if (t.label) {
      const { capture: l, utc_time: s, shot: i } = o, h = new Date(s);
      t.label(`${h.toLocaleString()}`);
    }
  };
  let oe;
  const X = function(o, l) {
    const s = R();
    console.log("shotclick with viewlock", s);
    const i = c[l], h = o.attributes[i.shot];
    oe = h, t.shot(h), q && (q.prev(o.attributes.prev), q.next(o.attributes.next));
    const E = [0, 1, 2].map(
      (w) => Ye(i.calibrationBase, {
        camera: w,
        rig_id: o.attributes[i.rigId],
        calibration: o.attributes[i.calibration]
      })
    ), x = o.attributes[i.yaw], P = o.attributes[i.rotation], y = Y() && i.brightness ? o.attributes[i.brightness] : null;
    I = y;
    const m = we(i, o.attributes);
    if (s) {
      const w = ue(o.geometry, s);
      t.facing(w);
    }
    t.show(m, x, E, P, y), O(
      t.facing(),
      o.geometry.longitude,
      o.geometry.latitude
    ), ye(o.attributes);
  };
  let ne;
  const re = function(o, l, s, i) {
    clearTimeout(ne), ne = setTimeout(() => {
      const E = Math.ceil(o / 500), x = a.extent, P = `${x.xmin},${x.ymin},${x.xmax},${x.ymax},${x.spatialReference.wkid}`, y = `mod(id,${E}) = 0 AND extent = ${P}`;
      c.forEach((m) => {
        m.layer.definitionExpression !== y && (m.layer.definitionExpression = y, console.log(
          "definition expression changed for",
          m.layer,
          y
        ));
      }), F(a.zoom), O(t.facing());
    }, 500);
  }, Ae = function(o, l, s, i) {
    Q([a.center.longitude, a.center.latitude]);
  };
  this.init = async function(o) {
    t = o, $ = t.store("marker"), F = t.store("zoom"), Q = t.store("center"), R = t.store("viewlock"), H = t.store("autorotate"), j = T("DIV", { class: "geocam-auto-rotate" });
    const l = T("LABEL", { class: "geocam-auto-rotate-label" }), s = T("INPUT", {
      type: "checkbox",
      class: "geocam-auto-rotate-checkbox"
    }), i = T(
      "SPAN",
      { class: "geocam-auto-rotate-span geocam-viewer-control-button" },
      " Autorotate"
    );
    s.checked = H(), s.addEventListener("change", () => {
      H(s.checked);
    }), l.appendChild(s), l.appendChild(i), j.appendChild(l), t.addControl(j, "left-top"), L = H((m) => {
      j.setAttribute(
        "title",
        m ? "turn auto-rotate off" : "turn auto-rotate on"
      ), O(
        t.facing(),
        N.geometry.longitude,
        N.geometry.latitude
      );
    }), Y = t.store("autobrightness"), Z = T("DIV", { class: "geocam-auto-brightness" });
    const h = T("LABEL", { class: "geocam-auto-brightness-label" });
    U = T("INPUT", {
      type: "checkbox",
      class: "geocam-auto-brightness-checkbox"
    });
    const E = T(
      "SPAN",
      { class: "geocam-auto-brightness-span geocam-viewer-control-button" },
      " Autobrightness"
    );
    U.disabled = !0, U.checked = Y(), U.addEventListener("change", () => {
      Y(U.checked);
    }), h.appendChild(U), h.appendChild(E), Z.appendChild(h), t.addControl(Z, "left-top"), k = Y((m) => {
      Z.setAttribute(
        "title",
        m ? "turn auto-brightness off" : "turn auto-brightness on"
      ), t.reload(Y() ? I : "[1,1,1]");
    }), M = t.visible((m) => O(t.facing()));
    const [x, P, y] = await Ze([
      "esri/layers/GraphicsLayer",
      "esri/core/watchUtils",
      "esri/layers/FeatureLayer"
    ]);
    if (a.when(async () => {
      a.on("clickable", (u) => {
        K = u;
      }), a.on("key-down", (u) => {
        const g = [
          "ArrowUp",
          "ArrowDown",
          "ArrowRight",
          "ArrowLeft",
          "a",
          "d",
          "w",
          "s"
          // w and s don't seem to be used for map actions but just in case that changes in the future.
        ], f = u.key;
        t.visible() && g.indexOf(f) !== -1 && u.stopPropagation();
      }), a.on("immediate-click", (u) => {
        if (!K)
          return;
        const g = {
          x: u.x,
          y: u.y
        };
        if (console.log("immediate-click", u, g), r) {
          console.log("space wqas down");
          const f = a.toMap(g);
          if (R(f), S && a.graphics.removeAll(), S = pe(f), a.graphics.add(S), t.visible()) {
            const A = ue(N.geometry, f);
            t.facing(A);
          }
        } else
          a.hitTest(g).then((f) => {
            if (f.results && f.results.length > 0)
              for (var A = 0; A < f.results.length; A++) {
                const b = f.results[A].graphic, z = xe(b);
                if (z >= 0) {
                  Object.entries(b.attributes).length < 2 ? b.layer.queryFeatures({
                    objectIds: [b.attributes.id],
                    returnGeometry: !0,
                    outFields: "*",
                    where: b.layer.definitionExpression
                  }).then((p) => {
                    p.features.length > 0 && X(p.features[0], z);
                  }) : X(b, z);
                  break;
                }
              }
          });
      });
      const m = document.createElement("div");
      m.className = "esri-widget--button", m.title = "Copy short URL to clipboad", m.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M23 15H11.707l2.646 2.646-.707.707L9.793 14.5l3.854-3.854.707.707L11.707 14H23zm-13-5H6v1h4zm-4 5h2v-1H6zM3 4h3V3h3a2 2 0 0 1 4 0h3v1h3v9h-1V5h-2v2H6V5H4v16h14v-5h1v6H3zm4 2h8V4h-3V2.615A.615.615 0 0 0 11.386 2h-.771a.615.615 0 0 0-.615.615V4H7zM6 19h4v-1H6z"></path></svg>
    <span class="esri-icon-font-fallback-text">Copy short URL to clipboad</span>`, m.addEventListener("click", async () => {
        const u = `${document.location.protocol}//link.${document.location.host.startsWith("localhost") ? "localhost:3092" : "geocam.xyz"}/`;
        try {
          const f = await (await fetch(u, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              link: { url: document.location.toString() }
            })
          })).json();
          await navigator.clipboard.writeText(f.link), alert(`Url copied to clipboard: ${f.link}`);
        } catch (g) {
          alert(
            `Sorry, the short URL could not be copied to the clipboard: ${g}`
          );
        }
      }), a.ui.add(m, "top-right"), G.className = "esri-widget--button", G.title = "Recenter map on selected shot", G.innerHTML = '<span aria-hidden="true" class="esri-icon-zoom-to-object"></span><span class="esri-icon-font-fallback-text">Expand</span>', G.addEventListener("click", () => {
        a.goTo({
          center: [N.geometry.longitude, N.geometry.latitude]
        });
      }), a.ui.add(G, "top-right"), v = t.facing((u) => {
        O(u);
      });
      const w = new URLSearchParams(window.location.hash.substr(1)), V = w.get("center");
      V && (a.center = JSON.parse(V));
      const B = w.get("zoom");
      B && (a.zoom = JSON.parse(B));
      const W = w.get("marker");
      if (W) {
        const u = JSON.parse(W);
        if (u) {
          const [g, f] = u;
          O(t.facing(), g, f);
        }
      }
      P.watch(a, "scale", re), re(a.scale), P.watch(a, "center", Ae), t.shot((u) => {
        const g = parseInt(
          typeof u == "object" && u !== null ? u.id : u
        );
        g && g !== oe ? (console.log("Got shot", u, "layers", c.length), c.forEach((f, A) => {
          const b = f.layer;
          t.resetProgress(), console.log("Querying layer for shot", b, g), b.queryFeatures({
            objectIds: [g],
            returnGeometry: !0,
            outFields: "*",
            where: b.definitionExpression
          }).then((z) => {
            if (console.log("Got results for layer", b, z), z.features.length > 0) {
              const p = z.features[0];
              X(p, A);
            }
          });
        })) : u || t.hide();
      });
    }), C) {
      const m = `${C}/0`;
      console.log("shots url is", m);
      const w = new y({
        url: m,
        definitionExpression: "mod(id,100) = 0"
        // start with agressive simplifaction - view should get scale change early on to override this
      });
      a.map.add(w), w.when((W) => {
        const u = W.fields, g = u.find((p) => ee(p, "filenames")), f = u.find((p) => ee(p, "calibration"));
        c.push({
          layer: w,
          shot: "id",
          filenames: "filenames",
          yaw: "yaw",
          rotation: "rotation_matrix",
          datetime: "utc_time",
          brightness: null,
          base: te(g && g.description),
          calibration: "calibration",
          rigId: null,
          calibrationBase: te(f.description),
          capture: "capture"
        });
        const A = {
          xmin: -5e-3,
          ymin: -5e-3,
          xmax: 5e-3,
          ymax: 5e-3
        }, b = Object.keys(A), z = {};
        for (let p = 0; p < b.length; p++)
          z[b[p]] = parseFloat(W.fullExtent[b[p]]) + A[b[p]];
        a.extent = z;
      });
      const V = `${C}/1`;
      console.log("points features url is", V);
      const B = new y({
        url: V,
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
      a.map.add(B);
    }
    d = new x({
      title: "GeoCam Field of View",
      geometryType: "point",
      spatialReference: {
        wkid: 4326
      }
    }), a.map.layers.add(d);
  };
  var ae = function(o) {
    switch (o.key, o.key) {
      case "Escape": {
        R(null), a.graphics.removeAll();
        break;
      }
      case " ":
        r = !0;
    }
  }, se = function(o) {
    switch (o.key, o.key) {
      case " ":
        r = !1;
    }
  };
  document.addEventListener("keydown", ae), document.addEventListener("keyup", se), this.destroy = function() {
    document.removeEventListener("keydown", ae), document.removeEventListener("keyup", se), v(), L(), k(), be(), ve(), M(), a.map.removeLayer(d), t.wrapper.removeChild(j), t.wrapper.removeChild(Z);
  };
};
class We extends HTMLElement {
  constructor() {
    super(), this.plugin = null, console.log("GeocamViewerArcgisMap init");
  }
  connectedCallback() {
    this.link = function(n) {
      console.log("linking to ", n);
      const t = this.getAttribute("src");
      t || console.warn("No src attribute on geocam-viewer-arcgis-map");
      const r = this.parentNode;
      if (this.viewer = r.viewer, this.mapView = n, this.viewer && this.viewer.plugin) {
        const c = document.getElementsByTagName(
          "geocam-viewer-prev-next-control"
        )[0], d = c && c.plugin;
        this.plugin = new Ve({ mapView: n, prevNextPlugin: d, src: t }), r.viewer.plugin(this.plugin);
      } else
        console.error("GeocamViewerArcgisMap must be a child of GeocamViewer");
    }, console.log("GeocamViewerArcgisMap connected");
  }
  disconnectedCallback() {
    this.plugin = null, this.viewer = null, this.mapView = null, console.log("GeocamViewerArcgisMap disconnected");
  }
}
window.customElements.define("geocam-viewer-arcgis-map", We);
export {
  We as GeocamViewerArcgisMap
};
