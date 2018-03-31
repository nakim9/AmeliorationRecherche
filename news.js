var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche()
{
	recherche_courante = $("#zone_saisie").val();
	if(recherches.indexOf(recherche_courante)==-1){
		recherches.push(recherche_courante);
		document.getElementById('recherches-stockees').innerHTML += "<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\" >"+recherche_courante+" </label><img src=\"croix30.jpg\" class=\"icone-croix\" onclick=\"supprimer_recherche(this)\" /> </p>";
	}
	setCookie("recherches",JSON.stringify(recherches),1000);

}

function supprimer_recherche(e)
{
	var node=e.parentNode;
	node.remove();
	setCookie("recherches",JSON.stringify(recherches),1000);

}


function selectionner_recherche(e)
{
	recherche_courante= $(e).html();
	$("#zone_saisie").val(recherche_courante);
	var res = getCookie(recherche_courante);
	if(res!=""){
		recherche_courante_news=JSON.parse(res);
	}
	$("#resultats").empty();
	for (var i=0 ; i<recherche_courante_news.length ; i++){
		$("#resultats").append("<p class=\"titre_result\"><a class=\"titre_news\" href="+recherche_courante_news[i].url+ " target=\"_blank\">"+recherche_courante_news[i].titre+"</a><span class=\"date_news\">"+recherche_courante_news[i].date+"</span><span class=\"action_news\" onclick=\"supprimer_nouvelle(this)\"><img src=\"disk15.jpg\"/></span></p>");
	}
}


function init()
{
	var rech=getCookie("recherches");
	if(rech!=""){
		recherches=JSON.parse(rech);
	}
	for (var i=0;recherches.length>i;i++){
		document.getElementById('recherches-stockees').innerHTML += "<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\" >"+recherches[i]+" </label><img src=\"croix30.jpg\" class=\"icone-croix\" onclick=\"supprimer_recherche(this)\" /> </p>";
	}
}


function rechercher_nouvelles()
{
	$("#resultats").empty();
	$("#wait").css("display","block");
	var valeurRecherche = $("#zone_saisie").val();
	//Mise à jour de recherche_courante_news si un cookie existe
	var nouvelles_enregistrees = getCookie(valeurRecherche);
	if(nouvelles_enregistrees != ""){
		recherche_courante_news = nouvelles_enregistrees;
	}
	//envoi de le requête php de recherche
	valeurRecherche = encodeURIComponent(valeurRecherche);
	$.get("search.php?data="+valeurRecherche,maj_resultats);
}


function maj_resultats(res)
{
	document.getElementById('wait').style.display = "none";

	var recherches=JSON.parse(res);
	if(recherche_courante_news.length != 0){
		var recherches_sauvgardees = JSON.parse(recherche_courante_news);
	}
	else{
		var recherches_sauvgardees = new Array();
	}
	for(var i=0; i<recherches.length;i++){

		var j =0;
		while (j < recherches_sauvgardees.length
			&& !(recherches_sauvgardees[j].titre == recherches[i].titre
			&& recherches_sauvgardees[j].date == recherches[i].date)) {
				j++;
		}
		if(j == recherches_sauvgardees.length){
			$("#resultats").append("<p class=\"titre_result\"><a class=\"titre_news\" href="+recherches[i].url+ " target=\"_blank\">"+recherches[i].titre+"</a><span class=\"date_news\">"+recherches[i].date+"</span><span class=\"action_news\" onclick=\"sauver_nouvelle(this)\"><img src=\"horloge15.jpg\"/></span></p>");
		}
		else{
			$("#resultats").append("<p class=\"titre_result\"><a class=\"titre_news\" href="+recherches[i].url+ " target=\"_blank\">"+recherches[i].titre+"</a><span class=\"date_news\">"+recherches[i].date+"</span><span class=\"action_news\" onclick=\"supprimer_nouvelle(this)\"><img src=\"disk15.jpg\"/></span></p>");
		}

	}
}


function sauver_nouvelle(e)
{
	recherche_courante = $("#zone_saisie").val();
	$(e).children().attr("src","disk15.jpg"); //changement image
	$(e).attr("onclick","supprimer_nouvelle(this)"); //changement de methode sur le clic

	var tmp = new Object(); //création d'un objet temporaire que l'on va passer en string
	tmp["titre"] = $(e).parent().children(".titre_news").html(); //application du titre
	tmp["date"] = $(e).parent().children(".date_news").html(); //application de la date
	tmp["url"] = $(e).parent().children(".titre_news").attr("href"); //application de l'adresse
	if(indexOf(recherche_courante_news,tmp) == -1){ //verification pour eviter les doublons (-1 si tmp n'est pas dans la list)
		recherche_courante_news.push(tmp);
	}
	setCookie(recherche_courante,JSON.stringify(recherche_courante_news),1000);
}


function supprimer_nouvelle(e){
	$(e).children().attr("src","horloge15.jpg");//changement image
	$(e).attr("onclick","sauver_nouvelle(this)"); //changement de methode sur le clic

	var tmp = new Object(); //création d'un objet temporaire que l'on va passer en string
	tmp["titre"] = $(e).parent().children(".titre_news").html(); //application du titre
	tmp["date"] = $(e).parent().children(".date_news").html(); //application de la date
	tmp["url"] = $(e).parent().children(".titre_news").attr("href"); //application de l'adresse
	if(indexOf(recherche_courante_news,tmp) != -1){ //verification pour eviter les doublons (-1 si tmp n'est pas dans la list)
		recherche_courante_news.splice(indexOf(recherche_courante_news,tmp),1); //supprime l'objet
	}

	setCookie(recherche_courante,JSON.stringify(recherche_courante_news),1000);
}
