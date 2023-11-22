

let json = {
    datas : ["KHAZZANI - JEUDY - ENSAH", "Hug - Badr - Loi - Marius - CALOU", "Car feerique radieuse dut pressent. Cathedrale le la tu maintenant va redoublait vieillards ordonnance. Pretends le empilait viennent la philippe kolbacks. Groupes drapent menions me etalent je je. Boulevard regardent dissipait pu va. Paraissent admiration decharnees je me tristement etonnement tu du. Pu bouleaux horrible havresac quarante en.Entrerent defensive craignait causaient ai le. Il laissant le on paraitre treteaux. Bourse je disant traits on espoir la et. Existence prenaient bourreaux oh exasperer he cependant. Je prenons enormes menager ramassa morales ah. Idee eut des peut saut nul haut mur sais. Supplice un cervelle te relevant harmonie officier. Je va vaut au pont puis tira nous donc.Du cependant he tranchees tu retombait. Non eue coeur soeur breve. Que six miserables petitement vie assurances. Ici foi lequel claire ombres. Xv doctrine emergent se sa empilait villages batterie. Ere son primeveres vieillards dit infiniment evidemment nid.Cet est dit vert tete tira non. Vieille pelouse secouee cet pinacle mauvais rit. Il frequentes sa un consentiez infanterie approchait convulsion claquaient. Premiers sa batisses poitrine garnison du le. La survivants sa condamnait simplement redoublait. Ii comprenez oh philomene evocation uniformes. Enfants facteur au va cousine violets. Impute va on la ai enfuit couvre charge disant. Fanatiques cimetieres on lumineuses xv caracolent electrique je et retrouvait. Sortes forges me la cranes demain enleve. Abris bande soeur il nerfs et alors as. Cuivres oui fut net trimons empeche mauvais foi. Lors un pour cite du suis xv fils crie de. Actrices nid pourquoi joyeuses art.Tournent tacherai cervelle et on preparer harmonie. Compassion les age une executeurs simplement ordonnance rougeatres. Par nos pile tot cher toi jeta. He ah chercher certains quarante. En tenez me la calme betes verte tours. Extreme roulent du epouser chasses he. En ennemie il chatoie livides. On surement va francine qu branches encontre.Agissait roc susciter par triomphe eau. Iii annee dit gifle crier dut adore porte. Volonte ton revient regarde dessert ete age. Ici cassait annonce orgueil laissez ses fureurs ici parlait. Peu vif miserable suspendue sonnaient courroies quiconque pas. Il fondrait crispent qu je triomphe souvenir angoisse kolbacks.He agit yeux tout ma. Avons par fit mains bon ton abord. Aimons ii etroit de diable te rendre on offrir tirant. Attachent descendit entourage chambrees polygones va ah. Musiques le au creerent soixante on campagne. Raison le jambes venait je au. Empecher lampions on en il ne embrassa.Gardait ces couvert melezes une. Avance certes fit mirent fronts jet plates. En ma pont tu tira au prit nous meme. Eau net foret lui ronde ans cesse remit. Oh position retraite la as attentif tu. Or inassouvi et au indicible tarderait.Etriers jet couleur non capotes pendant epouses violets. Ca soixante cornette ai exaltait. Pile des chez dut mais agit nid hein vlan. Ton arriverent indulgence vin vie electrique vieillards. Ans nid ici arrivons lupanars vin regiment persuada. Coups je de armes crise te ou. Attendu montent or malheur battant tu il ne. Ah un closes clairs ruches. Ne en touffe jambes gaiete courbe veilla."]
};

let pack = jsonpack.pack(json)

console.log(pack)

pack = lzwCompress.pack(json);

console.log(pack)


async function readTag() {
    if ("NDEFReader" in window) {
      const ndef = new NDEFReader();
      try {
        await ndef.scan();
        ndef.onreading = event => {
          const decoder = new TextDecoder();
          for (const record of event.message.records) {
            consoleLog("Record type:  " + record.recordType);
            consoleLog("MIME type:    " + record.mediaType);
            consoleLog("=== data ===\n" + decoder.decode(record.data));
          }
        }
      } catch(error) {
        consoleLog(error);
      }
    } else {
      consoleLog("Web NFC is not supported.");
    }
  }
  
  async function writeTag() {
    if ("NDEFReader" in window) {
      const ndef = new NDEFReader();
      try {
        await ndef.write("What Web Can Do Today");
        consoleLog("NDEF message written!");
      } catch(error) {
        consoleLog(error);
      }
    } else {
      consoleLog("Web NFC is not supported.");
    }
  }
  
  function consoleLog(data) {
    var logElement = document.getElementById('log');
    logElement.innerHTML += data + '\n';
  }