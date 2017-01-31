/*! Social Likes v3.1.1 by Artem Sapegin - http://sapegin.github.com/social-likes - Licensed MIT */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a, b) {
    "use strict";

    function c(a, b) {
        this.container = a, this.options = b, this.init()
    }

    function d(b, c) {
        this.widget = b, this.options = a.extend({}, c), this.detectService(), this.service && this.init()
    }

    function e(a) {
        function b(a, b) {
            return b.toUpper()
        }
        var c = {},
            d = a.data();
        for (var e in d) {
            var f = d[e];
            "yes" === f ? f = !0 : "no" === f && (f = !1), c[e.replace(/-(\w)/g, b)] = f
        }
        return c
    }

    function f(a, b) {
        return g(a, b, encodeURIComponent)
    }

    function g(a, b, c) {
        return a.replace(/\{([^\}]+)\}/g, function(a, d) {
            return d in b ? c ? c(b[d]) : b[d] : a
        })
    }

    function h(a, b) {
        var c = l + a;
        return c + " " + c + "_" + b
    }

    function i(b, c) {
        function d(g) {
            "keydown" === g.type && 27 !== g.which || a(g.target).closest(b).length || (b.removeClass(m), e.off(f, d), a.isFunction(c) && c())
        }
        var e = a(document),
            f = "click touchstart keydown";
        e.on(f, d)
    }

    function j(a) {
        var b = 10;
        if (document.documentElement.getBoundingClientRect) {
            var c = parseInt(a.css("left"), 10),
                d = parseInt(a.css("top"), 10),
                e = a[0].getBoundingClientRect();
            e.left < b ? a.css("left", b - e.left + c) : e.right > window.innerWidth - b && a.css("left", window.innerWidth - e.right - b + c), e.top < b ? a.css("top", b - e.top + d) : e.bottom > window.innerHeight - b && a.css("top", window.innerHeight - e.bottom - b + d)
        }
        a.addClass(m)
    }
    var k = "social-likes",
        l = k + "__",
        m = k + "_opened",
        n = "https:" === location.protocol ? "https:" : "http:",
        o = {
            facebook: {
                counterUrl: "https://graph.facebook.com/?id={url}",
                convertNumber: function(a) {
                    return a.share.share_count
                },
                popupUrl: "https://www.facebook.com/sharer/sharer.php?u={url}",
                popupWidth: 600,
                popupHeight: 359
            },
            twitter: {
                counters: !1,
                popupUrl: "https://twitter.com/intent/tweet?url={url}&text={title}",
                popupWidth: 600,
                popupHeight: 250,
                click: function() {
                    return /[\.\?:\-–—]\s*$/.test(this.options.title) || (this.options.title += ":"), !0
                }
            },
            mailru: {
                counterUrl: n + "//connect.mail.ru/share_count?url_list={url}&callback=1&func=?",
                convertNumber: function(a) {
                    for (var b in a)
                        if (a.hasOwnProperty(b)) return a[b].shares
                },
                popupUrl: "https://connect.mail.ru/share?share_url={url}&title={title}",
                popupWidth: 492,
                popupHeight: 500
            },
            vkontakte: {
                counterUrl: "https://vk.com/share.php?act=count&url={url}&index={index}",
                counter: function(b, c) {
                    var d = o.vkontakte;
                    d._ || (d._ = [], window.VK || (window.VK = {}), window.VK.Share = {
                        count: function(a, b) {
                            d._[a].resolve(b)
                        }
                    });
                    var e = d._.length;
                    d._.push(c), a.getScript(f(b, {
                        index: e
                    })).fail(c.reject)
                },
                popupUrl: "https://vk.com/share.php?url={url}&title={title}",
                popupWidth: 655,
                popupHeight: 450
            },
            odnoklassniki: {
                counterUrl: n + "//connect.ok.ru/dk?st.cmd=extLike&ref={url}&uid={index}",
                counter: function(b, c) {
                    var d = o.odnoklassniki;
                    d._ || (d._ = [], window.ODKL || (window.ODKL = {}), window.ODKL.updateCount = function(a, b) {
                        d._[a].resolve(b)
                    });
                    var e = d._.length;
                    d._.push(c), a.getScript(f(b, {
                        index: e
                    })).fail(c.reject)
                },
                popupUrl: "https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={url}",
                popupWidth: 580,
                popupHeight: 336
            },
            plusone: {
                counterUrl: n + "//share.yandex.ru/gpp.xml?url={url}&callback=?",
                convertNumber: function(a) {
                    return parseInt(a.replace(/\D/g, ""), 10)
                },
                popupUrl: "https://plus.google.com/share?url={url}",
                popupWidth: 500,
                popupHeight: 550
            },
            pinterest: {
                counterUrl: n + "//api.pinterest.com/v1/urls/count.json?url={url}&callback=?",
                convertNumber: function(a) {
                    return a.count
                },
                popupUrl: "https://pinterest.com/pin/create/button/?url={url}&description={title}",
                popupWidth: 740,
                popupHeight: 550
            }
        },
        p = {
            promises: {},
            fetch: function(b, c, d) {
                p.promises[b] || (p.promises[b] = {});
                var e = p.promises[b];
                if (!d.forceUpdate && e[c]) return e[c];
                var g = a.extend({}, o[b], d),
                    h = a.Deferred(),
                    i = g.counterUrl && f(g.counterUrl, {
                        url: c
                    });
                return i && a.isFunction(g.counter) ? g.counter(i, h) : g.counterUrl ? a.getJSON(i).done(function(b) {
                    try {
                        var c = b;
                        a.isFunction(g.convertNumber) && (c = g.convertNumber(b)), h.resolve(c)
                    } catch (a) {
                        h.reject()
                    }
                }).fail(h.reject) : h.reject(), e[c] = h.promise(), e[c]
            }
        };
    a.fn.socialLikes = function(b) {
        return this.each(function() {
            var d = a(this),
                f = d.data(k);
            f ? a.isPlainObject(b) && f.update(b) : (f = new c(d, a.extend({}, a.fn.socialLikes.defaults, b, e(d))), d.data(k, f))
        })
    }, a.fn.socialLikes.defaults = {
        url: window.location.href.replace(window.location.hash, ""),
        title: document.title,
        counters: !0,
        zeroes: !1,
        wait: 500,
        timeout: 1e4,
        popupCheckInterval: 500,
        singleTitle: "Share"
    }, c.prototype = {
        init: function() {
            this.container.addClass(k), this.single = this.container.hasClass(k + "_single"), this.initUserButtons(), this.countersLeft = 0, this.number = 0, this.container.on("counter." + k, a.proxy(this.updateCounter, this));
            var b = this.container.children();
            this.makeSingleButton(), this.buttons = [], b.each(a.proxy(function(b, c) {
                var e = new d(a(c), this.options);
                this.buttons.push(e), e.options.counterUrl && this.countersLeft++
            }, this)), this.options.counters ? (this.timer = setTimeout(a.proxy(this.appear, this), this.options.wait), this.timeout = setTimeout(a.proxy(this.ready, this, !0), this.options.timeout)) : this.appear()
        },
        initUserButtons: function() {
            !this.userButtonInited && window.socialLikesButtons && a.extend(!0, o, socialLikesButtons), this.userButtonInited = !0
        },
        makeSingleButton: function() {
            if (this.single) {
                var b = this.container;
                b.addClass(k + "_vertical"), b.wrap(a("<div>", {
                    class: k + "_single-w"
                })), b.wrapInner(a("<div>", {
                    class: k + "__single-container"
                }));
                var c = b.parent(),
                    d = a("<div>", {
                        class: h("widget", "single")
                    }),
                    e = a(g('<div class="{buttonCls}"><span class="{iconCls}"></span>{title}</div>', {
                        buttonCls: h("button", "single"),
                        iconCls: h("icon", "single"),
                        title: this.options.singleTitle
                    }));
                d.append(e), c.append(d), d.on("click", function() {
                    var a = k + "__widget_active";
                    return d.toggleClass(a), d.hasClass(a) ? (b.css({
                        left: -(b.width() - d.width()) / 2,
                        top: -b.height()
                    }), j(b), i(b, function() {
                        d.removeClass(a)
                    })) : b.removeClass(m), !1
                }), this.widget = d
            }
        },
        update: function(b) {
            if (b.forceUpdate || b.url !== this.options.url) {
                this.number = 0, this.countersLeft = this.buttons.length, this.widget && this.widget.find("." + k + "__counter").remove(), a.extend(this.options, b);
                for (var c = 0; c < this.buttons.length; c++) this.buttons[c].update(b)
            }
        },
        updateCounter: function(a, b, c) {
            c = c || 0, (c || this.options.zeroes) && (this.number += c, this.single && this.getCounterElem().text(this.number)), this.countersLeft--, 0 === this.countersLeft && (this.appear(), this.ready())
        },
        appear: function() {
            this.container.addClass(k + "_visible")
        },
        ready: function(a) {
            this.timeout && clearTimeout(this.timeout), this.container.addClass(k + "_ready"), a || this.container.trigger("ready." + k, this.number)
        },
        getCounterElem: function() {
            var b = this.widget.find("." + l + "counter_single");
            return b.length || (b = a("<span>", {
                class: h("counter", "single")
            }), this.widget.append(b)), b
        }
    }, d.prototype = {
        init: function() {
            this.detectParams(), this.initHtml(), setTimeout(a.proxy(this.initCounter, this), 0)
        },
        update: function(b) {
            a.extend(this.options, {
                forceUpdate: !1
            }, b), this.widget.find("." + k + "__counter").remove(), this.initCounter()
        },
        detectService: function() {
            var b = this.widget.data("service");
            if (!b) {
                for (var c = this.widget[0], d = c.classList || c.className.split(" "), e = 0; e < d.length; e++) {
                    var f = d[e];
                    if (o[f]) {
                        b = f;
                        break
                    }
                }
                if (!b) return
            }
            this.service = b, a.extend(this.options, o[b])
        },
        detectParams: function() {
            var a = this.widget.data();
            if (a.counter) {
                var b = parseInt(a.counter, 10);
                isNaN(b) ? this.options.counterUrl = a.counter : this.options.counterNumber = b
            }
            a.title && (this.options.title = a.title), a.url && (this.options.url = a.url)
        },
        initHtml: function() {
            var b = this.options,
                c = this.widget,
                d = c.find("a");
            d.length && this.cloneDataAttrs(d, c);
            var e = a("<span>", {
                class: this.getElementClassNames("button"),
                html: c.html()
            });
            if (b.clickUrl) {
                var g = f(b.clickUrl, {
                        url: b.url,
                        title: b.title
                    }),
                    h = a("<a>", {
                        href: g
                    });
                this.cloneDataAttrs(c, h), c.replaceWith(h), this.widget = c = h
            } else c.on("click", a.proxy(this.click, this));
            c.removeClass(this.service), c.addClass(this.getElementClassNames("widget")), e.prepend(a("<span>", {
                class: this.getElementClassNames("icon")
            })), c.empty().append(e), this.button = e
        },
        initCounter: function() {
            if (this.options.counters)
                if (this.options.counterNumber) this.updateCounter(this.options.counterNumber);
                else {
                    var b = {
                        counterUrl: this.options.counterUrl,
                        forceUpdate: this.options.forceUpdate
                    };
                    p.fetch(this.service, this.options.url, b).always(a.proxy(this.updateCounter, this))
                }
        },
        cloneDataAttrs: function(a, b) {
            var c = a.data();
            for (var d in c) c.hasOwnProperty(d) && b.data(d, c[d])
        },
        getElementClassNames: function(a) {
            return h(a, this.service)
        },
        updateCounter: function(b) {
            b = parseInt(b, 10) || 0;
            var c = {
                class: this.getElementClassNames("counter"),
                text: b
            };
            b || this.options.zeroes || (c.class += " " + k + "__counter_empty", c.text = "");
            var d = a("<span>", c);
            this.widget.append(d), this.widget.trigger("counter." + k, [this.service, b])
        },
        click: function(b) {
            var c = this.options,
                d = !0;
            if (a.isFunction(c.click) && (d = c.click.call(this, b)), d) {
                var e = f(c.popupUrl, {
                    url: c.url,
                    title: c.title
                });
                e = this.addAdditionalParamsToUrl(e), this.openPopup(e, {
                    width: c.popupWidth,
                    height: c.popupHeight
                })
            }
            return !1
        },
        addAdditionalParamsToUrl: function(b) {
            var c = a.param(a.extend(this.widget.data(), this.options.data));
            if (a.isEmptyObject(c)) return b;
            var d = b.indexOf("?") === -1 ? "?" : "&";
            return b + d + c
        },
        openPopup: function(b, c) {
            var d = Math.round(screen.width / 2 - c.width / 2),
                e = 0;
            screen.height > c.height && (e = Math.round(screen.height / 3 - c.height / 2));
            var f = window.open(b, "sl_" + this.service, "left=" + d + ",top=" + e + ",width=" + c.width + ",height=" + c.height + ",personalbar=0,toolbar=0,scrollbars=1,resizable=1");
            if (f) {
                f.focus(), this.widget.trigger("popup_opened." + k, [this.service, f]);
                var g = setInterval(a.proxy(function() {
                    f.closed && (clearInterval(g), this.widget.trigger("popup_closed." + k, this.service))
                }, this), this.options.popupCheckInterval)
            } else location.href = b
        }
    }, a(function() {
        a("." + k).socialLikes()
    })
});