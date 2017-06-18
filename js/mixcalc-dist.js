jQuery(function(e) {
    function a() {
        function a() {
            var a = "metric" == e(".tdee-macro-calc input[name='system']:checked").val() ? 2.2 * p.val() : p.val();
            if ("cut" == o.find("option:selected").val()) {
                e(".tdee-macro-calc input[value='deficit']").prop("checked", !0), e(".tdee-macro-calc input[name='def-surp-percentage']").val("-20%").removeClass("surplus").addClass("deficit");
                var c = {};
                c.protein = 40, c.carbs = 40, c.fat = 20
            } else if ("maintain" == o.find("option:selected").val() || "bulk" == o.find("option:selected").val()) {
                "maintain" == o.find("option:selected").val() ? (e(".tdee-macro-calc input[value='deficit']").prop("checked", !0), e(".tdee-macro-calc input[name='def-surp-percentage']").val("0%").removeClass("surplus deficit")) : (e(".tdee-macro-calc input[value='surplus']").prop("checked", !0), e(".tdee-macro-calc input[name='def-surp-percentage']").val("+10%").removeClass("deficit").addClass("surplus"));
                var l = 1 * a * 4,
                    r = l / i * 100,
                    s = .3 * a * 9,
                    d = s / i * 100,
                    u = i - (s + l),
                    v = u / i * 100,
                    c = {};
                c.protein = r, c.carbs = v, c.fat = d
            }
            if (!a || "none" == o.find("option:selected").val()) {
                var c = {};
                c.protein = 40, c.carbs = 40, c.fat = 20
            }
            e(h).each(function() {
                e(this).slider("value", c[e(this).data("type")]), n && e(this).slider("option", "max", 100)
            }), n = !1, t()
        }

        function t() {
            var a = .01 * parseInt(Math.abs(e(".tdee-macro-calc input[name='def-surp-percentage']").val().replace("%", "")));
            "surplus" == e(".tdee-macro-calc input[name='def-surp']:checked").val() ? (i = Math.round(Number(d.val()) + Number(d.val() * a)), u.html(i)) : (i = Math.round(Number(d.val()) - Number(d.val() * a)), u.html(i))
        }

        function c() {
            i && e(h).each(function() {
                var a = e(".tdee-macro-calc ." + e(this).attr("data-type") + "-perc input"),
                    t = e(".tdee-macro-calc ." + e(this).attr("data-type") + "-grams input"),
                    c = e(".tdee-macro-calc ." + e(this).attr("data-type") + "-calories"),
                    l = e(this).slider("value"),
                    r = .01 * l * i,
                    n = r / e(this).data("cals");
                a.val(Math.round(l) + "%"), t.val(Math.round(n) + "g"), c.html(Math.round(r) + " kcal")
            })
        }

        function l(a, t) {
            if (e(this).data("current-value", t.value), "protein" !== e(this).data("type")) {
                var c = v.slider("value");
                e(this).data("max-value", 100 - c)
            } else e(this).data("max-value", 100)
        }

        function r(a, t) {
            if (a.originalEvent) {
                if (t.value > e(this).data("max-value")) return void a.preventDefault();
                o.find("option[value='none']").prop("selected", !0); {
                    e(this).slider("value") < t.value ? !0 : !1, Math.abs(e(this).slider("value") - t.value)
                }
                if (e(this).slider("value", t.value), "protein" == e(this).attr("data-type")) {
                    var l = v.slider("value"),
                        r = 100 - l;
                    f.slider("value", .3 * r), m.slider("value", .7 * r)
                }
                if ("carbs" == e(this).attr("data-type")) {
                    var i = t.value,
                        l = v.slider("value"),
                        n = 100 - (i + l);
                    f.slider("value", n)
                }
                if ("fat" == e(this).attr("data-type")) {
                    var s = t.value,
                        l = v.slider("value"),
                        n = 100 - (s + l);
                    m.slider("value", n)
                }
                c()
            }
        }

        function s() {
            var a = e(".tdee-macro-calc input[name='def-surp-percentage']"),
                t = a.val().replace("%", "");
            /\-|\+/i.test(t) || (t = "surplus" == e(".tdee-macro-calc input[name='def-surp']:checked").val() ? "+" + t : "-" + t), t > 0 ? e(".tdee-macro-calc input[value='surplus']").prop("checked", !0) : 0 > t && e(".tdee-macro-calc input[value='deficit']").prop("checked", !0), t = t.replace("-", ""), t = t.replace("+", ""), t ? (a.val(""), "0" == t ? a.val(t + "%").removeClass("deficit surplus") : "surplus" == e(".tdee-macro-calc input[name='def-surp']:checked").val() ? a.val("+" + t + "%").removeClass("deficit").addClass("surplus") : a.val("-" + t + "%").removeClass("surplus").addClass("deficit")) : a.removeClass("deficit surplus")
        }
        var d = e(".tdee-macro-calc #tdee"),
            u = e(".tdee-macro-calc #cals-left"),
            o = e(".tdee-macro-calc #presets"),
            p = e(".tdee-macro-calc #body-weight");
        t();
        var v = e(".tdee-macro-calc .protein-slider").slider({
                max: 0,
                value: 0,
                step: .001,
                range: "min",
                min: 0,
                change: r,
                slide: r,
                start: l
            }),
            m = e(".tdee-macro-calc .carbs-slider").slider({
                max: 0,
                value: 0,
                step: .001,
                range: "min",
                change: r,
                slide: r,
                start: l
            }),
            f = e(".tdee-macro-calc .fat-slider").slider({
                max: 0,
                value: 0,
                step: .001,
                range: "min",
                min: 0,
                change: r,
                slide: r,
                start: l
            }),
            h = [v, m, f];
        e(".tdee-macro-calc input[name='body-weight'], .tdee-macro-calc select[name='presets'], .tdee-macro-calc input[name='def-surp-percentage']").on("change", function(l) {
            d.val() && p.val() && e(".tdee-macro-calc input[name='def-surp-percentage']").val() && ((e(l.target).is(".tdee-macro-calc input[name='def-surp-percentage']") || e(l.target).is(".tdee-macro-calc input[type='radio']")) && o.find("option[value='none']").prop("selected", !0), s(), t(), a(), c())
        }).on("input", function(l) {
            if (d.val() && p.val() && "" !== e(".tdee-macro-calc input[name='def-surp-percentage']").val()) {
                if ((e(l.target).is(".tdee-macro-calc input[name='def-surp-percentage']") || e(l.target).is(".tdee-macro-calc input[type='radio']")) && o.find("option[value='none']").prop("selected", !0), e(l.target).is(".tdee-macro-calc input[name='def-surp-percentage']")) return;
                s(), t(), a(), c()
            }
        }), e(".tdee-macro-calc input[name='tdee']").on("change input", function() {
            d.val() && p.val() && e(".tdee-macro-calc input[name='def-surp-percentage']").val() && (s(), t(), a(), c())
        }), e(".tdee-macro-calc .perc-input").on("input", function(a) {
            if (a.originalEvent) {
                a.originalEvent && o.find("option[value='none']").prop("selected", !0);
                var t = parseInt(e(this).val().replace("%", ""));
                if ("protein" !== e(this).data("type")) {
                    var l = v.slider("value"),
                        r = 100 - l;
                    if (t > r && (t = r, e(this).val(t)), "carbs" == e(this).data("type")) {
                        m.slider("value", t);
                        var i = t,
                            n = v.slider("value"),
                            s = 100 - (i + n);
                        f.slider("value", s)
                    } else {
                        f.slider("value", t);
                        var d = t,
                            n = v.slider("value"),
                            s = 100 - (d + n);
                        m.slider("value", s)
                    }
                } else {
                    v.slider("value", t);
                    var n = v.slider("value"),
                        u = 100 - n;
                    m.slider("value", .7 * u), f.slider("value", .3 * u)
                }
                c()
            }
        }).blur(function() {
            var a = parseInt(e(this).val());
            e(this).val(a + "%")
        }), e(".tdee-macro-calc .gram-input").on("keypress change", function(a) {
            if (console.log(e(this).val()), a.originalEvent && o.find("option[value='none']").prop("selected", !0), ("keypress" != a.type || 13 === a.which) && a.originalEvent) {
                var t = parseInt(e(this).val().replace("g", ""));
                if (!(t < e(this).data("cals"))) {
                    var l = t * e(this).data("cals"),
                        r = l / i * 100;
                    if ("protein" !== e(this).data("type")) {
                        var n = .01 * v.slider("value") * i,
                            s = i - n,
                            d = "carbs" == e(this).data("type") ? s / 4 : s / 9;
                        if (t > d && (t = d, l = t * e(this).data("cals"), r = l / i * 100, e(this).val(t)), "carbs" == e(this).data("type")) {
                            m.slider("value", r);
                            var u = v.slider("value"),
                                p = 100 - (r + u);
                            f.slider("value", p)
                        } else {
                            f.slider("value", r);
                            var u = v.slider("value"),
                                p = 100 - (r + u);
                            m.slider("value", p)
                        }
                    } else {
                        v.slider("value", r);
                        var h = 100 - r;
                        f.slider("value", .3 * h), m.slider("value", .7 * h)
                    }
                    c()
                }
            }
        }).blur(function() {
            var a = parseInt(e(this).val());
            e(this).val(a + "g")
        }), e(".tdee-macro-calc input[type='text'], .tdee-macro-calc input[type='number']").on("click", function(a) {
            a.originalEvent && e(this).select()
        }), e(".tdee-macro-calc input[name='def-surp']").on("change", function(l) {
            l.originalEvent && o.find("option[value='none']").prop("selected", !0), e(".tdee-macro-calc input[name='def-surp-percentage']").val("surplus" == e(".tdee-macro-calc input[name='def-surp']:checked").val() ? e(".tdee-macro-calc input[name='def-surp-percentage']").val().replace("-", "+") : e(".tdee-macro-calc input[name='def-surp-percentage']").val().replace("+", "-")), s(), t(), a(), c()
        })
    }

    function t(e, a, t) {
        var c, l = .01 * a;
        return c = "metric" == t ? 2.2 * (1 - l) * e : (1 - l) * e
    }

    function c(e) {
        var a = e / 2.2,
            t = 370 + 21.6 * a;
        return t
    }

    function l() {
        var a = e(".tdee-macro-calc input[name='body-weight']").val(),
            l = e(".tdee-macro-calc input[name='body-fat']").val();
        if (a && l) {
            var r, i, n, s = e(".tdee-macro-calc select[name='activity-level']").val(),
                d = e(".tdee-macro-calc #custom-multiplier").val(),
                u = e(".tdee-macro-calc input[name='system']:checked").val();
            d && (s = d), n = t(a, l, u), r = c(n), i = r * s;
            var o = "metric" == e(".tdee-macro-calc input[name='system']:checked").val() ? n / 2.2 : n;
            return {
                lbm: ~~o,
                tdee: ~~i,
                bmr: ~~r
            }
        }
    }

    function r(a) {
        a && e(a.target).is(".tdee-macro-calc #activity-level") && (console.log("VAL"), e(".tdee-macro-calc #custom-multiplier").val(e(".tdee-macro-calc #activity-level").val()));
        var t = l();
        if (t) {
            var c = "metric" == e(".tdee-macro-calc input[name='system']:checked").val() ? "kgs." : "lbs.";
            e(".tdee-macro-calc .lbm-result").html(t.lbm + " <em>" + c + "</em>"), e(".tdee-macro-calc .bmr-result").html(t.bmr + ""), e(".tdee-macro-calc .tdee-result").html(t.tdee + " <em>calories per day</em>"), e(".tdee-macro-calc #tdee").val(t.tdee), e(".tdee-macro-calc #tdee").trigger("input")
        }
    }
    var i, n = !0;
    a(), e(".tdee-macro-calc input[type='number'], .tdee-macro-calc select[name='activity-level']").on("input change keypress keyup", r), e(".tdee-macro-calc input[name='system']").on("change", function() {
        "metric" == e(".tdee-macro-calc input[name='system']:checked").val() ? (e(".tdee-macro-calc span.measurement-system").html("(kgs.)"), e(".tdee-macro-calc input[name='body-weight']").val(Math.round(e(".tdee-macro-calc input[name='body-weight']").val() / 2.2))) : (e(".tdee-macro-calc span.measurement-system").html("(lbs.)"), e(".tdee-macro-calc input[name='body-weight']").val(Math.round(2.2 * e(".tdee-macro-calc input[name='body-weight']").val()))), r()
    }), e(".tdee-macro-calc #custom-multiplier").on("input", function(a) {
        a.originalEvent && e(".tdee-macro-calc #activity-level option[value='1']").prop("selected", !0)
    }), r()
});