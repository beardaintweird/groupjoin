const funcs = {
  frequencyOfTerms(array){
    let dictionary = {};
    for(let i = 0, x = array.length; i < x; i++){
      let message = array[i].split(" ");
      let prohibitedWords = ['i','the', 'to', 'a',
      'it', 'you', 'is', 'and',
      'for', 'in', 'that', 'at',
      'of', 'be', 'have', 'was',
      'my', 'if', 'and','But',
      'too', 'or', 'are', 'like',
      'just', 'yeah', 'can', 'this',
      'with', 'so', 'i', 'what',
      'go', 'but', 'what', 'from',
      'an', 'the', 'then', 'your',
      'so', 'if', 'as', 'not', 'on', 'do', 'he', 'his', 'him', 'there','got',
      'when', 'about', 'how', 'know', 'its', 'did', 'where', 'why','how',
      'would', 'were', 'want', 'has', 'who', 'much', 'had','wanna','by','been',
      'will', 'well', 'tryna', 'doing','new','lot','these', 'rangahang','ansari',
      'khan','qureshi','ghori','salih','rhanime','aaron','mohamedali', 'nomani','zulfiqar',
      'eldeen', 'mustafa'];
      for(let j = 0, y = message.length; j < y; j++){
        let word = message[j].match(/^@?\w+$/) ? message[j].match(/^@?\w+$/)[0].toLowerCase() : '';
        if(!word) continue;
        if(parseInt(word) && typeof parseInt(word) == 'number') continue;
        if(prohibitedWords.includes(word)) continue;
        if(word[0] == '@'){
          word = word.substr(1);
        }
        word = word == 'sam' ? 'samee' : word;
        if(dictionary.hasOwnProperty(word)){
          dictionary[word]++;
        } else {
          dictionary[word] = 1;
        }
      }
    }
    return dictionary;
  },
  messagesByMembers(array){
    let dictionary = {};
    for(let i = 0, x = array.length;i < x; i++){
      array[i] = array[i] == 'Sam Kahn' ? 'Samee Khan' : array[i];
      array[i] = array[i] == 'Youssef Rhanime' ? 'Youssef Rangahang Rhanime' : array[i];
      if(dictionary.hasOwnProperty(array[i])){
        dictionary[array[i]]++;
      } else {
        dictionary[array[i]] = 0;
      }
    }
    return dictionary;
  },
  mostLikedMessages(array){
    let dictionary = {};
    for(let i = 0, x = array.length; i < x; i++){
      array[i].name = array[i].name == 'Sam Kahn' ? 'Samee Khan' : array[i].name;
      array[i].name = array[i].name == 'Youssef Rhanime' ? 'Youssef Rangahang Rhanime' : array[i].name;
      if(dictionary.hasOwnProperty(array[i].name)){
        dictionary[array[i].name] += array[i].favorites;
      } else {
        dictionary[array[i].name] = array[i].favorites;
      }
    }
    return dictionary;
  },
  mostGenerous(array,userIds){
    let nameDictionary = {};
    let dictionary = {};
    for(let i = 0, x = userIds.length; i < x; i++){
      nameDictionary[userIds[i]['DISTINCT']] = 'BOTS';
    }
    for(let i = 0, x = array.length; i < x; i++){
      for(let user in nameDictionary){
        if(user == array[i].user_id){
          array[i].name = array[i].name == 'Sam Kahn' ? 'Samee Khan' : array[i].name;
          array[i].name = array[i].name == 'Youssef Rhanime' ? 'Youssef Rangahang Rhanime' : array[i].name;
          nameDictionary[user] = array[i].name;
        }
      }
      for(let j = 0, y = array[i].favorited_by.length; j < y; j++){
        if(dictionary.hasOwnProperty(nameDictionary[array[i].favorited_by[j]])){
          // console.log('name dictionary position of the user',nameDictionary[array[i].favorited_by[j]]);
          dictionary[nameDictionary[array[i].favorited_by[j]]]++;
        } else {
          dictionary[nameDictionary[array[i].favorited_by[j]]] = 1;
        }
      }
    }
    console.log('final dictionary',dictionary);
    return dictionary;
  }

}
module.exports = funcs
