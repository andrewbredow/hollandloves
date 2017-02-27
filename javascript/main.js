var HollandLoves = {
  init: function() {
    this.container = $(".organizations-wrapper");
    this.organizations = $(".organization");

    this.initCopyEmail();
    this.initTooltips();
    this.initFilterForm();
    this.handleSortChange();
    this.handleFilterChange();
    this.syncActiveState();
  },

  initFilterForm: function() {
    $("[data-trigger-filter-open]").on("click", function(e) {
      e.preventDefault();
      $("section.filters[data-open]").attr("data-open", "true");
    });
    $("[data-trigger-filter-close]").on("click", function(e) {
      e.preventDefault();
      $("section.filters[data-open]").attr("data-open", "false");
    });

    $("[data-filter-name=order]").on("click", function(e) {
      e.preventDefault();
      var el = $(e.target);
      var value = el.attr("data-filter-value");
      var params = this.searchParams();

      params.order = value;

      window.location.hash = $.param(params);
      $(window.location).trigger("sortChange");
    }.bind(this));

    $("[data-filter-name=cause]").on("click", function(e) {
      e.preventDefault();
      var el = $(e.target);
      var value = el.attr("data-filter-value");
      var params = this.searchParams();
      var existingValues = params.cause || [];
      existingValues = typeof existingValues == "string" ? [existingValues] : existingValues;

      if (existingValues.indexOf(value) > -1) {
        existingValues = existingValues.filter(function(val) {
          return val !== value;
        });
      } else {
        existingValues.push(value);
      }
      existingValues = existingValues.filter(function(v) { return v !== ""; });
      params.cause = existingValues;

      var newParams = $.param(params),
        hash = newParams.length > 0 ? newParams : "#_";

      window.location.hash = hash;
      $(window.location).trigger("filterChange");
    }.bind(this));

    $(window.location).on("sortChange", function(e) {
      this.syncActiveState();
      this.handleSortChange();
    }.bind(this));

    $(window.location).on("filterChange", function(e) {
      this.syncActiveState();
      this.handleFilterChange();
    }.bind(this));
  },

  handleSortChange: function() {
    this.sortOrganizations(this.searchParams());
  },

  handleFilterChange: function() {
    this.filterOrganizations(this.searchParams());
  },

  searchParams: function() {
    params = $.deparam(window.location.hash.slice(1));
    delete params["_"];
    return params;
  },

  sortOrganizations: function(params) {
    if (params === undefined) return;
    var sortFunction = function() {};
    switch (params.order) {
      case "asc":
        sortFunction = function(a, b) {
          var aName = $(a).find(".org").text();
          var bName = $(b).find(".org").text();
          if (aName == bName) return 0;
          return aName > bName ? 1 : -1;
        };
        break;
      case "desc":
        sortFunction = function(a, b) {
          var aName = $(a).find(".org").text();
          var bName = $(b).find(".org").text();
          if (aName == bName) return 0;
          return aName < bName ? 1 : -1;
        };
        break;
      default:
        sortFunction = function() {
          return Math.random() > 0.5 ? -1 : 1;
        };
        break;
    }

    var sortedOrganizations = this.organizations.sort(sortFunction);
    this.container.empty().append(sortedOrganizations);
  },

  filterOrganizations: function() {
    $(".organization").show();

    var causes = this.searchParams().cause;
    if (! causes || causes.length == 0) return true;

    var selectors = [];
    params.cause.forEach(function(value) {
      selectors.push("[data-cause*=" + value + "]");
    });
    $(".organization").not(selectors.join(",")).hide();
  },

  syncActiveState: function() {
    var params = this.searchParams();
    if (params.order) {
      $("[data-filter-name=order]")
        .removeClass("active")
        .filter("[data-filter-value=" + params.order + "]")
        .addClass("active");
    }
    var elements = $("[data-filter-name=cause]")
      .removeClass("active");
    if (params.cause) {
      if (params.cause.length > 0) {
        var selectors = [];
        params.cause.forEach(function(value) {
          selectors.push("[data-filter-value=" + value + "]");
        });
        elements.filter(selectors.join(","))
          .addClass("active");
      }
    }
  },

  initCopyEmail: function() {
    $("[data-clipboard-text]").on("click", function(e) {
      e.preventDefault();
    });
    var clipboard = new Clipboard("[data-clipboard-text]");
    clipboard.on("success", function(e) {
      $(e.trigger.parentNode).find(".tooltip-item").addClass("open");
    });
  },

  initTooltips: function() {
    $("[data-clipboard-text]").on('mouseleave', function(e) {
      $(".tooltip-item.open").removeClass("open");
    });
  }
};

$(document).ready(function() {
  HollandLoves.init();
});
