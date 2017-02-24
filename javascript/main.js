var HollandLoves = {
  init: function() {
    this.container = document.querySelector(".organizations-wrapper");
    this.organizations    = Array.prototype.slice.call(document.querySelectorAll(".organization"), 0);

    this.initCopyEmail();
    this.initTooltips();
    this.initFilterForm();
    this.syncfilterState();
    this.handleFilterChange(); // trigger initial random load
  },

  initFilterForm: function() {
    document.querySelector("[data-trigger-filter-open]").addEventListener("click", function(e) {
      e.preventDefault();
      document.querySelector("section.filters[data-open]").setAttribute("data-open", "true");
    });
    document.querySelector("[data-trigger-filter-close]").addEventListener("click", function(e) {
      e.preventDefault();
      document.querySelector("section.filters[data-open]").setAttribute("data-open", "false");
    });

    document.querySelectorAll("[data-filter-set-target]").forEach(function(el) {
      el.addEventListener("click", function(e) {
        e.preventDefault()
        var paramName = el.getAttribute("data-filter-set-target");
        var value = el.getAttribute("data-filter-value");
        document.querySelector("select[name=" + paramName + "]").value = value;
        this.handleFilterChange();
      }.bind(this));
    }.bind(this));
  },

  handleFilterChange: function() {
    this.updateUrlParams();
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
          var aName = a.querySelector(".org").textContent;
          var bName = b.querySelector(".org").textContent;
          if (aName == bName) return 0;
          return aName > bName ? 1 : -1;
        };
        break;
      case "desc":
        sortFunction = function(a, b) {
          var aName = a.querySelector(".org").textContent;
          var bName = b.querySelector(".org").textContent;
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

    for (var organization in sortedOrganizations) {
      this.container.appendChild(sortedOrganizations[organization]);
    }
  },

  syncfilterState: function() {
    var params = this.searchParams();
    if (params.order) {
      document.querySelector("select[name=order]").value = params.order;
    }
  },

  updateUrlParams: function() {
    var filterForm = document.querySelector("[data-filter-form]");
    var filterNodes = filterForm.querySelectorAll("[data-filter]");

    var params = [];
    filterNodes.forEach(function(node) {
      params.push(node.name + "=" + node.value);
    });
    window.location.hash = params.join("&");
  },

  initCopyEmail: function() {
    document.querySelectorAll("[data-clipboard-text]").forEach(function(el) {
      el.addEventListener("click", function(e) {
        e.preventDefault();
      });
    });
    var clipboard = new Clipboard("[data-clipboard-text]");
    clipboard.on("success", function(e) {
      e.trigger.parentNode.querySelector(".tooltip-item").setAttribute("class", "tooltip-item email send open");
    });
  },

  initTooltips: function() {
    document.querySelectorAll("[data-clipboard-text]").forEach(function(el) {
      el.addEventListener('mouseleave', function(e) {
        document.querySelectorAll(".tooltip-item.open").forEach(function(tt) {
          tt.setAttribute("class", "tooltip-item email send");
        });
      });
    });
  }
};

document.addEventListener("DOMContentLoaded", function() {
  HollandLoves.init();
});
