var HollandLoves = {
  init: function() {
    this.container = $(".organizations-wrapper");
    this.organizations = $(".organization");

    this.initCopyEmail();
    this.initTooltips();
    this.initFilterForm();
    this.syncActiveState();
    this.handleFilterChange(); // trigger initial random load
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

    $("[data-filter-name]").on("click", function(e) {
      e.preventDefault()
      var el = $(e.target);
      var paramName = el.attr("data-filter-name");
      var value = el.attr("data-filter-value");
      var params = this.searchParams();
      params[paramName] = value;
      window.location.hash = $.param(params);
      this.handleFilterChange();
    }.bind(this));
  },

  handleFilterChange: function() {
    this.sortOrganizations(this.searchParams());
  },

  searchParams: function() {
    var params = window.location.hash.slice(1).split("&");
    var searchParams = {};
    params.forEach(function(param) {
      var p = param.split("=");
      if (p.length == 2) {
        searchParams[p[0]] = p[1];
      }
    });
    return searchParams;
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

  syncActiveState: function() {
    var params = this.searchParams();
    if (params.order) {

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
