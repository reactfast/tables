import { jsx as e, jsxs as d } from "react/jsx-runtime";
import { useState as L, useCallback as q, useMemo as J } from "react";
function K({ className: o = "h-4 w-4" }) {
  return /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 2, stroke: "currentColor", className: o, children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 19.5L8.25 12l7.5-7.5" }) });
}
function O({ className: o = "h-4 w-4" }) {
  return /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 2, stroke: "currentColor", className: o, children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M8.25 4.5l7.5 7.5-7.5 7.5" }) });
}
function Q({ className: o = "h-4 w-4" }) {
  return /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 2, stroke: "currentColor", className: o, children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" }) });
}
function X({ className: o = "h-4 w-4" }) {
  return /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 2, stroke: "currentColor", className: o, children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.5 15.75l7.5-7.5 7.5 7.5" }) });
}
function Y({ className: o = "h-4 w-4" }) {
  return /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 2, stroke: "currentColor", className: o, children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 8.25l-7.5 7.5-7.5-7.5" }) });
}
function Z({ className: o = "h-4 w-4" }) {
  return /* @__PURE__ */ e("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 2, stroke: "currentColor", className: o, children: /* @__PURE__ */ e("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" }) });
}
function _({
  currentPage: o,
  totalItems: u,
  itemsPerPage: h,
  onPageChange: f,
  theme: p = {}
}) {
  const x = Math.ceil(u / h);
  if (x <= 1) return null;
  const T = (o - 1) * h + 1, N = Math.min(o * h, u), A = p.activeBg || "#020DF9", M = p.activeText || "#fff", l = p.text || "#4A4A4A", v = p.muted || "#9B9B9B", y = p.border || "#E8E8E8", a = () => {
    const n = [];
    for (let c = 1; c <= x; c++)
      c === 1 || c === x || c >= o - 1 && c <= o + 1 ? n.push(c) : n[n.length - 1] !== "..." && n.push("...");
    return n;
  };
  return /* @__PURE__ */ d(
    "div",
    {
      className: "flex w-full items-center justify-between px-4 py-3",
      style: { borderTop: `1px solid ${y}` },
      children: [
        /* @__PURE__ */ d("p", { className: "text-sm", style: { color: v }, children: [
          T,
          "–",
          N,
          " of ",
          u
        ] }),
        /* @__PURE__ */ d("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => f(Math.max(1, o - 1)),
              disabled: o === 1,
              className: "rounded-md p-1.5 transition-colors disabled:opacity-30",
              style: { color: l },
              children: /* @__PURE__ */ e(K, {})
            }
          ),
          a().map(
            (n, m) => n === "..." ? /* @__PURE__ */ e("span", { className: "px-1 text-sm", style: { color: v }, children: "..." }, `ellipsis-${m}`) : /* @__PURE__ */ e(
              "button",
              {
                onClick: () => f(n),
                className: "min-w-[32px] rounded-md px-2 py-1 text-sm font-medium transition-colors",
                style: {
                  backgroundColor: n === o ? A : "transparent",
                  color: n === o ? M : l
                },
                children: n
              },
              n
            )
          ),
          /* @__PURE__ */ e(
            "button",
            {
              onClick: () => f(Math.min(x, o + 1)),
              disabled: o === x,
              className: "rounded-md p-1.5 transition-colors disabled:opacity-30",
              style: { color: l },
              children: /* @__PURE__ */ e(O, {})
            }
          )
        ] })
      ]
    }
  );
}
function ee({
  data: o = [],
  columns: u = [],
  actions: h = [],
  onRowClick: f,
  itemsPerPage: p = 10,
  searchable: x = !0,
  searchPlaceholder: T = "Search...",
  searchColumns: N,
  loading: A = !1,
  emptyMessage: M = "No data found",
  theme: l = {}
}) {
  const [v, y] = L(1), [a, n] = L(null), [m, c] = L("asc"), [g, z] = L(""), F = l.headerBg || "#FAFAFA", $ = l.headerText || "#1A1A1A", S = l.rowBg || "#fff", H = l.rowHoverBg || "#FAFAFA", j = l.rowText || "#4A4A4A", b = l.borderColor || "#F5F5F5", B = l.accentColor || "#020DF9", k = l.mutedText || "#9B9B9B", U = q(
    (t) => {
      a === t ? c((w) => w === "asc" ? "desc" : "asc") : (n(t), c("asc")), y(1);
    },
    [a]
  ), D = J(() => {
    let t = [...o];
    if (g.trim()) {
      const w = g.toLowerCase(), r = N || u.map((i) => i.name);
      t = t.filter(
        (i) => r.some((s) => {
          const C = i[s];
          return C == null ? !1 : String(C).toLowerCase().includes(w);
        })
      );
    }
    return a && t.sort((w, r) => {
      const i = w[a] ?? "", s = r[a] ?? "";
      if (typeof i == "number" && typeof s == "number")
        return m === "asc" ? i - s : s - i;
      const C = String(i).toLowerCase(), E = String(s).toLowerCase();
      return C < E ? m === "asc" ? -1 : 1 : C > E ? m === "asc" ? 1 : -1 : 0;
    }), t;
  }, [o, g, a, m, u, N]), V = D.length, I = (v - 1) * p, W = D.slice(I, I + p), G = (t) => {
    z(t.target.value), y(1);
  };
  return A ? /* @__PURE__ */ e("div", { className: "flex h-full w-full flex-col", children: /* @__PURE__ */ e("div", { className: "flex-1", children: /* @__PURE__ */ d("div", { className: "animate-pulse space-y-3 p-4", children: [
    /* @__PURE__ */ e("div", { className: "h-10 rounded bg-gray-100" }),
    [1, 2, 3, 4, 5].map((t) => /* @__PURE__ */ e("div", { className: "h-12 rounded bg-gray-50" }, t))
  ] }) }) }) : /* @__PURE__ */ d("div", { className: "flex h-full w-full flex-col", children: [
    x && /* @__PURE__ */ e("div", { className: "w-full px-4 py-3", style: { borderBottom: `1px solid ${b}` }, children: /* @__PURE__ */ d("div", { className: "relative", children: [
      /* @__PURE__ */ e("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", children: /* @__PURE__ */ e(Z, { className: "h-4 w-4", style: { color: k } }) }),
      /* @__PURE__ */ e(
        "input",
        {
          type: "text",
          value: g,
          onChange: G,
          placeholder: T,
          className: "block w-full rounded-lg border py-2 pl-9 pr-3 text-sm transition-colors focus:outline-none focus:ring-1",
          style: {
            borderColor: b,
            color: j,
            backgroundColor: S
          },
          onFocus: (t) => {
            t.target.style.borderColor = B, t.target.style.boxShadow = `0 0 0 1px ${B}`;
          },
          onBlur: (t) => {
            t.target.style.borderColor = b, t.target.style.boxShadow = "none";
          }
        }
      )
    ] }) }),
    /* @__PURE__ */ e("div", { className: "flex-1 overflow-auto", children: /* @__PURE__ */ d("table", { className: "w-full", children: [
      /* @__PURE__ */ e("thead", { className: "sticky top-0 z-10", style: { backgroundColor: F }, children: /* @__PURE__ */ d("tr", { style: { borderBottom: `1px solid ${b}` }, children: [
        u.map((t) => /* @__PURE__ */ e(
          "th",
          {
            onClick: t.sortable !== !1 ? () => U(t.name) : void 0,
            className: `px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${t.sortable !== !1 ? "cursor-pointer select-none" : ""}`,
            style: {
              color: $,
              width: t.width || "auto"
            },
            children: /* @__PURE__ */ d("span", { className: "inline-flex items-center gap-1", children: [
              t.title,
              t.sortable !== !1 && /* @__PURE__ */ e("span", { style: { color: a === t.name ? B : k }, children: a === t.name ? m === "asc" ? /* @__PURE__ */ e(X, { className: "h-3 w-3" }) : /* @__PURE__ */ e(Y, { className: "h-3 w-3" }) : /* @__PURE__ */ e(Q, { className: "h-3 w-3" }) })
            ] })
          },
          t.name
        )),
        h.length > 0 && /* @__PURE__ */ e(
          "th",
          {
            className: "px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider",
            style: { color: $, width: `${h.length * 40 + 16}px` },
            children: "Actions"
          }
        )
      ] }) }),
      /* @__PURE__ */ e("tbody", { children: W.length === 0 ? /* @__PURE__ */ e("tr", { children: /* @__PURE__ */ e(
        "td",
        {
          colSpan: u.length + (h.length > 0 ? 1 : 0),
          className: "px-4 py-16 text-center text-sm",
          style: { color: k },
          children: g ? `No results for "${g}"` : M
        }
      ) }) : W.map((t, w) => /* @__PURE__ */ d(
        "tr",
        {
          onClick: f ? () => f(t) : void 0,
          className: `transition-colors ${f ? "cursor-pointer" : ""}`,
          style: {
            backgroundColor: S,
            borderBottom: `1px solid ${b}`
          },
          onMouseEnter: (r) => {
            r.currentTarget.style.backgroundColor = H;
          },
          onMouseLeave: (r) => {
            r.currentTarget.style.backgroundColor = S;
          },
          children: [
            u.map((r) => /* @__PURE__ */ e(
              "td",
              {
                className: "whitespace-nowrap px-4 py-3 text-sm",
                style: { color: j },
                children: r.render ? r.render(t[r.name], t) : t[r.name] ?? "—"
              },
              r.name
            )),
            h.length > 0 && /* @__PURE__ */ e("td", { className: "whitespace-nowrap px-4 py-3 text-right", children: /* @__PURE__ */ e("div", { className: "inline-flex items-center gap-1", children: h.map((r, i) => /* @__PURE__ */ e(
              "button",
              {
                onClick: (s) => {
                  s.stopPropagation(), r.onClick(t);
                },
                title: r.title || "",
                className: "rounded-md p-1.5 transition-colors",
                style: { color: k },
                onMouseEnter: (s) => {
                  s.currentTarget.style.color = B, s.currentTarget.style.backgroundColor = F;
                },
                onMouseLeave: (s) => {
                  s.currentTarget.style.color = k, s.currentTarget.style.backgroundColor = "transparent";
                },
                children: r.icon
              },
              i
            )) }) })
          ]
        },
        t.id || w
      )) })
    ] }) }),
    /* @__PURE__ */ e(
      _,
      {
        currentPage: v,
        totalItems: V,
        itemsPerPage: p,
        onPageChange: y,
        theme: l
      }
    )
  ] });
}
export {
  ee as DataTable,
  _ as Pagination
};
