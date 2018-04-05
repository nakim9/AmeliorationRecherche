var model = {};
model.recherche_courante="";
model.recherches=[];
model.recherche_courante_news=[];


model.init=function(){
  var rech=getCookie("recherches");
	if(rech!=""){
		recherches=JSON.parse(rech);
	}
}

model.ajouter_recherche=function(valeurRecherche){
  if(recherches.indexOf(valeurRecherche)==-1){
		recherches.push(valeurRecherche);
		document.getElementById('recherches-stockees').innerHTML += "<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\" >"+valeurRecherche+" </label><img src=\"croix30.jpg\" class=\"icone-croix\" onclick=\"supprimer_recherche(this)\" /> </p>";
    setCookie("recherches",JSON.stringify(recherches),1000);
  }
}
