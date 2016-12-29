document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll("[data-select-on-click]").forEach(function(el) {
    el.onclick = function() {
      this.select();
    }
  });
});
