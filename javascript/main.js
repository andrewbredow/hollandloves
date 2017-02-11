var HollandLoves = {
  init: function() {
    this.container = document.querySelector(".causes-wrapper");
    this.causes    = Array.prototype.slice.call(document.querySelectorAll(".cause"), 0);

    this.initSelectOnClick();
    this.initFilterForm();
    this.handleFilterChange();
    this.syncfilterState();
  },

  initFilterForm: function() {
    var filterForm = document.querySelector("[data-filter-form]");
    var filterNodes = filterForm.querySelectorAll("[data-filter]");

    var updateParams = function() {
      var params = [];
      filterNodes.forEach(function(node) {
        params.push(node.name + "=" + node.value);
      });
      window.location.hash = params.join("&");
      this.handleFilterChange();
    }.bind(this);

    document.querySelectorAll("[data-filter]").forEach(function(el) {
      el.addEventListener("change", function() {
        updateParams();
      });
    });
  },

  handleFilterChange: function() {
    this.sortCauses(this.searchParams());
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

  sortCauses: function(params) {
    if (params == undefined) return;
    var sortFunction = function() {};
    switch (params["order"]) {
      case "asc":
        sortFunction = function(a, b) {
          var aName = a.querySelector(".org").textContent;
          var bName = b.querySelector(".org").textContent;
          if (aName == bName) return 0;
          return aName > bName ? 1 : -1;
        }
        break;
      case "desc":
        sortFunction = function(a, b) {
          var aName = a.querySelector(".org").textContent;
          var bName = b.querySelector(".org").textContent;
          if (aName == bName) return 0;
          return aName < bName ? 1 : -1;
        }
        break;
      default:
        sortFunction = function() {
          return Math.random() > 0.5 ? -1 : 1;
        };
        break;
    }

    var sortedCauses = this.causes.sort(sortFunction);

    for (cause in sortedCauses) {
      this.container.appendChild(sortedCauses[cause]);
    }
  },

  syncfilterState: function() {
    var params = this.searchParams();
    if (params["order"]) {
      document.querySelector("select[name=order]").value = params["order"];
    }
  },

  initSelectOnClick: function() {
    document.querySelectorAll("[data-select-on-click]").forEach(function(el) {
      el.addEventListener("click", function(event) {
        event.target.select();
      });
    });
  }
};

document.addEventListener("DOMContentLoaded", function() {
  HollandLoves.init();
});
