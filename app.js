// Generating content based on the template
const template = `<div class="col-lg-4">
<div class="card-deck mb-6 text-center">
    <div class="card mb-1 box-shadow">
        <div class="card-header">
            <h4 class="my-0 font-weight-normal">LIMITD</h4>
        </div>
        <div class="card-body">
        <div class="imagenes">
            <img class="img2" src="IMGSIGNO" alt="NAME"/>
            <img class="img1" src="IMGFONDO" alt="NAME"/>
        </div>
          <button type="button" onclick="document.getElementById('id0POS').style.display='block'" class="btn btn-lg btn-block btn-primary">NAME</button>
        </div>
    </div>
</div>
</div>`;
const template2 =
  `<div id="id0POS" class="w3-modal">
			<div class="w3-modal-content w3-animate-opacity">
			  <header style="background-color: #CDC9C3;" class="w3-container"> 
				<span onclick="document.getElementById('id0POS').style.display='none'" 
				class="w3-button w3-display-topright">&times;</span>
				<h2>NAME</h2>
			  </header>
			  <div class="w3-container">
        <h4>Description:</h4>
          <p class="desc">DESCRIPCION</p>
        <h4>Color:</h4>
          <p class="desc">COLOR</p>
        <h4>Compatibility:</h4>
          <p class="desc">COMPATIBILITY</p>
        <h4>Lucky number:</h4>
          <p class="desc">LUCKY_NUMBER</p>
        <h4>Date:</h4>
          <p class="desc">DATE</p>
			  </div>
			</div>
		  </div>`
  ;
let content = '';
let content2 = "";
let aNameSigns = ['Aries', 'Tauro', 'Geminis', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Escorpion', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis'];
let fechaOrdenada = ['Mar 21 - Apr 20','Apr 21 - May 20', 'May 21 - Jun 21', 'Jun 22 - Jul 22', 'Jul 23 - Aug 22', 'Aug 23 - Sep 22', 'Sep 23 - Oct 22', 'Oct 23 - Nov 22', 'Nov 23 - Dec 21', 'Dec 22 - Jan 19','Jan 20 - Feb 18', 'Feb 19 - Mar 20'];
let aNewSigns = [];
for (const i of fechaOrdenada) {
  for (const j in signs) {
    if (i == signs[j].date_range) {
      aNewSigns.push(signs[j]);
    }
  }
}
for (let i = 0; i < aNewSigns.length; i++) {

  let entry = template.replace(/POS/g, (i + 1))
    .replace(/NAME/g, aNameSigns[i])
    .replace(/IMGSIGNO/g, "data/img/" + (i + 1) + ".svg")
    .replace(/IMGFONDO/g, "data/img/bg-" + (i + 1) + ".jpg")
    .replace(/LIMITD/g, aNewSigns[i].date_range);
  let entry2 = template2.replace(/POS/g, (i + 1))
    .replace(/NAME/g, aNameSigns[i])
    .replace(/COLOR/g, aNewSigns[i].color)
    .replace(/COMPATIBILITY/g, aNewSigns[i].compatibility)
    .replace(/DATE/g, aNewSigns[i].date)
    .replace(/LIMITD/g, aNewSigns[i].date_range)
    .replace(/DESCRIPCION/g, aNewSigns[i].descripcion)
    .replace(/LUCKY_NUMBER/g, aNewSigns[i].lucky_number);
  content += entry;
  content2 += entry2;
}
document.getElementById('content').innerHTML = content;
document.getElementById('content2').innerHTML = content2;

// Registering Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./cache.js');
}