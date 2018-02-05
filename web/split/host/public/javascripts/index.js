$(document).ready(function () {
$('.masthead')
.visibility({
once: false,
onBottomPassed: function () {
  $('.fixed.menu').transition('fade in');
},
onBottomPassedReverse: function () {
  $('.fixed.menu').transition('fade out');
}});

// create sidebar and attach to menu open
$('.ui.sidebar').sidebar('attach events', '.toc.item');


//stolen from projx.mit.edu, thanks vahid
// jumping to sections
var $bodytag = $('html, body');
var sections = ['details', 'top'];
sections.forEach(function (section) {
  $('.goto-' + section).click(function (e) {
    $bodytag.animate({
      scrollTop: $('#' + section).offset().top
    }, 400);
  });
});
});