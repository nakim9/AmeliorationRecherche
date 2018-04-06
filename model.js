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

model.getRecherche_courante = function(){
  return model.recherche_courante;
}
model.getRecherches = function(){
  return recherches;
}

model.getRecherche_courante_news= function(){
  return model.recherche_courante_news;
}

model.miseAJourRecherche_courante_news=function(nouvelles_enregistrees){
	if(nouvelles_enregistrees != ""){
		recherche_courante_news = nouvelles_enregistrees;
	}
}

model.setRecherche_courante=function(rech){
  model.recherche_courante=rech;
}

model.setRecherche_courante_news=function(news){
  model.recherche_courante_news=news;
}
model.pushRecherche_courante_news=function(tmp){
  model.recherche_courante_news.push(tmp)
}

model.supprRecherche_courante_news=function(tmp){
  model.recherche_courante_news.splice(indexOf(model.recherche_courante_news,tmp),1); //supprime l'objet
}
