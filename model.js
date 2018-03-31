var model = {};
model.recherche_courante="";
model.recherches=[];
model.recherche_courante_news=[];


init(){
  var rech=getCookie("recherches");
	if(rech!=""){
		recherches=JSON.parse(rech);
	}
	for (var i=0;recherches.length>i;i++){

		console.log(recherches[0]);
		document.getElementById('recherches-stockees').innerHTML += "<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\" >"+recherches[i]+" </label><img src=\"croix30.jpg\" class=\"icone-croix\" onclick=\"supprimer_recherche(this)\" /> </p>";
	}
}

ajouter_recherche(valeurRecherche){
  if(recherches.indexOf(valeurRecherche)==-1){
		recherches.push(valeurRecherche);
		document.getElementById('recherches-stockees').innerHTML += "<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\" >"+valeurRecherche+" </label><img src=\"croix30.jpg\" class=\"icone-croix\" onclick=\"supprimer_recherche(this)\" /> </p>";
    setCookie("recherches",JSON.stringify(recherches),1000);
  }
}
