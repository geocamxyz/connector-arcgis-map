var Ne = typeof window < "u";
const de = {
  Promise: Ne ? window.Promise : void 0
};
var me = "4.25", C = "next";
function fe(e) {
  if (e.toLowerCase() === C)
    return C;
  var o = e && e.match(/^(\d)\.(\d+)/);
  return o && {
    major: parseInt(o[1], 10),
    minor: parseInt(o[2], 10)
  };
}
function ge(e) {
  return e === void 0 && (e = me), "https://js.arcgis.com/".concat(e, "/");
}
function Te(e) {
  e === void 0 && (e = me);
  var o = ge(e), t = fe(e);
  if (t !== C && t.major === 3) {
    var n = t.minor <= 10 ? "js/" : "";
    return "".concat(o).concat(n, "esri/css/esri.css");
  } else
    return "".concat(o, "esri/themes/light/main.css");
}
function Le(e) {
  var o = document.createElement("link");
  return o.rel = "stylesheet", o.href = e, o;
}
function ke(e, o) {
  if (o) {
    var t = document.querySelector(o);
    t.parentNode.insertBefore(e, t);
  } else
    document.head.appendChild(e);
}
function Ee(e) {
  return document.querySelector('link[href*="'.concat(e, '"]'));
}
function je(e) {
  return !e || fe(e) ? Te(e) : e;
}
function Me(e, o) {
  var t = je(e), n = Ee(t);
  return n || (n = Le(t), ke(n, o)), n;
}
var Ge = {};
function Ze(e) {
  var o = document.createElement("script");
  return o.type = "text/javascript", o.src = e, o.setAttribute("data-esri-loader", "loading"), o;
}
function ae(e, o, t) {
  var n;
  t && (n = Pe(e, t));
  var a = function() {
    o(e), e.removeEventListener("load", a, !1), n && e.removeEventListener("error", n, !1);
  };
  e.addEventListener("load", a, !1);
}
function Pe(e, o) {
  var t = function(n) {
    o(n.error || new Error("There was an error attempting to load ".concat(e.src))), e.removeEventListener("error", t, !1);
  };
  return e.addEventListener("error", t, !1), t;
}
function be() {
  return document.querySelector("script[data-esri-loader]");
}
function D() {
  var e = window.require;
  return e && e.on;
}
function Ue(e) {
  e === void 0 && (e = {});
  var o = {};
  [Ge, e].forEach(function(a) {
    for (var d in a)
      Object.prototype.hasOwnProperty.call(a, d) && (o[d] = a[d]);
  });
  var t = o.version, n = o.url || ge(t);
  return new de.Promise(function(a, d) {
    var g = be();
    if (g) {
      var z = g.getAttribute("src");
      z !== n ? d(new Error("The ArcGIS API for JavaScript is already loaded (".concat(z, ")."))) : D() ? a(g) : ae(g, a, d);
    } else if (D())
      d(new Error("The ArcGIS API for JavaScript is already loaded."));
    else {
      var w = o.css;
      if (w) {
        var j = w === !0;
        Me(j ? t : w, o.insertCssBefore);
      }
      g = Ze(n), ae(g, function() {
        g.setAttribute("data-esri-loader", "loaded"), a(g);
      }, d), document.body.appendChild(g);
    }
  });
}
function ie(e) {
  return new de.Promise(function(o, t) {
    var n = window.require.on("error", t);
    window.require(e, function() {
      for (var a = [], d = 0; d < arguments.length; d++)
        a[d] = arguments[d];
      n.remove(), o(a);
    });
  });
}
function He(e, o) {
  if (o === void 0 && (o = {}), D())
    return ie(e);
  var t = be(), n = t && t.getAttribute("src");
  return !o.url && n && (o.url = n), Ue(o).then(function() {
    return ie(e);
  });
}
const Oe = (e, o) => e.replace(/\(\?\<(.+?)\>[^)]*\)/g, (t, n) => o[n]);
Number.prototype.toRad = function() {
  return this * (Math.PI / 180);
};
Number.prototype.toDeg = function() {
  return this * (180 / Math.PI);
};
Number.prototype.to2DP = function() {
  return parseFloat(this.toFixed(2));
};
const ce = function(e) {
  return Array.isArray(e) ? e : [
    e.longitude || (e.coords ? e.coords.longitude : e.geometry ? e.geometry.longitude : null),
    e.latitude || (e.coords ? e.coords.latitude : e.geometry ? e.geometry.latitude : null)
  ];
}, le = function(e, o) {
  const [t, n] = ce(e), [a, d] = ce(o), g = a.toRad(), z = d.toRad(), w = t.toRad(), j = n.toRad(), M = Math.sin(g - w) * Math.cos(z), G = Math.cos(j) * Math.sin(z) - Math.sin(j) * Math.cos(z) * Math.cos(g - w);
  return (Math.atan2(M, G).toDeg() + 360) % 360;
}, U = (e, o = {}, t = "") => {
  const n = document.createElement(e);
  for (let a in o)
    n.setAttribute(a, o[a]);
  return n.innerHTML = t, n;
}, Ye = (e, o) => (document.getElementById(e) || document.getElementsByTagName("head")[0].prepend(U("STYLE", { type: "text/css" }, o)), !0), We = 600, Re = 8, ue = (e, o) => {
  const t = Number(e);
  return Number.isFinite(t) && t > 0 ? t : o;
}, q = (e, o) => {
  if (Array.isArray(e))
    return [0, 1, 2].map((t) => ue(e[t], o));
  if (typeof e == "string")
    try {
      const t = JSON.parse(e);
      return Array.isArray(t) ? q(t, o) : q([t, t, t], o);
    } catch {
      return [o, o, o];
    }
  if (typeof e == "number") {
    const t = ue(e, o);
    return [t, t, t];
  }
  return [o, o, o];
}, qe = "data:image/png;base64,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", Se = function(e = {}) {
  Ye("geocam-argis-map", `
      .geocam-auto-rotate-checkbox {
        display: none;
      }

      .geocam-auto-rotate-span {
        background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24'  viewBox='0 0 24 24' fill='currentColor'><rect fill='none' height='24' width='24'/><path d='M7.94,5.12L6.49,3.66C8.07,2.61,9.96,2,12,2c5.52,0,10,4.48,10,10c0,2.04-0.61,3.93-1.66,5.51l-1.46-1.46 C19.59,14.86,20,13.48,20,12c0-4.41-3.59-8-8-8C10.52,4,9.14,4.41,7.94,5.12z M17.66,9.53l-1.41-1.41l-2.65,2.65l1.41,1.41 L17.66,9.53z M19.78,22.61l-2.27-2.27C15.93,21.39,14.04,22,12,22C6.48,22,2,17.52,2,12c0-2.04,0.61-3.93,1.66-5.51L1.39,4.22 l1.41-1.41l18.38,18.38L19.78,22.61z M16.06,18.88l-3.88-3.88l-1.59,1.59l-4.24-4.24l1.41-1.41l2.83,2.83l0.18-0.18L5.12,7.94 C4.41,9.14,4,10.52,4,12c0,4.41,3.59,8,8,8C13.48,20,14.86,19.59,16.06,18.88z'/></svg>")
      }

      .geocam-auto-rotate-checkbox:checked +.geocam-auto-rotate-span {
          background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' viewBox='0 0 24 24' fill='currentColor'><rect fill='none' height='24' width='24'/><path d='M18.6,19.5H21v2h-6v-6h2v2.73c1.83-1.47,3-3.71,3-6.23c0-4.07-3.06-7.44-7-7.93V2.05c5.05,0.5,9,4.76,9,9.95 C22,14.99,20.68,17.67,18.6,19.5z M4,12c0-2.52,1.17-4.77,3-6.23V8.5h2v-6H3v2h2.4C3.32,6.33,2,9.01,2,12c0,5.19,3.95,9.45,9,9.95 v-2.02C7.06,19.44,4,16.07,4,12z M16.24,8.11l-5.66,5.66l-2.83-2.83l-1.41,1.41l4.24,4.24l7.07-7.07L16.24,8.11z'/></svg>")
      }

    `);
  let t, n, a = [], d, g, z, w, j, M, G, H, J, I, O, he, F, ve, Q = !0, K;
  const { mapView: s, prevNextPlugin: S, widgets: Ve, expands: Xe, src: Y } = e, Z = document.createElement("div"), $ = function(r, i, l) {
    return {
      geometry: {
        type: "point",
        latitude: l,
        longitude: i
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
  let L = $(0, 0, 0);
  const pe = function(r) {
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
  let B = null;
  const P = function(r, i, l) {
    d && (d.removeAll(), t.visible() ? (Z.classList.remove("esri-disabled"), r !== null && (G() ? (s.rotation = r * -1, r = 0, (l || l === 0) && s.goTo({
      center: [i, l]
    })) : s.rotation = 0, L = $(
      r || 0,
      i || L.geometry.longitude,
      l || L.geometry.latitude
    ), d.add(L), (l || l === 0) && K([i, l]))) : Z.classList.add("esri-disabled"));
  }, _ = function(r, i, l = {}) {
    const u = new RegExp(i, "i");
    let b = u.test(r.name) || u.test(r.alias);
    return b && l.description && (b = !!r.description), b;
  }, ee = function(r) {
    if (r) {
      var i = document.createElement("textarea");
      return i.innerHTML = r, i.value;
    } else
      return "";
  }, we = (r, i) => {
    const l = r.base;
    if (r.filenames)
      return JSON.parse(i[r.filenames]).map((u) => Array.isArray(u) ? u.map((b) => /^https?:\/\//i.test(b) ? u : `${l}${b}`) : /^https?:\/\//i.test(u) ? u : `${l}${u}`);
    {
      const u = i[r.capture].split(".")[0], b = u.split("/").pop(), k = JSON.parse(i[r.lengths]), y = JSON.parse(i[r.offsets]);
      return k.map((p, v) => {
        const x = encodeURIComponent(
          `https://s3.us-west-004.backblazeb2.com/gc-raw-surveys-archive/${u}_${v}.tar`
        );
        return `${l}${b}/${v}/${i[r.shot]}.jpg?offset=${y[v]}&length=${p}&container=${x}`;
      });
    }
  }, ye = (r) => {
    if (Array.isArray(r))
      return r.filter((i) => typeof i == "string");
    if (typeof r == "string")
      try {
        const i = JSON.parse(r);
        if (Array.isArray(i))
          return i.filter((l) => typeof l == "string");
      } catch {
        return [];
      }
    return [];
  }, Ae = function(r) {
    return a.findIndex((i) => i.layer == r.layer);
  }, xe = function(r) {
    if (t.label) {
      const { capture: i, utc_time: l, shot: u } = r, b = new Date(l);
      t.label(`${b.toLocaleString()}`);
    }
  };
  let te;
  const V = function(r, i) {
    const l = O();
    console.log("shotclick with viewlock", l);
    const u = a[i], b = r.attributes[u.shot];
    te = b, t.shot(b), S && (S.prev(r.attributes.prev), S.next(r.attributes.next));
    const k = [0, 1, 2].map(
      (m) => Oe(u.calibrationBase, {
        camera: m,
        rig_id: r.attributes[u.rigId],
        calibration: r.attributes[u.calibration]
      })
    ), y = r.attributes[u.yaw], h = r.attributes[u.rotation], p = H() && u.brightness ? r.attributes[u.brightness] : null;
    J = p;
    const v = q(
      r.attributes.exposure_us,
      We
    ), x = q(
      r.attributes.gain_boost,
      Re
    ), E = {
      id: b,
      latitude: r.geometry && typeof r.geometry.latitude == "number" ? r.geometry.latitude : null,
      longitude: r.geometry && typeof r.geometry.longitude == "number" ? r.geometry.longitude : null,
      utc_time: r.attributes.utc_time || null,
      capture: r.attributes[u.capture] || null,
      exposure_us: v,
      gain_boost: x,
      tags: ye(r.attributes.image_tags)
    }, c = we(u, r.attributes);
    if (l) {
      const m = le(r.geometry, l);
      t.facing(m);
    }
    t.show(c, y, k, h, p, E), P(
      t.facing(),
      r.geometry.longitude,
      r.geometry.latitude
    ), xe(r.attributes);
  };
  let re, W, X;
  const oe = function(r, i, l, u) {
    clearTimeout(re), re = setTimeout(() => {
      const k = Math.ceil(r / 500), y = s.extent, h = `${y.xmin},${y.ymin},${y.xmax},${y.ymax},${y.spatialReference.wkid}`, p = `mod(id,${k}) = 0 AND extent = ${h}`;
      a.forEach((v) => {
        v.layer.definitionExpression !== p && (v.layer.definitionExpression = p, console.log(
          "definition expression changed for",
          v.layer,
          p
        ));
      }), I(s.zoom), P(t.facing());
    }, 500);
  }, ze = function(r, i, l, u) {
    F([s.center.longitude, s.center.latitude]);
  };
  this.init = async function(r) {
    t = r, K = t.store("marker"), I = t.store("zoom"), F = t.store("center"), O = t.store("viewlock"), G = t.store("autorotate"), M = U("DIV", { class: "geocam-auto-rotate" });
    const i = U("LABEL", { class: "geocam-auto-rotate-label" }), l = U("INPUT", {
      type: "checkbox",
      class: "geocam-auto-rotate-checkbox"
    }), u = U(
      "SPAN",
      { class: "geocam-auto-rotate-span geocam-viewer-control-button" },
      " Autorotate"
    );
    l.checked = G(), l.addEventListener("change", () => {
      G(l.checked);
    }), i.appendChild(l), i.appendChild(u), M.appendChild(i), t.addControl(M, "left-top"), z = G((h) => {
      M.setAttribute(
        "title",
        h ? "turn auto-rotate off" : "turn auto-rotate on"
      ), P(
        t.facing(),
        L.geometry.longitude,
        L.geometry.latitude
      );
    }), H = t.store("autobrightness"), w = H((h) => {
      t.reload(h ? J : "[1,1,1]");
    }), j = t.visible((h) => P(t.facing()));
    const [b, k, y] = await He([
      "esri/layers/GraphicsLayer",
      "esri/core/watchUtils",
      "esri/layers/FeatureLayer"
    ]);
    if (s.when(async () => {
      s.on("clickable", (c) => {
        Q = c;
      }), s.on("key-down", (c) => {
        if (c && c.target && c.target.closest("input,calcite-input"))
          return;
        const m = [
          "ArrowUp",
          "ArrowDown",
          "ArrowRight",
          "ArrowLeft",
          "a",
          "d",
          "w",
          "s"
          // w and s don't seem to be used for map actions but just in case that changes in the future.
        ], f = c && c.key;
        t.visible() && m.indexOf(f) !== -1 && c.stopPropagation();
      }), s.on("immediate-click", (c) => {
        if (!Q)
          return;
        const m = {
          x: c.x,
          y: c.y
        };
        if (console.log("immediate-click", c, m), n) {
          console.log("space wqas down");
          const f = s.toMap(m);
          if (O(f), B && s.graphics.removeAll(), B = pe(f), s.graphics.add(B), t.visible()) {
            const T = le(L.geometry, f);
            t.facing(T);
          }
        } else
          s.hitTest(m).then((f) => {
            if (f.results && f.results.length > 0)
              for (var T = 0; T < f.results.length; T++) {
                const A = f.results[T].graphic, N = Ae(A);
                if (N >= 0) {
                  Object.entries(A.attributes).length < 2 ? A.layer.queryFeatures({
                    objectIds: [A.attributes.id],
                    returnGeometry: !0,
                    outFields: "*",
                    where: A.layer.definitionExpression
                  }).then((R) => {
                    R.features.length > 0 && V(R.features[0], N);
                  }) : V(A, N);
                  break;
                }
              }
          });
      });
      const h = document.createElement("div");
      h.className = "esri-widget--button", h.title = "Copy short URL to clipboad", h.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M23 15H11.707l2.646 2.646-.707.707L9.793 14.5l3.854-3.854.707.707L11.707 14H23zm-13-5H6v1h4zm-4 5h2v-1H6zM3 4h3V3h3a2 2 0 0 1 4 0h3v1h3v9h-1V5h-2v2H6V5H4v16h14v-5h1v6H3zm4 2h8V4h-3V2.615A.615.615 0 0 0 11.386 2h-.771a.615.615 0 0 0-.615.615V4H7zM6 19h4v-1H6z"></path></svg>
    <span class="esri-icon-font-fallback-text">Copy short URL to clipboad</span>`, h.addEventListener("click", async () => {
        const c = `${document.location.origin}/🔗`;
        try {
          const f = await (await fetch(c, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              link: { url: document.location.toString() }
            })
          })).json();
          await navigator.clipboard.writeText(f.link), alert(`Url copied to clipboard: ${f.link}`);
        } catch (m) {
          alert(
            `Sorry, the short URL could not be copied to the clipboard: ${m}`
          );
        }
      }), s.ui.add(h, "top-right"), Z.className = "esri-widget--button", Z.title = "Recenter map on selected shot", Z.innerHTML = '<span aria-hidden="true" class="esri-icon-zoom-to-object"></span><span class="esri-icon-font-fallback-text">Expand</span>', Z.addEventListener("click", () => {
        s.goTo({
          center: [L.geometry.longitude, L.geometry.latitude]
        });
      }), s.ui.add(Z, "top-right"), g = t.facing((c) => {
        P(c);
      });
      const p = new URLSearchParams(window.location.hash.substr(1)), v = p.get("center");
      v && (console.log("got center from hash params", v), s.center = JSON.parse(v), X = !0);
      const x = p.get("zoom");
      x && (console.log("got zoom from hash params", x), s.zoom = JSON.parse(x));
      const E = p.get("marker");
      if (E) {
        const c = JSON.parse(E);
        if (c) {
          const [m, f] = c;
          P(t.facing(), m, f);
        }
      }
      k.watch(s, "scale", oe), oe(s.scale), k.watch(s, "center", ze), t.shot((c) => {
        const m = parseInt(
          typeof c == "object" && c !== null ? c.id : c
        );
        if (m && m !== te) {
          if (console.log("Got shot", c, "layers", a.length), a.length === 0) {
            W = c;
            return;
          }
          a.forEach((f, T) => {
            const A = f.layer;
            t.resetProgress(), console.log("Querying layer for shot", A, m), A.queryFeatures({
              objectIds: [m],
              returnGeometry: !0,
              outFields: "*",
              where: A.definitionExpression
            }).then((N) => {
              if (console.log("Got results for layer", A, N), N.features.length > 0) {
                const R = N.features[0];
                V(R, T);
              }
            });
          });
        } else
          c || t.hide();
      });
    }), Y) {
      const h = `${Y}/2`, p = new y({
        url: h,
        visible: !1,
        outFields: ["*"],
        editingEnabled: !0
      });
      s.map.add(p);
      const v = `${Y}/0`;
      console.log("shots url is", v);
      const x = new y({
        url: v,
        definitionExpression: "mod(id,100) = 0"
        // start with agressive simplifaction - view should get scale change early on to override this
      });
      s.map.add(x), x.when((m) => {
        const f = m.fields, T = f.find((N) => _(N, "filenames")), A = f.find((N) => _(N, "calibration"));
        a.push({
          layer: x,
          shot: "id",
          filenames: "filenames",
          yaw: "yaw",
          rotation: "rotation_matrix",
          datetime: "utc_time",
          brightness: null,
          base: ee(T && T.description),
          calibration: "calibration",
          rigId: null,
          calibrationBase: ee(A.description),
          capture: "capture"
        }), X ? X = !1 : s.extent = m.fullExtent, W && (t.shot(W), W = null);
      });
      const E = `${Y}/1`;
      console.log("points features url is", E);
      const c = new y({
        url: E,
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
      s.map.add(c), d = new b({
        title: "GeoCam Field of View",
        geometryType: "point",
        spatialReference: {
          wkid: 4326
        }
      }), s.map.layers.add(d), s.when(() => {
        console.log("mapview when"), s.map.reorder(d, 1e3), s.map.reorder(x, 1e3), s.map.reorder(c, 1e3);
      });
    }
  };
  var ne = function(r) {
    switch (r.key, r.key) {
      case "Escape": {
        O(null), s.graphics.removeAll();
        break;
      }
      case " ":
        n = !0;
    }
  }, se = function(r) {
    switch (r.key, r.key) {
      case " ":
        n = !1;
    }
  };
  document.addEventListener("keydown", ne), document.addEventListener("keyup", se), this.destroy = function() {
    document.removeEventListener("keydown", ne), document.removeEventListener("keyup", se), g(), z(), w(), he(), ve(), j(), s.map.removeLayer(d), t.wrapper.removeChild(M);
  };
};
class Be extends HTMLElement {
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
        const g = o.querySelector("geocam-viewer-prev-next-control"), z = g && g.plugin;
        this.plugin = new Se({ mapView: n, prevNextPlugin: z, src: a }), this.viewer.plugin(this.plugin);
        const w = o.querySelector("geocam-viewer-screen-shot");
        w && w.plugin && w.plugin.arcgisView(n);
      });
    }, console.log("GeocamViewerArcgisMap connected");
  }
  disconnectedCallback() {
    this.plugin = null, this.viewer = null, this.mapView = null, console.log("GeocamViewerArcgisMap disconnected");
  }
}
window.customElements.define("geocam-viewer-arcgis-map", Be);
export {
  Be as GeocamViewerArcgisMap
};
