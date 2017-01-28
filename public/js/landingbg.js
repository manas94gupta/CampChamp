var counter = 0;
function changeBackground() {
  var imgs = [
        'url(../images/camp2.jpg)',
        'url(../images/camp3.jpg)',
        'url(../images/camp4.jpg)',
        'url(../images/camp5.jpg)',
        'url(../images/camp6.jpg)',
        'url(../images/camp7.jpg)',
        'url(../images/camp1.jpg)'
      ];
  if (counter === imgs.length) {
    counter = 0;
  }
  document.body.style.backgroundImage = imgs[counter];
  counter++;
}
setInterval(changeBackground, 5000);
