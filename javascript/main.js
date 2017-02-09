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
    el.onclick = function() {
      this.select();
    }
  });
});
