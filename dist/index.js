function s(i, r, t, n) {
  var e = arguments.length, o = e < 3 ? r : n === null ? n = Object.getOwnPropertyDescriptor(r, t) : n, l;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    o = Reflect.decorate(i, r, t, n);
  else
    for (var a = i.length - 1; a >= 0; a--)
      (l = i[a]) && (o = (e < 3 ? l(o) : e > 3 ? l(r, t, o) : l(r, t)) || o);
  return e > 3 && o && Object.defineProperty(r, t, o), o;
}
const p = {
  actions: {},
  filters: {}
}, F = (i) => {
  let r, t, n, e;
  for (t = 1; t < i.length; t++) {
    for (r = i[t], n = t; (e = i[n - 1]) && e.priority > r.priority; )
      i[n] = i[n - 1], --n;
    i[n] = r;
  }
  return i;
}, y = (i, r, t, n, e) => {
  const o = {
    callback: t,
    priority: n,
    context: e
  };
  let l = p[i][r];
  if (l) {
    let a = !1;
    if (l.forEach(function(A) {
      if (A.callback === t)
        return a = !0, !1;
    }), a)
      return;
    l.push(o), l = F(l);
  } else
    l = [o];
  p[i][r] = l;
}, v = (i, r, t, n) => {
  let e, o, l;
  if (p[i][r])
    if (!t)
      p[i][r] = [];
    else if (e = p[i][r], n)
      for (l = e.length; l--; )
        o = e[l], o.callback === t && o.context === n && e.splice(l, 1);
    else
      for (l = e.length; l--; )
        e[l] && e[l].callback === t && e.splice(l, 1);
};
var c;
(function(i) {
  i.ACTIONS = "actions", i.FILTERS = "filters";
})(c || (c = {}));
const I = {
  addAction(i, r, t) {
    const n = t.value;
    t.value = function(e, o, l = 10) {
      if (typeof e == "string" && typeof o == "function")
        return n.apply(this, [
          e,
          o,
          parseInt(String(l))
        ]);
    };
  },
  /**
   * no need to test this as addHook is tested already
   */
  doAction(i, r, t) {
    const n = t.value;
    t.value = function(e, o) {
      if (typeof e == "string" && Object.hasOwn(p[c.ACTIONS], e))
        return n.apply(this, [e, o]);
    };
  },
  /**
   * no need to test this as removeHook is tested already
   */
  removeAction(i, r, t) {
    const n = t.value;
    t.value = function(e, o) {
      if (typeof e == "string" && typeof o == "function" && Object.hasOwn(p[c.ACTIONS], e))
        return n.apply(this, [e, o]);
    };
  },
  /**
   * no need to test this as addHook is tested already
   */
  applyFilters(i, r, t) {
    const n = t.value;
    t.value = function(e, o) {
      if (typeof e == "string")
        return n.apply(this, [e, o]);
    };
  },
  addFilter(i, r, t) {
    const n = t.value;
    t.value = function(e, o, l = 10) {
      if (typeof e == "string" && typeof o == "function")
        return n.apply(this, [
          e,
          o,
          parseInt(String(l))
        ]);
    };
  },
  /**
   * no need to test this as removeHook is tested already
   */
  removeFilter(i, r, t) {
    const n = t.value;
    t.value = function(e, o) {
      if (typeof e == "string" && typeof o == "function" && Object.hasOwn(p[c.FILTERS], e))
        return n.apply(this, [e, o]);
    };
  }
};
function d(i) {
  return I[i];
}
class u {
  addAction(r, t, n) {
    return y(c.ACTIONS, r, t, n || 10, null), p[c.ACTIONS];
  }
  doAction(r, t) {
    return (p[c.ACTIONS][r] || []).forEach((e) => e.callback(t)), p[c.ACTIONS];
  }
  removeAction(r, t) {
    return v(c.ACTIONS, r, t, null), p[c.ACTIONS];
  }
  applyFilters(r, t) {
    const n = p[c.FILTERS][r];
    return (n || []).length > 0 && (n || []).forEach((e) => {
      e.context = t, t = e.callback(t);
    }), t;
  }
  addFilter(r, t, n) {
    return y(c.FILTERS, r, t, n || 10, null), p[c.FILTERS];
  }
  removeFilter(r, t) {
    return v(c.FILTERS, r, t, null), p[c.FILTERS];
  }
}
s([
  d("addAction")
], u.prototype, "addAction", null);
s([
  d("doAction")
], u.prototype, "doAction", null);
s([
  d("removeAction")
], u.prototype, "removeAction", null);
s([
  d("applyFilters")
], u.prototype, "applyFilters", null);
s([
  d("addFilter")
], u.prototype, "addFilter", null);
s([
  d("removeFilter")
], u.prototype, "removeFilter", null);
const f = new u(), S = f.addAction.bind(f), O = f.doAction.bind(f), h = f.removeAction.bind(f), g = f.addFilter.bind(f), T = f.applyFilters.bind(f), _ = f.removeFilter.bind(f);
export {
  S as addAction,
  g as addFilter,
  T as applyFilters,
  f as default,
  O as doAction,
  h as removeAction,
  _ as removeFilter
};
