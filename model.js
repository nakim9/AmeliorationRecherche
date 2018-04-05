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
    setCookie("recherches",JSON.stringify(recherches),1000);
  }
}
model.supprimer_recherche =function(recherche){
  console.log(recherches.indexOf(recherche));//pas fonctionnelle
  recherches.splice(indexOf(recherches,recherche),1);
}


model.getRecherches = function(){
  return recherches;
}

model.getRecherche_courante_news= function(){
  return recherche_courante_news;
}

model.miseAJourRecherche_courante_news=function(nouvelles_enregistrees){
	if(nouvelles_enregistrees != ""){
		recherche_courante_news = nouvelles_enregistrees;
	}
}
