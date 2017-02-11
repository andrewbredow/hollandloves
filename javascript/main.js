document.addEventListener("DOMContentLoaded", function() {
  var causes    = Array.prototype.slice.call(document.querySelectorAll(".cause"), 0);
  var container = document.querySelector(".causes-wrapper");

  var sortedCauses = causes.sort(function() {
    return Math.random() > 0.5 ? -1 : 1;
  });

  for (cause in sortedCauses) {
    container.appendChild(sortedCauses[cause]);
  }

  document.querySelectorAll("[data-select-on-click]").forEach(function(el) {
    el.addEventListener("click", function(event) {
      event.target.select();
    });
  });

  var filterForm = document.querySelector("[data-filter-form]");
  var filterNodes = filterForm.querySelectorAll("[data-filter]");

  var updateParams = function() {
    var params = [];
    filterNodes.forEach(function(node) {
      params.push(node.name + "=" + node.value);
    });
    window.location.hash = params.join("&");
  }

  document.querySelectorAll("[data-filter]").forEach(function(el) {
    el.addEventListener("change", function() {
      updateParams();
    });
  });
});
