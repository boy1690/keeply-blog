(function () {
  var progressBar = document.getElementById('reading-progress');
  if (progressBar) {
    var updateProgress = function () {
      var h = document.documentElement;
      var scrollTop = h.scrollTop || document.body.scrollTop;
      var scrollHeight = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
      var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      progressBar.style.width = Math.min(100, Math.max(0, pct)) + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
  }

  var tocLinks = document.querySelectorAll('.toc-fixed nav a');
  if (tocLinks.length) {
    var headings = Array.prototype.map.call(tocLinks, function (a) {
      var id = a.getAttribute('href').slice(1);
      return { link: a, el: document.getElementById(id) };
    }).filter(function (h) { return h.el; });

    var onTocScroll = function () {
      var offset = 120;
      var active = null;
      for (var i = 0; i < headings.length; i++) {
        var rect = headings[i].el.getBoundingClientRect();
        if (rect.top - offset <= 0) active = headings[i];
      }
      tocLinks.forEach(function (l) { l.classList.remove('active'); });
      if (active) active.link.classList.add('active');
    };
    window.addEventListener('scroll', onTocScroll, { passive: true });
    onTocScroll();
  }
})();
