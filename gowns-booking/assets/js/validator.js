+(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var c = a(this),
          e = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b),
          f = c.data("bs.validator");
        (f || "destroy" != b) &&
          (f || c.data("bs.validator", (f = new d(this, e))),
          "string" == typeof b && f[b]());
      });
    }
    var c = ':input:not([type="submit"], button):enabled:visible',
      d = function (b, c) {
        (this.$element = a(b)),
          (this.options = c),
          (c.errors = a.extend({}, d.DEFAULTS.errors, c.errors));
        for (var e in c.custom)
          if (!c.errors[e])
            throw new Error(
              "Missing default error message for custom validator: " + e
            );
        a.extend(d.VALIDATORS, c.custom),
          this.$element.attr("novalidate", !0),
          this.toggleSubmit(),
          this.$element.on(
            "input.bs.validator change.bs.validator focusout.bs.validator",
            a.proxy(this.validateInput, this)
          ),
          this.$element.on("submit.bs.validator", a.proxy(this.onSubmit, this)),
          this.$element.find("[data-match]").each(function () {
            var b = a(this),
              c = b.data("match");
            a(c).on("input.bs.validator", function () {
              b.val() && b.trigger("input.bs.validator");
            });
          });
      };
    (d.DEFAULTS = {
      delay: 500,
      html: !1,
      disable: !0,
      custom: {},
      errors: { match: "Does not match", minlength: "Not long enough" },
      feedback: { success: "glyphicon-ok", error: "glyphicon-warning-sign" },
    }),
      (d.VALIDATORS = {
        native: function (a) {
          var b = a[0];
          return b.checkValidity ? b.checkValidity() : !0;
        },
        match: function (b) {
          var c = b.data("match");
          return !b.val() || b.val() === a(c).val();
        },
        minlength: function (a) {
          var b = a.data("minlength");
          return !a.val() || a.val().length >= b;
        },
      }),
      (d.prototype.validateInput = function (b) {
        var c = a(b.target),
          d = c.data("bs.validator.errors");
        if (
          (c.is('[type="radio"]') &&
            (c = this.$element.find('input[name="' + c.attr("name") + '"]')),
          this.$element.trigger(
            (b = a.Event("validate.bs.validator", { relatedTarget: c[0] }))
          ),
          !b.isDefaultPrevented())
        ) {
          var e = this;
          this.runValidators(c).done(function (f) {
            c.data("bs.validator.errors", f),
              f.length ? e.showErrors(c) : e.clearErrors(c),
              (d && f.toString() === d.toString()) ||
                ((b = f.length
                  ? a.Event("invalid.bs.validator", {
                      relatedTarget: c[0],
                      detail: f,
                    })
                  : a.Event("valid.bs.validator", {
                      relatedTarget: c[0],
                      detail: d,
                    })),
                e.$element.trigger(b)),
              e.toggleSubmit(),
              e.$element.trigger(
                a.Event("validated.bs.validator", { relatedTarget: c[0] })
              );
          });
        }
      }),
      (d.prototype.runValidators = function (b) {
        function c(a) {
          return (
            b.data(a + "-error") ||
            b.data("error") ||
            ("native" == a && b[0].validationMessage) ||
            g.errors[a]
          );
        }
        var e = [],
          f = a.Deferred(),
          g = this.options;
        return (
          b.data("bs.validator.deferred") &&
            b.data("bs.validator.deferred").reject(),
          b.data("bs.validator.deferred", f),
          a.each(
            d.VALIDATORS,
            a.proxy(function (a, d) {
              if ((b.data(a) || "native" == a) && !d.call(this, b)) {
                var f = c(a);
                !~e.indexOf(f) && e.push(f);
              }
            }, this)
          ),
          !e.length && b.val() && b.data("remote")
            ? this.defer(b, function () {
                var d = {};
                (d[b.attr("name")] = b.val()),
                  a
                    .get(b.data("remote"), d)
                    .fail(function (a, b, d) {
                      e.push(c("remote") || d);
                    })
                    .always(function () {
                      f.resolve(e);
                    });
              })
            : f.resolve(e),
          f.promise()
        );
      }),
      (d.prototype.validate = function () {
        var a = this.options.delay;
        return (
          (this.options.delay = 0),
          this.$element.find(c).trigger("input.bs.validator"),
          (this.options.delay = a),
          this
        );
      }),
      (d.prototype.showErrors = function (b) {
        var c = this.options.html ? "html" : "text";
        this.defer(b, function () {
          var d = b.closest(".form-group"),
            e = d.find(".help-block.with-errors"),
            f = d.find(".form-control-feedback"),
            g = b.data("bs.validator.errors");
          g.length &&
            ((g = a("<ul/>")
              .addClass("list-unstyled")
              .append(
                a.map(g, function (b) {
                  return a("<li/>")[c](b);
                })
              )),
            void 0 === e.data("bs.validator.originalContent") &&
              e.data("bs.validator.originalContent", e.html()),
            e.empty().append(g),
            d.addClass("has-error"),
            f.length &&
              f.removeClass(this.options.feedback.success) &&
              f.addClass(this.options.feedback.error) &&
              d.removeClass("has-success"));
        });
      }),
      (d.prototype.clearErrors = function (a) {
        var b = a.closest(".form-group"),
          c = b.find(".help-block.with-errors"),
          d = b.find(".form-control-feedback");
        c.html(c.data("bs.validator.originalContent")),
          b.removeClass("has-error"),
          d.length &&
            d.removeClass(this.options.feedback.error) &&
            d.addClass(this.options.feedback.success) &&
            b.addClass("has-success");
      }),
      (d.prototype.hasErrors = function () {
        function b() {
          return !!(a(this).data("bs.validator.errors") || []).length;
        }
        return !!this.$element.find(c).filter(b).length;
      }),
      (d.prototype.isIncomplete = function () {
        function b() {
          return "checkbox" === this.type
            ? !this.checked
            : "radio" === this.type
            ? !a('[name="' + this.name + '"]:checked').length
            : "" === a.trim(this.value);
        }
        return !!this.$element.find(c).filter("[required]").filter(b).length;
      }),
      (d.prototype.onSubmit = function (a) {
        this.validate(),
          (this.isIncomplete() || this.hasErrors()) && a.preventDefault();
      }),
      (d.prototype.toggleSubmit = function () {
        if (this.options.disable) {
          var b = a('button[type="submit"], input[type="submit"]')
            .filter('[form="' + this.$element.attr("id") + '"]')
            .add(
              this.$element.find('input[type="submit"], button[type="submit"]')
            );
          b.toggleClass("disabled", this.isIncomplete() || this.hasErrors()).css({
            "pointer-events": "all",
            cursor: "pointer",
          });
        }
      }),
      (d.prototype.defer = function (b, c) {
        return (
          (c = a.proxy(c, this)),
          this.options.delay
            ? (window.clearTimeout(b.data("bs.validator.timeout")),
              void b.data(
                "bs.validator.timeout",
                window.setTimeout(c, this.options.delay)
              ))
            : c()
        );
      }),
      (d.prototype.destroy = function () {
        return (
          this.$element
            .removeAttr("novalidate")
            .removeData("bs.validator")
            .off(".bs.validator"),
          this.$element
            .find(c)
            .off(".bs.validator")
            .removeData(["bs.validator.errors", "bs.validator.deferred"])
            .each(function () {
              var b = a(this),
                c = b.data("bs.validator.timeout");
              window.clearTimeout(c) && b.removeData("bs.validator.timeout");
            }),
          this.$element.find(".help-block.with-errors").each(function () {
            var b = a(this),
              c = b.data("bs.validator.originalContent");
            b.removeData("bs.validator.originalContent").html(c);
          }),
          this.$element
            .find('input[type="submit"], button[type="submit"]')
            .removeClass("disabled"),
          this.$element.find(".has-error").removeClass("has-error"),
          this
        );
      });
    var e = a.fn.validator;
    (a.fn.validator = b),
      (a.fn.validator.Constructor = d),
      (a.fn.validator.noConflict = function () {
        return (a.fn.validator = e), this;
      }),
      a(window).on("load", function () {
        a('form[data-toggle="validator"]').each(function () {
          var c = a(this);
          b.call(c, c.data());
        });
      });
  })(jQuery);
  